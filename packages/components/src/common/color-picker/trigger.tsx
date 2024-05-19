import type { PropType } from '@td/adapter-vue';
import { defineComponent, ref, watch } from '@td/adapter-vue';
import type { TdColorPickerProps } from '@td/intel/components/color-picker/type';
import { useCommonClassName } from '@td/adapter-hooks';
import TInput from '../input';
import { Color } from './utils';
import { useBaseClassName } from './hooks';

export default defineComponent({
  name: 'DefaultTrigger',
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
    clearable: {
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
    onTriggerChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    size: {
      type: String as PropType<TdColorPickerProps['size']>,
      default: 'medium',
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const value = ref(props.color);
    const { SIZE: sizeClassNames } = useCommonClassName();
    watch(
      () => [props.color],
      () => (value.value = props.color),
    );

    const handleChange = (input: string) => {
      if (input === props.color) {
        return;
      }
      if (input && !Color.isValid(input)) {
        value.value = props.color;
      } else {
        value.value = input;
      }
      props.onTriggerChange(value.value);
    };

    return {
      baseClassName,
      value,
      handleChange,
      sizeClassNames,
    };
  },

  render() {
    const { baseClassName, sizeClassNames } = this;

    const inputSlots = {
      label: () => {
        return (
          <div class={[`${baseClassName}__trigger--default__color`, `${baseClassName}--bg-alpha`]}>
            <span
              class={[
                'color-inner',
                {
                  [sizeClassNames[this.size]]: this.size !== 'medium',
                },
              ]}
              style={{
                background: this.value,
              }}
            >
            </span>
          </div>
        );
      },
    };
    return (
      <TInput
        clearable={this.clearable}
        size={this.size}
        v-slots={inputSlots}
        v-model={this.value}
        disabled={this.disabled}
        onBlur={this.handleChange}
        {...this.inputProps}
      />
    );
  },
});
