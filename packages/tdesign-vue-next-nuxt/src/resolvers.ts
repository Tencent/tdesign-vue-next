import { join } from 'node:path';
import { addComponent, addImportsSources, tryResolveModule, useNuxt } from '@nuxt/kit';

import { map, kebabCase } from 'lodash-es';
import { componentMap, pluginList, iconList, pluginMap } from './config';
import { isMatch } from './utils';

import type { ModuleOptions } from './interface';

/**
 * auto import components
 */
export const resolveTDesignComponents = (options: ModuleOptions) => {
  const moduleMode = options.esm ? 'esm' : 'es';
  const prefix = options.prefix ?? 't';

  map(componentMap, (subComponents: string[], keys: string) => {
    let includeComponents = subComponents;

    if (options.include) includeComponents = subComponents.filter((component) => isMatch(component, options.include));

    includeComponents.forEach((component) => {
      if (!isMatch(component, options.exclude)) {
        addComponent({
          name: `${prefix}-${kebabCase(component)}`,
          export: keys === component ? 'default' : component,
          filePath: `tdesign-vue-next/${moduleMode}/${keys}/index`,
        });
      }
    });
  });
};

/**
 * auto import plugins
 */
export const resolveTDesignPlugins = (options: ModuleOptions) => {
  const moduleMode = options.esm ? 'esm' : 'es';
  const plugins = options.plugins ?? pluginList;
  plugins.map((plugin) => {
    addImportsSources({
      imports: [plugin],
      from: `tdesign-vue-next/${moduleMode}/${pluginMap[plugin]}/plugin`,
    });
  });
};

/**
 * auto import icon from tdesign-icons-vue-next
 */
export const resolveTDesignIcons = (options: ModuleOptions) => {
  if (!options.resolveIcons) return;

  let includeIcons = iconList;
  if (options.iconInclude) includeIcons = iconList.filter((icon) => isMatch(icon, options.iconInclude));

  map(includeIcons, (icon: string) => {
    const iconName = options.iconPrefix ? `${options.iconPrefix}-${kebabCase(icon)}-icon` : `${kebabCase(icon)}-icon`;
    const iconFilePath = kebabCase(icon);
    if (!isMatch(icon, options.iconExclude)) {
      addComponent({
        name: iconName,
        filePath: `tdesign-icons-vue-next/esm/components/${iconFilePath}`,
      });
    }
  });
};

/**
 * auto import global CSS variables
 */
export const resolveTDesignVariables = async (options: ModuleOptions) => {
  if (!options.importVariables) return;

  const nuxt = useNuxt();
  const stylePath = options.esm ? '../esm/style/index.js' : '../es/style/index.css';

  const tdesignGlobalStyle = await tryResolveModule('tdesign-vue-next/package.json').then((tdLocation) =>
    tdLocation
      ? join(tdLocation, stylePath)
      : Promise.reject('Unable to resolve tdesign-vue-next Global Style. Is it installed?'),
  );
  nuxt.options.css.push(tdesignGlobalStyle);
};
