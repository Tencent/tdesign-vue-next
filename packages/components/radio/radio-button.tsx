import { computed, defineComponent, provide, reactive } from 'vue';
import props from './props';
import Radio from './radio';
import { omit } from 'lodash-es';
import { RadioButtonInjectionKey } from './consts';

import { useContent } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TRadioButton',
  inheritAttrs: false,
  props,
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
