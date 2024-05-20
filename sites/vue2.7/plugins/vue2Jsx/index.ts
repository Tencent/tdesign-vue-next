import { createHash } from 'node:crypto'
import path from 'node:path'
import type { types } from '@babel/core'
import * as babel from '@babel/core'
import jsx from '@td/libs-vue-babel-preset-jsx'
// @ts-expect-error missing type
import importMeta from '@babel/plugin-syntax-import-meta'
import { createFilter } from '@rollup/pluginutils'
import { normalizePath } from 'vite'
import type { ComponentOptions } from 'vue'
import type { Plugin } from 'vite'

import { HMR_RUNTIME_ID, hmrRuntimeCode } from './hmrRuntime'

import type { Options } from './types'
export * from './types'

const ssrRegisterHelperId = '/__vue2-jsx-ssr-register-helper'
const ssrRegisterHelperCode =
  `export ${ssrRegisterHelper.toString()}`

/**
 * This function is serialized with toString() and evaluated as a virtual
 * module during SSR
 */
// @ts-ignore
function ssrRegisterHelper(comp: ComponentOptions, filename: string) {
  const created = comp.created
  // @ts-ignore
  comp.created = function() {
    // @ts-ignore
    const ssrContext = this.$ssrContext
    ;(ssrContext.modules || (ssrContext.modules = new Set())).add(filename)
    if (created) {
      created.call(this)
    }
  }
}

