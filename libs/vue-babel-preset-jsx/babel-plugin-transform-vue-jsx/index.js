import syntaxJsx from '@babel/plugin-syntax-jsx'
import { addDefault } from '@babel/helper-module-imports'
import kebabCase from 'lodash.kebabcase'
import htmlTags from 'html-tags'
import svgTags from 'svg-tags'

const xlinkRE = /^xlink([A-Z])/
const rootAttributes = ['staticClass', 'class', 'style', 'key', 'ref', 'refInFor', 'slot', 'scopedSlots', 'model']
const prefixes = ['props', 'domProps', 'on', 'nativeOn', 'hook', 'attrs']
const domPropsValueElements = ['input', 'textarea', 'option', 'select']
const domPropsElements = [...domPropsValueElements, 'video']

/**
 * Checks if attribute is "special" and needs to be used as domProps
 * @param tag string
 * @param type string
 * @param attributeName string
 */
const mustUseDomProps = (tag, type, attributeName) => {
  return (
    (attributeName === 'value' && domPropsValueElements.includes(tag) && type !== 'button') ||
    (attributeName === 'selected' && tag === 'option') ||
    (attributeName === 'checked' && tag === 'input') ||
    (attributeName === 'muted' && tag === 'video')
  )
}

/**
 * Checks if string is describing a directive
 * @param src string
 */
const isDirective = src =>
  src.startsWith(`v-`) || (src.startsWith('v') && src.length >= 2 && src[1] >= 'A' && src[1] <= 'Z')

/**
 * Get tag (first attribute for h) from JSXOpeningElement
 * @param t
 * @param path JSXOpeningElement
 * @returns Identifier | StringLiteral | MemberExpression
 */
const getTag = (t, path) => {
  const namePath = path.get('name')
  if (t.isJSXIdentifier(namePath)) {
    const name = namePath.get('name').node
    if (path.scope.hasBinding(name) && !htmlTags.includes(name) && !svgTags.includes(name)) {
      return t.identifier(name)
    } else {
      return t.stringLiteral(name)
    }
  }

  /* istanbul ignore else */
  if (t.isJSXMemberExpression(namePath)) {
    return transformJSXMemberExpression(t, namePath)
  }
  /* istanbul ignore next */
  throw new Error(`getTag: ${namePath.type} is not supported`)
}

/**
 * Get children from Array of JSX children
 * @param t
 * @param paths Array<JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement>
 * @returns Array<Expression | SpreadElement>
 */
const getChildren = (t, paths) =>
  paths
    .map(path => {
      if (path.isJSXText()) {
        return transformJSXText(t, path)
      }
      if (path.isJSXExpressionContainer()) {
        return transformJSXExpressionContainer(t, path)
      }
      if (path.isJSXSpreadChild()) {
        return transformJSXSpreadChild(t, path)
      }
      if (path.isCallExpression()) {
        return path.node
      }
      /* istanbul ignore next */
      throw new Error(`getChildren: ${path.type} is not supported`)
    })
    .filter(el => el !== null && !t.isJSXEmptyExpression(el))

/**
 * Add attribute to an attributes object
 * @param t
 * @param attributes Object<[type: string]: ObjectExpression>
 * @param type string
 * @param value ObjectProperty | SpreadElement
 */
const addAttribute = (t, attributes, type, value) => {
  if (attributes[type]) {
    let exists = false
    if (t.isObjectProperty(value) && (type === 'on' || type === 'nativeOn')) {
      attributes[type].properties.forEach(property => {
        if (t.isObjectProperty(property) && property.key.value === value.key.value) {
          if (t.isArrayExpression(property.value)) {
            property.value.elements.push(value.value)
          } else {
            property.value = t.arrayExpression([property.value, value.value])
          }
          exists = true
        }
      })
    }
    if (!exists) {
      attributes[type].properties.push(value)
    }
  } else {
    attributes[type] = t.objectExpression([value])
  }
}

