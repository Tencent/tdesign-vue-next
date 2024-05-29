import { computed, defineComponent, provide, reactive } from '@td/adapter-vue';
import props from '@td/components/radio/props';
import { useContent } from '@td/adapter-hooks';
import { omit } from 'lodash-es';
import Radio from './radio';
import { RadioButtonInjectionKey } from './constants';

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
          Object.keys(attrs).filter(key => key.startsWith('on')),
        ),
      };

      return res;
    });

    const renderContent = useContent();

    return () => <Radio {...radioProps.value}>{renderContent('default', 'label')}</Radio>;
  },
});
