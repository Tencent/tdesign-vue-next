import Vue, { VNode, PropType } from 'vue';
import { prefix } from '../config';
import Radio from './radio';

const name = `${prefix}-radio-group`;

const sizeList: Array<string> = ['large', 'medium', 'small'];
const buttonStyleList: Array<string> = ['outline', 'solid'];

type OptionType = { value: string | number; label: VNode | string | number; disabled?: boolean } | number | string;

export default Vue.extend({
  name,

  components: {
    Radio,
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  provide(): any {
    return {
      radioGroup: this,
    };
  },

  // 使用自动生成的 props 文件，代码示例如下：
  // import props from '../../types/radio-group/props'
  // props: { ...props }
  props: {
    value: { default: undefined },
    defaultValue: { default: undefined },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'medium', validator(v: string) {
      return sizeList.includes(v);
    } },
    buttonStyle: { type: String, default: 'outline', validator(v: string) {
      return buttonStyleList.includes(v);
    } },
    options: { type: Array as PropType<Array<OptionType>>, default: (): Array<OptionType>  => [] },
    name: String,
  },

  render(): VNode {
    const { $scopedSlots } = this;
    let children: VNode[] | VNode | string = $scopedSlots.default && $scopedSlots.default(null);

    if (this.options && this.options.length) {
      children = this.options.map((option) => {
        let opt = option as { value: string | number; label: VNode | string | number; disabled?: boolean };
        if (typeof option === 'number' || typeof option === 'string') {
          opt = { value: option, label: option };
        }
        return (
          <Radio
            key={`radio-group-options-${opt.value}-${Math.random()}`}
            name={this.name}
            checked={this.value === opt.value}
            disabled={'disabled' in opt ? opt.disabled : this.disabled}
            value={opt.value}
          >
            {opt.label}
          </Radio>
        ) as VNode;
      });
    }

    const groupClass = [
      `${name}`,
      `${name}-${this.buttonStyle}`,
      `${name}-${this.size}`,
    ];

    return (
      <div class={groupClass}>
        {children}
      </div>
    ) as VNode;
  },

  methods: {
    handleRadioChange(value: string | number, context: { e: InputEvent }) {
      this.$emit('change', value, context);
    },
  },
});