/**
 * Parse information needed to transform domProps
 * @param t
 * @param paths Array<JSXAttribute | JSXSpreadAttribute>
 * @param tag Identifier | StringLiteral | MemberExpression
 * @returns Object<tagName: string, canContainDomProps: boolean, elementType: string>
 */
const parseMagicDomPropsInfo = (t, paths, tag) => {
  const tagName = t.isStringLiteral(tag) && tag.value
  const canContainDomProps = domPropsElements.includes(tagName)
  let elementType = ''
  if (canContainDomProps) {
    const typeAttribute = paths.find(
      path =>
        t.isJSXAttribute(path) &&
        t.isJSXIdentifier(path.get('name')) &&
        t.isStringLiteral(path.get('value')) &&
        path.get('name.name').node === 'type',
    )
    elementType = typeAttribute && typeAttribute.get('value.value').node
  }
  return { tagName, canContainDomProps, elementType }
}

/**
 * Parse vue attribute from JSXAttribute
 * @param t
 * @param path JSXAttribute
 * @param attributes Object<[type: string]: ObjectExpression>
 * @param tagName string
 * @param elementType string
 * @returns Array<Expression>
 */
const parseAttributeJSXAttribute = (t, path, attributes, tagName, elementType) => {
  const namePath = path.get('name')
  let prefix
  let name
  let modifiers
  let argument
  if (t.isJSXNamespacedName(namePath)) {
    name = `${namePath.get('namespace.name').node}:${namePath.get('name.name').node}`
  } else {
    name = namePath.get('name').node
  }
  if (prefixes.includes(name) && t.isJSXExpressionContainer(path.get('value'))) {
    return t.JSXSpreadAttribute(t.objectExpression([t.objectProperty(t.stringLiteral(name), path.get('value').node.expression)]))
  }

  ;[name, ...modifiers] = name.split('_')
    ;[name, argument] = name.split(':')

  prefix = prefixes.find(el => name.startsWith(el)) || 'attrs'
  let cloneName = name;
  name = name.replace(new RegExp(`^${prefix}\-?`), '')
  name = name[0].toLowerCase() + name.substr(1)

  const valuePath = path.get('value')
  let value
  if (!valuePath.node) {
    value = t.booleanLiteral(true)
  } else if (t.isStringLiteral(valuePath)) {
    value = valuePath.node
  } else {
    /* istanbul ignore else */
    if (t.isJSXExpressionContainer(valuePath)) {
      if (mustUseDomProps(tagName, elementType, name)) {
        prefix = 'domProps'
      }
      value = valuePath.get('expression').node
    } else {
      throw new Error(`getAttributes (attribute value): ${valuePath.type} is not supported`)
    }
  }
  // !todo zhangpaopao: 将 on 增加到 props 中
  if(prefix === 'on') {
    addAttribute(t, attributes, 'props', t.objectProperty(t.stringLiteral(cloneName), value))
  }
  value._argument = argument
  value._modifiers = modifiers

  if (rootAttributes.includes(name)) {
    attributes[name] = value
  } else {
    if (isDirective(name)) {
      // !todo zhangpaopao: 将 v-slots 编译成 scopedSlots: {}
      if(name.slice(2) === 'slots') {
        attributes.scopedSlots = value;
        return;
      } else {
        name = kebabCase(name.substr(1))
        prefix = 'directives';
      }
    } else {
      name = [name, ...modifiers].join('_')
    }
    if (name.match(xlinkRE)) {
      name = name.replace(xlinkRE, (_, firstCharacter) => {
        return 'xlink:' + firstCharacter.toLowerCase()
      })
    }
    addAttribute(t, attributes, prefix, t.objectProperty(t.stringLiteral(name), value))
  }

  
}

/**
 * Parse vue attribute from JSXAttribute
 * @param t
 * @param path JSXAttribute
 * @param attributes Object<[type: string]: ObjectExpression>
 * @param attributesArray Array<Object<[type: string]: ObjectExpression>>
 * @returns Attributes
 */
