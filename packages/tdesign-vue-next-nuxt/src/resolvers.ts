import { join } from 'node:path';
import { addComponent, addImportsSources, tryResolveModule, useNuxt } from '@nuxt/kit';

import { map, kebabCase } from 'lodash-es';
import { pluginList, iconList, pluginMap } from './config';
import { isMatch } from './utils';
import { WEB_COMPONENT_MAP } from '@tdesign/common-js/components';

import type { ModuleOptions } from './interface';

const componentSpecialCases: Record<string, Record<string, { tag: string; export: 'default' | string }>> = {
  typography: {
    Typography: { tag: 'typography', export: 'default' },
    TypographyTitle: { tag: 'typography-title', export: 'Title' },
    TypographyText: { tag: 'typography-text', export: 'Text' },
    TypographyParagraph: { tag: 'typography-paragraph', export: 'Paragraph' },
  },
  qrcode: {
    QRCode: { tag: 'qrcode', export: 'default' },
  },
};

/**
 * auto import components
 */
export const resolveTDesignComponents = (options: ModuleOptions) => {
  const moduleMode = options.esm ? 'esm' : 'es';
  const prefix = options.prefix ?? 't';

  map(WEB_COMPONENT_MAP, (subComponents: string[], keys: string) => {
    let includeComponents = subComponents;

    // 对存在特殊导出/标签映射的组件（如 typography、qrcode），合并补齐组件列表，
    // 确保 `Typography`（默认导出）等条目也能被注册。
    const specialCases = componentSpecialCases[keys];
    if (specialCases) {
      includeComponents = Array.from(new Set([...subComponents, ...Object.keys(specialCases)]));
    }

    // 过滤掉插件
    includeComponents = includeComponents.filter(
      (component) => !pluginList.includes(component as typeof pluginList[number]),
    );

    if (options.include)
      includeComponents = includeComponents.filter((component) => isMatch(component, options.include));

    includeComponents.forEach((component) => {
      if (isMatch(component, options.exclude)) return;

      const special = specialCases?.[component];
      const tagName = special ? special.tag : kebabCase(component);
      const exportName = special ? special.export : keys === component ? 'default' : component;

      addComponent({
        name: `${prefix}-${tagName}`,
        export: exportName,
        filePath: `tdesign-vue-next/${moduleMode}/${keys}/index`,
      });
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

  const tdesignGlobalStyle = await tryResolveModule('tdesign-vue-next/package.json', import.meta.url).then(
    (tdLocation) =>
      tdLocation
        ? join(tdLocation, stylePath)
        : Promise.reject('Unable to resolve tdesign-vue-next Global Style. Is it installed?'),
  );
  nuxt.options.css.push(tdesignGlobalStyle);
};
