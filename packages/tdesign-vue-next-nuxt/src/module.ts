import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { defineNuxtModule, createResolver } from '@nuxt/kit';
import {
  resolveTDesignComponents,
  resolveTDesignPlugins,
  resolveTDesignVariables,
  resolveTDesignIcons,
} from './resolvers';

import type { ModuleOptions } from './interface';

const isNonEmptyDirectory = (path: string) => {
  try {
    return readdirSync(path).length > 0;
  } catch {
    return false;
  }
};

const resolveLocalTDesignSource = (resolver: ReturnType<typeof createResolver>, moduleMode: 'es' | 'esm') => {
  const componentsPath = resolver.resolve('../../components');
  const sourceStyle = join(componentsPath, 'style/index.js');
  const distPath = join(resolver.resolve('../../tdesign-vue-next'), moduleMode);

  if (!existsSync(componentsPath) || !existsSync(sourceStyle) || isNonEmptyDirectory(distPath)) return;

  return {
    componentsPath,
    stylePath: sourceStyle,
  };
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'TDesign Vue Next Nuxt module',
    configKey: 'tdesign',
  },
  defaults: {
    esm: false,
    prefix: 't',
    exclude: undefined,
    include: undefined,
    resolveIcons: false,
    iconPrefix: undefined,
    iconExclude: undefined,
    iconInclude: undefined,
    plugins: undefined,
    importVariables: true,
  },
  async setup(options: ModuleOptions, nuxt) {
    const resolver = createResolver(import.meta.url);
    const moduleMode = options.esm ? 'esm' : 'es';
    const localTDesignSource = resolveLocalTDesignSource(resolver, moduleMode);
    console.info('🚀 nuxt module for tdesign-vue-next is loading');

    nuxt.options.build.transpile.push('tdesign-vue-next');
    nuxt.options.build.transpile.push('tdesign-icons-vue-next');

    if (localTDesignSource) {
      Object.assign(nuxt.options.alias, {
        'tdesign-vue-next/es': localTDesignSource.componentsPath,
        'tdesign-vue-next/esm': localTDesignSource.componentsPath,
        'tdesign-vue-next': localTDesignSource.componentsPath,
      });

      nuxt.options.build.transpile.push('@tdesign/components');
      nuxt.options.build.transpile.push('@tdesign/shared-hooks');
      nuxt.options.build.transpile.push('@tdesign/shared-utils');
    }

    if (options.esm) {
      nuxt.options.build.transpile.push('dayjs');
    }

    if (typeof options.importVariables == 'string') {
      const customizeTheme = await resolver.resolvePath(options.importVariables);
      nuxt.options.css.push(customizeTheme);
    } else if (localTDesignSource && options.importVariables) {
      nuxt.options.css.push(localTDesignSource.stylePath);
    } else {
      resolveTDesignVariables(options);
    }

    resolveTDesignComponents(options);
    resolveTDesignPlugins(options);
    resolveTDesignIcons(options);
  },
});
