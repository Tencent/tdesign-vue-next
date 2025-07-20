import type { ComponentResolver } from 'unplugin-vue-components';
import type { FilterPattern } from 'unplugin-utils';
import { chatComponentMap, mobileComponentMap, webComponentMap } from './components';
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
      if (!name.startsWith('T')) {
        return;
      }
      if (isExclude(name, exclude)) return;

      if (options.resolveIcons && name.match(/[a-z]Icon$/)) {
        return {
          name,
          from: `${resolveIconPkg(library)}${importFrom}`,
        };
      }
      let componentMap: Record<string, string[]> = {};
      if (['vue', 'vue-next'].includes(library)) {
        componentMap = webComponentMap;
      }
      if (library === 'mobile-vue') {
        componentMap = mobileComponentMap;
      }
      if (library === 'chat') {
        componentMap = chatComponentMap;
      }
      let isTDesignComponent = false;
      const importName = resolveImportName(name.slice(1));

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
  if (name === 'Qrcode') {
    return 'QRCode';
  }
  if (name.startsWith('Typography')) {
    return name.slice('Typography'.length);
  }
  return name;
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
