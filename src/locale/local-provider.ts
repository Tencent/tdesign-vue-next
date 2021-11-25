import { defineComponent } from 'vue';
import { prefix } from '../config';
import { Locale } from './type';

const name = `${prefix}-locale-provider`;
const LocaleProvider = defineComponent({
  name,
  provide(): { globalLocale: Locale } {
    return {
      globalLocale: this.globalLocale,
    };
  },
  props: {
    globalLocale: Object,
  },
  render() {
    return this.$slots.default ? this.$slots.default() : null;
  },
});

export default LocaleProvider;