const parseAttributeJSXSpreadAttribute = (t, path, attributes, attributesArray) => {
  const argument = path.get('argument')
  if (
    t.isObjectExpression(argument) &&
    !argument.get('properties').find(el => !t.isObjectProperty(el) || !prefixes.includes(el.get('key.name').node))
  ) {
    argument.get('properties').forEach(propertyPath => {
      addAttribute(t, attributes, propertyPath.get('key.name').node, t.spreadElement(propertyPath.get('value').node))
    })
  } else {
    attributesArray.push(attributes)
    attributesArray.push({ type: 'vueSpread', argument: argument.node })
    attributes = {}
  }
  return attributes
}

/**
 * Get attributes from Array of JSX attributes
 * @param t
 * @param paths Array<JSXAttribute | JSXSpreadAttribute>
 * @param tag Identifier | StringLiteral | MemberExpression
 * @param openingElementPath JSXOpeningElement
 * @returns Array<Expression>
 */
const getAttributes = (t, paths, tag, openingElementPath) => {
  const attributesArray = []
  let attributes = {}

  const { tagName, canContainDomProps, elementType } = parseMagicDomPropsInfo(t, paths, tag)
  paths.forEach(path => {
    if (t.isJSXAttribute(path)) {
      const possibleSpreadNode = parseAttributeJSXAttribute(t, path, attributes, tagName, elementType)
      if (possibleSpreadNode) {
        openingElementPath.node.attributes.push(possibleSpreadNode)
        const attributePaths = openingElementPath.get('attributes')
        const lastAttributePath = attributePaths[attributePaths.length - 1]
        attributes = parseAttributeJSXSpreadAttribute(t, lastAttributePath, attributes, attributesArray)
        lastAttributePath.remove()
      }
      return
    }
    /* istanbul ignore else */
    if (t.isJSXSpreadAttribute(path)) {
      attributes = parseAttributeJSXSpreadAttribute(t, path, attributes, attributesArray)
      return
    }
    /* istanbul ignore next */
    throw new Error(`getAttributes (attribute): ${path.type} is not supported`)
  })

  if (attributesArray.length > 0) {
    if (Object.keys(attributes).length > 0) {
      attributesArray.push(attributes)
    }
    return t.arrayExpression(
      attributesArray.map(el => {
        if (el.type === 'vueSpread') {
          // !todo zhangpaopao: 将所有 {...xxx} 都编译成 props={xxx}
          return t.objectExpression(
            [
              t.objectProperty(t.stringLiteral('props'), el.argument), 
              t.objectProperty(t.stringLiteral('attrs'), el.argument),
            ]);
          if (!el.argument.name.startsWith('on')) {
            return t.objectExpression(
              [
                t.objectProperty(t.stringLiteral('props'), el.argument), 
                t.objectProperty(t.stringLiteral('attrs'), el.argument),
              ]);
          } else {
            // el.argument 以 "on" 开头，你可以选择跳过它或者进行其他处理
            // 这里我们选择跳过
            return t.objectProperty(t.stringLiteral('props'), el.argument);
          }
        } else {
          return transformAttributes(t, el)
        }
      }),
    )
  }
  return Object.entries(attributes).length && transformAttributes(t, attributes)
}

/**
 * Transform directives ObjectExpression into ArrayExpression
 * @param t
 * @param directives ObjectExpression
 * @returns ArrayExpression
 */
const transformDirectives = (t, directives) =>
  t.arrayExpression(
    directives.properties.map(directive =>
      t.objectExpression([
        t.objectProperty(t.identifier('name'), directive.key),
        t.objectProperty(t.identifier('value'), directive.value),
        ...(directive.value._argument
          ? [t.objectProperty(t.identifier('arg'), t.stringLiteral(directive.value._argument))]
          : []),
        ...(directive.value._modifiers && directive.value._modifiers.length > 0
          ? [
            t.objectProperty(
              t.identifier('modifiers'),
              t.objectExpression(
                directive.value._modifiers.map(modifier =>
                  t.objectProperty(t.stringLiteral(modifier), t.booleanLiteral(true)),
                ),
              ),
            ),
          ]
          : []),
      ]),
    ),
  )