function vue2JsxPlugin(options: Options = {}): Plugin {
  let root = ''
  let needHmr = false
  let needSourceMap = true

  return {
    name: 'vite:vue2-jsx',

    config(config) {
      return {
        // only apply esbuild to ts files
        // since we are handling jsx and tsx now
        esbuild: {
          include: /\.ts$/
        }
      }
    },

    configResolved(config) {
      needHmr = config.command === 'serve' && !config.isProduction
      needSourceMap = config.command === 'serve' || !!config.build.sourcemap
      root = config.root
    },

    resolveId(id) {
      if (id === ssrRegisterHelperId) {
        return id
      }

      if (id === HMR_RUNTIME_ID) {
        return id
      }
    },

    load(id) {
      if (id === ssrRegisterHelperId) {
        return ssrRegisterHelperCode
      }

      if (id === HMR_RUNTIME_ID) {
        return hmrRuntimeCode
      }
    },

    async transform(code, id, opt) {
      const ssr = opt?.ssr === true
      const {
        include,
        exclude,
        babelPlugins = [],
        ...babelPresetOptions
      } = options
      const filter = createFilter(include || /\.[jt]sx$/, exclude)
      const [filepath] = id.split('?')

      // use id for script blocks in Vue SFCs (e.g. `App.vue?vue&type=script&lang.jsx`)
      // use filepath for plain jsx files (e.g. App.jsx)
      if (filter(id) || filter(filepath)) {
        const plugins = [importMeta]
        const presets = [
          [jsx, {
            compositionAPI: 'native',
            ...babelPresetOptions
          }]
        ]
        if (id.endsWith('.tsx') || filepath.endsWith('.tsx')) {
          plugins.push([
            // @ts-ignore missing type
            await import('@babel/plugin-transform-typescript').then(
              (r) => r.default
            ),
            // @ts-ignore
            { isTSX: true, allowExtensions: true, allowDeclareFields: true }
          ])
        }
        // custom babel plugins should put *after* ts plugin
        plugins.push(...babelPlugins)
        const result = babel.transformSync(code, {
          babelrc: false,
          ast: true,
          plugins,
          presets,
          sourceMaps: needSourceMap,
          sourceFileName: id,
          configFile: false
        })!

        if (!ssr && !needHmr) {
          if (!result.code) return
          return {
            code: result.code,
            map: result.map
          }
        }

        interface HotComponent {
          local: string
          exported: string
          id: string
        }

        // check for hmr injection
        const declaredComponents: { name: string }[] = []
        const hotComponents: HotComponent[] = []
        let hasDefault = false

        for (const node of result.ast!.program.body) {
          if (node.type === 'VariableDeclaration') {
            const names = parseComponentDecls(node, code)
            if (names.length) {
              declaredComponents.push(...names)
            }
          }

          if (node.type === 'ExportNamedDeclaration') {
            if (
              node.declaration &&
              node.declaration.type === 'VariableDeclaration'
            ) {
              hotComponents.push(
                ...parseComponentDecls(node.declaration, code).map(
                  ({ name }) => ({
                    local: name,
                    exported: name,
                    id: getHash(id + name)
                  })
                )
              )
            } else if (node.specifiers.length) {
              for (const spec of node.specifiers) {
                if (
                  spec.type === 'ExportSpecifier' &&
                  spec.exported.type === 'Identifier'
                ) {
                  const matched = declaredComponents.find(
                    ({ name }) => name === spec.local.name
                  )
                  if (matched) {
                    hotComponents.push({
                      local: spec.local.name,
                      exported: spec.exported.name,
                      id: getHash(id + spec.exported.name)
                    })
                  }
                }
              }
            }
          }

          if (node.type === 'ExportDefaultDeclaration') {
            if (node.declaration.type === 'Identifier') {
              const _name = node.declaration.name
              const matched = declaredComponents.find(
                ({ name }) => name === _name
              )
              if (matched) {
                hotComponents.push({
                  local: node.declaration.name,
                  exported: 'default',
                  id: getHash(id + 'default')
                })
              }
            } else if (isDefineComponentCall(node.declaration)) {
              hasDefault = true
              hotComponents.push({
                local: '__default__',
                exported: 'default',
                id: getHash(id + 'default')
              })
            }
          }
        }

        if (hotComponents.length) {
          if (hasDefault && (needHmr || ssr)) {
            result.code =
              result.code!.replace(
                /export default defineComponent/g,
                `const __default__ = defineComponent`
              ) + `\nexport default __default__`
          }

          if (needHmr && !ssr && !/\?vue&type=script/.test(id)) {
            let code = result.code
            let callbackCode = ``
            
            code += `\nimport __VUE_HMR_RUNTIME__ from "${HMR_RUNTIME_ID}"`

            for (const { local, exported, id } of hotComponents) {
              code +=
                `\n${local}.__hmrId = "${id}"` +
                `\n__VUE_HMR_RUNTIME__.createRecord("${id}", ${local})`
              callbackCode += `\n__VUE_HMR_RUNTIME__.reload("${id}", __${exported})`
            }

            code += `\nimport.meta.hot.accept(({${hotComponents
              .map((c) => `${c.exported}: __${c.exported}`)
              .join(',')}}) => {${callbackCode}\n})`

            result.code = code
          }

          if (ssr) {
            const normalizedId = normalizePath(path.relative(root, id))
            let ssrInjectCode =
              `\nimport { ssrRegisterHelper } from "${ssrRegisterHelperId}"` +
              `\nconst __moduleId = ${JSON.stringify(normalizedId)}`
            for (const { local } of hotComponents) {
              ssrInjectCode += `\nssrRegisterHelper(${local}, __moduleId)`
            }
            result.code += ssrInjectCode
          }
        }

        if (!result.code) return
        return {
          code: result.code,
          map: result.map
        }
      }
    }
  }
}

function parseComponentDecls(node: types.VariableDeclaration, source: string) {
  const names = []
  for (const decl of node.declarations) {
    if (decl.id.type === 'Identifier' && isDefineComponentCall(decl.init)) {
      names.push({
        name: decl.id.name
      })
    }
  }
  return names
}

function isDefineComponentCall(node?: types.Node | null) {
  return (
    node &&
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'defineComponent'
  )
}

function getHash(text: string) {
  return createHash('sha256').update(text).digest('hex').substring(0, 8)
}

export default vue2JsxPlugin
