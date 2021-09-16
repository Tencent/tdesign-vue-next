import { defineComponent } from 'vue';
import { prefix } from '../config';
import { Locale } from './type';

const name = `${prefix}-locale-provider`;
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
    return this.$slots.default ? this.$slots.default() : null;
  },
});

export default LocaleProvider;
