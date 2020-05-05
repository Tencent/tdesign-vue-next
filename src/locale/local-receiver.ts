import Vue from 'vue';
import config from '../config';
import { Locale } from './local-provider';
import defaultLocale from './zh_CN';

const name = `${config.prefix}-locale-receiver`;

interface Placement {
  [propName: string]: string | number;
};

export default function getLocalRecevierMixins(componentName: string) { // eslint-disable-line
  return Vue.extend({
    name,
    inject: {
      globalLocale: {
        default: defaultLocale,
      },
    },

    data() {
      return {
        locale: {},
      };
    },

    watch: {
      globalLocale: {
        immediate: true,
        handler(v: Locale): void {
          this.locale = v[componentName] as Locale;
        },
      },
    },

    methods: {
      t(pattern: string, placement: Placement): string {
        const regx = /\{\s*([\w-]+)\s*\}/g;
        const translated = pattern.replace(regx, (match, key) => {
          if (placement) {
            return String(placement[key]);
          }
          return '';
        });

        return translated;
      },
    },
  });
}
