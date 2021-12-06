import { defineComponent, PropType } from 'vue';
import defaultConfig from './zh_CN_config';
import { GlobalConfigProvider } from './type';
import { prefix } from '../config';

export type ValueOf<T> = T[keyof T];

export type ComponentConfigType = ValueOf<GlobalConfigProvider>;

export * from './type';

export type ConfigRule<T = any> = string | ((args: T) => string);
export interface Placement {
  [propName: string]: string | number;
}

const name = `${prefix}-locale-receiver`;

export default function getConfigReceiverMixins<C extends ComponentConfigType>(componentName: string) {
  return defineComponent({
    name,
    inject: {
      globalConfig: {
        default: undefined,
      },
    },

    computed: {
      global(): C {
        const defaultData = defaultConfig[componentName];
        if (this.globalConfig && this.globalConfig[componentName]) {
          return {
            ...defaultData,
            ...this.globalConfig[componentName],
          };
        }
        return defaultData;
      },
    },

    methods: {
      t<T>(pattern: T, placement?: Placement): string {
        if (typeof pattern === 'string') {
          if (!placement) return pattern;
          const regx = /\{\s*([\w-]+)\s*\}/g;
          const translated = pattern.replace(regx, (match, key) => {
            if (placement) {
              return String(placement[key]);
            }
            return '';
          });
          return translated;
        }
        if (typeof pattern === 'function') {
          return pattern(placement);
        }
        return '';
      },
    },
  });
}
