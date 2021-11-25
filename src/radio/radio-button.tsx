import { defineComponent, VNode } from 'vue';
import props from './props';
import Radio, { RADIO_BTN_NAME as name } from './radio';
import { omit } from '../utils/helper';

export default defineComponent({
  name,
  components: {
    Radio,
  },
  provide() {
    return {
      radioButton: this,
    };
  },
  inject: {
    radioGroup: { default: undefined },
  },
  inheritAttrs: false,
  props: { ...props },
  render(): VNode {
    const { $props, $attrs, $slots, radioGroup } = this;
    const children: VNode[] | VNode | string = $slots.default && $slots.default(null);

    const radioProps = {
      ...$props,
      ...omit(
        $attrs,
        Object.keys($attrs).filter((key) => key.startsWith('on')),
      ),
    };

    if (radioGroup) {
      radioProps.checked = $props.value === radioGroup.value;
      radioProps.disabled = $props.disabled === undefined ? radioGroup.disabled : $props.disabled;
      radioProps.name = radioGroup.name;
    }

    return <Radio {...radioProps}>{children}</Radio>;
  },
});
