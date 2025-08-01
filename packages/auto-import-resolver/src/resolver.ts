import type { ComponentResolver } from 'unplugin-vue-components';
import type { FilterPattern } from 'unplugin-utils';
import { WEB_COMPONENT_MAP, MOBILE_COMPONENT_MAP, CHAT_COMPONENT_MAP } from '@tdesign/common-js/components';

import icons from './icons.json';
import { isExclude } from './utils';

export type TDesignLibrary = 'vue' | 'vue-next' | 'mobile-vue' | 'chat';

export interface TDesignResolverOptions {
  /**
   * select the specified library
   * @default 'vue'
   */
  library?: TDesignLibrary;

  /**
   * resolve `tdesign-icons'
   * @default false
   */
  resolveIcons?: boolean;

  /**
   * whether to import ESM version
   * @default false
   */
  esm?: boolean;

  /**
   * exclude component name, if match do not resolve the name
   *
   */
  exclude?: FilterPattern;
}

export function TDesignResolver(options: TDesignResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      const { library = 'vue', exclude } = options;
      const importFrom = options.esm ? '/esm' : '';

      if (isExclude(name, exclude)) return;

      if (options.resolveIcons && icons.includes(name)) {
        return {
          name,
          from: `${resolveIconPkg(library)}${importFrom}`,
        };
      }
      const componentMap = resolveComponentMap(library);

      let isTDesignComponent = false;
      const importName = resolveImportName(name);

      if (!importName) return;

      for (const key in componentMap) {
        if (componentMap[key].includes(importName)) {
          isTDesignComponent = true;
          break; // 找到后立即退出循环
        }
      }
      if (isTDesignComponent) {
        return {
          name: importName,
          from: `${resolveComponentPkg(library)}${importFrom}`,
        };
      }
    },
  };
}

function resolveImportName(name: string) {
  if (name.endsWith('Plugin')) {
    return name;
  }
  if (!name.startsWith('T')) {
    return '';
  }
  const componentName = name.slice(1);
  if (componentName === 'Qrcode') {
    return 'QRCode';
  }
  if (componentName.startsWith('Typography')) {
    return componentName.slice('Typography'.length);
  }
  return componentName;
}

function resolveIconPkg(library: TDesignLibrary): string {
  if (library === 'chat' || library === 'mobile-vue') {
    return 'tdesign-icons-vue-next';
  }

  return `tdesign-icons-${library}`;
}
function resolveComponentPkg(library: TDesignLibrary): string {
  if (library === 'chat') {
    return '@tdesign-vue-next/chat';
  }
  return `tdesign-${library}`;
}

function resolveComponentMap(library: TDesignLibrary): Record<string, string[]> {
  if (['vue', 'vue-next'].includes(library)) {
    return WEB_COMPONENT_MAP;
  }
  if (library === 'mobile-vue') {
    return MOBILE_COMPONENT_MAP;
  }
  if (library === 'chat') {
    return CHAT_COMPONENT_MAP;
  }
  return;
}
