import { defineComponent } from 'vue';
import config from '../config';

export interface Locale {
  [propName: string]: string | string[] | Locale;
};

const name = `${config}-locale-provider`;
const LocaleProvider = defineComponent({
  name,
  props: {
    globalLocale: Object,
  },
  provide(): { globalLocale: Locale } {
    return {
      globalLocale: this.globalLocale,
    };
  },
  render() {
    return this.$scopedSlots.default ? this.$scopedSlots.default[0]() : null;
  },
});

export default LocaleProvider;
