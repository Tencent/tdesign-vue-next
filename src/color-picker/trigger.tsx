import { defineComponent, PropType, ref, watch } from 'vue';
import { COMPONENT_NAME } from './const';
import { Input as TInput } from '../input';
import { InputNumber as TInputNumber } from '../input-number';
import Color from './utils/color';
import { TdColorPickerProps } from '.';

const name = COMPONENT_NAME;

export default defineComponent({
  name: 'DefaultTrigger',
  components: {
    TInput,
    TInputNumber,
  },
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputProps: {
      type: Object as PropType<TdColorPickerProps['inputProps']>,
      default: () => {
        return {
          autoWidth: true,
        };
      },
    },
  },
  emits: ['trigger-change'],
  setup(props, { emit }) {
    const value = ref(props.color);
    const setValue = () => (value.value = props.color);
    setValue();
    watch(() => [props.color], setValue);

    const handleChange = (input: string) => {
      if (!Color.isValid(input)) {
        value.value = props.color;
      } else {
        value.value = input;
      }
      emit('trigger-change', value.value);
    };

    return {
      value,
      handleChange,
    };
  },

  render() {
    const { value } = this;
    const inputSlots = {
      label: () => {
        return (
          <div class={[`${name}__trigger--default__color`, `${COMPONENT_NAME}--bg-alpha`]}>
            <span
              class={['color-inner']}
              style={{
                background: value,
              }}
            ></span>
          </div>
        );
      },
    };
    return (
      <div class={`${name}__trigger--default`}>
        <t-input
          {...this.inputProps}
          v-slots={inputSlots}
          v-model={value}
          placeholder="请选择"
          disabled={this.disabled}
          onChange={this.handleChange}
        />
      </div>
    );
  },
});
