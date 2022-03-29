import { defineComponent } from 'vue';
import { defaultGlobalConfig } from './context';
import { GlobalConfigProvider } from './type';

export type ValueOf<T> = T[keyof T];

export type ComponentConfigType = ValueOf<GlobalConfigProvider>;

export * from './type';

export type ConfigRule<T = any> = string | ((args: T) => string);
export interface Placement {
  [propName: string]: string | number;
}

export default function getConfigReceiverMixins<C extends ComponentConfigType>(componentName: string) {
  return defineComponent({
    name: 'TLocalReceiver',
    inject: {
      globalConfig: {
        default: undefined,
      },
    },

    computed: {
      global(): C {
        const defaultData = defaultGlobalConfig[componentName];
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
