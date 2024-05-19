import { computed, defineComponent, provide, reactive } from '@td/adapter-vue';
import props from '@td/intel/components/radio/props';
import Radio from './radio';
import { omit } from '@td/adapter-utils';
import { RadioButtonInjectionKey } from './constants';

import { useContent } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TRadioButton',
  inheritAttrs: false,
  props: { ...props },

  setup(props, { attrs }) {
    provide(RadioButtonInjectionKey, reactive({}));

    const radioProps = computed(() => {
      const res = {
        ...props,
        ...omit(
          attrs,
          Object.keys(attrs).filter((key) => key.startsWith('on')),
        ),
      };

      return res;
    });

    const renderContent = useContent();

    return () => <Radio {...radioProps.value}>{renderContent('default', 'label')}</Radio>;
  },
});
