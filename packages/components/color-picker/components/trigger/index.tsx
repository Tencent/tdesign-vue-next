import { defineComponent, PropType, ref, watch } from 'vue';
import TInput from '../../../input';
import { Color } from '../../utils';
import { TdColorPickerProps } from '../../type';
import { useBaseClassName } from '../../hooks';
import { useCommonClassName } from '../../../hooks/useConfig';

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
    borderless: {
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

    return () => {
      const inputSlots = {
        label: () => {
          return (
            <div class={[`${baseClassName.value}__trigger--default__color`, `${baseClassName.value}--bg-alpha`]}>
              <span
                class={[
                  'color-inner',
                  {
                    [sizeClassNames.value[props.size]]: props.size !== 'medium',
                  },
                ]}
                style={{
                  background: value.value,
                }}
              ></span>
            </div>
          );
        },
      };
      return (
        <TInput
          borderless={props.borderless}
          clearable={props.clearable}
          size={props.size}
          v-slots={inputSlots}
          v-model={value.value}
          disabled={props.disabled}
          onBlur={handleChange}
          {...props.inputProps}
        />
      );
    };
  },
});
