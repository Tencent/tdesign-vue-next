import { computed, defineComponent, inject } from 'vue';
import config from '../config';
import { ComponentLocale, LocalRule } from './type';
import defaultLocale from './zh_CN';

const name = `${config.prefix}-locale-receiver`;

export interface Placement {
  [propName: string]: string | number;
}

// export interface LocalComponent extends Vue {
//   globalLocale: Locale;
// };

export default function getLocalRecevierMixins(componentName: string) { // eslint-disable-line
  return defineComponent({
    name,
    inject: {
      globalLocale: {
        default: undefined,
      },
    },

    computed: {
      locale(): ComponentLocale {
        const defaultData = defaultLocale[componentName];
        if (this.globalLocale && this.globalLocale[componentName]) {
          return this.globalLocale[componentName];
        }
        return defaultData;
      },
    },

    methods: {
      t(pattern: LocalRule<Placement>, placement?: Placement): string {
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

export const useLocalRecevier = (componentName: string) => {
  const globalLocale = inject('globalLocale', {
    default: undefined,
  });
  const locale = computed<ComponentLocale>(() => {
    const defaultData = defaultLocale[componentName];
    if (globalLocale && globalLocale[componentName]) {
      return globalLocale[componentName];
    }
    return defaultData;
  });

  const t = (pattern: LocalRule<Placement>, placement?: Placement): string => {
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
  };
  return {
    globalLocale,
    locale,
    t,
  };
};