/**
 * Transform attributes to ObjectExpression
 * @param t
 * @param attributes Object<[type: string]: ObjectExpression>
 * @returns ObjectExpression
 */

const transformAttributes = (t, attributes) =>
  t.objectExpression(
    Object.entries(attributes).map(
      ([key, value]) =>
        key === 'directives'
          ? t.objectProperty(t.stringLiteral(key), transformDirectives(t, value))
          : t.objectProperty(t.stringLiteral(key), value),
    ),
  )

/**
 * Transform JSXElement to h() calls
 * @param t
 * @param path JSXElement
 * @returns CallExpression
 */
const transformJSXElement = (t, path) => {
  if (t.isJSXAttribute(path.container)) {
    throw new Error(`getAttributes (attribute value): ${path.type} is not supported`)
  }
  const tag = getTag(t, path.get('openingElement'))
  const children = getChildren(t, path.get('children'))
  const openingElementPath = path.get('openingElement')
  const attributes = getAttributes(t, openingElementPath.get('attributes'), tag, openingElementPath)
  
  const args = [tag]
  if (attributes) {
    if (t.isArrayExpression(attributes)) {
      const helper = addDefault(path, '@vue/babel-helper-vue-jsx-merge-props', { nameHint: '_mergeJSXProps' })
      args.push(t.callExpression(helper, [attributes]))
    } else {
      args.push(attributes)
    }
  }
  if (children.length) {
    args.push(t.arrayExpression(children))
  }

  return t.callExpression(t.identifier('h'), args)
}

/**
 * Transform JSXMemberExpression to MemberExpression
 * @param t
 * @param path JSXMemberExpression
 * @returns MemberExpression
 */
const transformJSXMemberExpression = (t, path) => {
  const objectPath = path.get('object')
  const propertyPath = path.get('property')
  const transformedObject = objectPath.isJSXMemberExpression()
    ? transformJSXMemberExpression(t, objectPath)
    : t.identifier(objectPath.get('name').node)
  const transformedProperty = t.identifier(propertyPath.get('name').node)
  return t.memberExpression(transformedObject, transformedProperty)
}

/**
 * Transform JSXText to StringLiteral
 * @param t
 * @param path JSXText
 * @returns StringLiteral
 */
const transformJSXText = (t, path) => {
  const node = path.node
  const lines = node.value.split(/\r\n|\n|\r/)

  let lastNonEmptyLine = 0

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/[^ \t]/)) {
      lastNonEmptyLine = i
    }
  }

  let str = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    const isFirstLine = i === 0
    const isLastLine = i === lines.length - 1
    const isLastNonEmptyLine = i === lastNonEmptyLine

    // replace rendered whitespace tabs with spaces
    let trimmedLine = line.replace(/\t/g, ' ')

    // trim whitespace touching a newline
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^[ ]+/, '')
    }

    // trim whitespace touching an endline
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/[ ]+$/, '')
    }

    if (trimmedLine) {
      if (!isLastNonEmptyLine) {
        trimmedLine += ' '
      }

      str += trimmedLine
    }
  }

  return str !== '' ? t.stringLiteral(str) : null
}

/**
 * Transform JSXExpressionContainer to Expression
 * @param t
 * @param path JSXExpressionContainer
 * @returns Expression
 */
const transformJSXExpressionContainer = (t, path) => path.get('expression').node

/**
 * Transform JSXSpreadChild
 * @param t
 * @param path JSXSpreadChild
 * @returns SpreadElement
 */
const transformJSXSpreadChild = (t, path) => t.spreadElement(path.get('expression').node)

export default babel => {
  const t = babel.types;

  return {
    name: 'babel-plugin-transform-vue-jsx',
    inherits: syntaxJsx.default,
    visitor: {
      JSXElement: {
        exit(path) {
          path.replaceWith(transformJSXElement(t, path))
        },
      },
    },
  }
}
