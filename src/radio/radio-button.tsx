import Vue, { VueConstructor, VNode } from 'vue';
import { prefix } from '../config';
import Radio from './radio';

const name = `${prefix}-radio-button`;

interface RadioButtonInstance extends Vue {
  radioGroup: any;
}

export default (Vue as VueConstructor<RadioButtonInstance>).extend({
  name,
  inheritAttrs: false,
  props: {
    // value: { default: undefined },
    // disabled: { type: Boolean, default: false },
    // name: String,
    checked: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
    value: { default: undefined },
    name: String,
  },

  components: {
    Radio,
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

    radioProps.props.className = name;

    if (radioGroup) {
      radioProps.props.checked = $props.value === radioGroup.value;
      radioProps.props.disabled        = $props.disabled === undefined ? radioGroup.disabled : $props.disabled;
      radioProps.props.name = radioGroup.name;
    }

    return <Radio {...radioProps}>
        { children || null }
    </Radio>;
  },
});
