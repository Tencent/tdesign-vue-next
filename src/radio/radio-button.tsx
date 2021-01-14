import Vue, { VueConstructor, VNode } from 'vue';
import props from '../../types/radio/props';
import { prefix } from '../config';
import Radio from './radio';

export const name = `${prefix}-radio-button`;

interface RadioButtonInstance extends Vue {
  radioGroup: any;
}

export default (Vue as VueConstructor<RadioButtonInstance>).extend({
  name,
  inheritAttrs: false,
  props: { ...props },

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

  render(): VNode {
    const { $props, $listeners, $scopedSlots, radioGroup } = this;
    const children: VNode[] | VNode | string = $scopedSlots.default && $scopedSlots.default(null);

    const radioProps = {
      props: {
        ...$props,
      },
      on: $listeners,
    };

    if (radioGroup) {
      radioProps.props.checked = $props.value === radioGroup.value;
      radioProps.props.disabled = $props.disabled === undefined ? radioGroup.disabled : $props.disabled;
      radioProps.props.name = radioGroup.name;
    }

    return <Radio {...radioProps}>{ children }</Radio>;
  },
});
