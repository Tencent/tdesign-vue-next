import { computed, defineComponent, PropType, ref, watch } from 'vue';
import TButton from '../../../button';
import TInput from '../../../input';
import { Color } from '../../utils';
import { ColorObject, ColorPickerChangeTrigger, TdColorPickerProps } from '../../type';
import { useBaseClassName } from '../../hooks';
import { useCommonClassName } from '../../../hooks/useConfig';
import { CloseCircleFilledIcon as TdCloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { useGlobalIcon } from '../../../hooks/useGlobalIcon';

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
    isHover: {
      type: Boolean,
      default: false,
    },
    onTriggerChange: {
      type: Function as PropType<
        (value: string, context?: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void
      >,
      default: () => {},
    },
    onTriggerClear: {
      type: Function as PropType<(context: { e: MouseEvent }) => void>,
      default: () => {},
    },
    size: {
      type: String as PropType<TdColorPickerProps['size']>,
      default: 'medium',
    },
    triggerType: {
      type: String as PropType<TdColorPickerProps['triggerType']>,
      default: 'input',
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const value = ref(props.color);
    const { SIZE: sizeClassNames } = useCommonClassName();
    watch(
      () => props.color,
      (newColor) => {
        value.value = newColor;
      },
    );
    const { CloseCircleFilledIcon } = useGlobalIcon({
      CloseCircleFilledIcon: TdCloseCircleFilledIcon,
    });

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

    const handleClear = (context: { e: MouseEvent }) => props.onTriggerClear?.(context);
    const handleInnerClear = (context: { e: MouseEvent }) => {
      // 按键trigger在此清空value，input trigger在input组件内部清空
      value.value = '';
      // 避免触发外层打开panel
      context.e.stopPropagation();
      handleClear(context);
    };

    const showClear = computed(() => {
      return value.value && !props.disabled && props.clearable && props.isHover;
    });

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
      const renderBtnTrigger = () => {
        return (
          <>
            <TButton variant="outline" shape="square" size={props.size} disabled={props.disabled}>
              {inputSlots.label()}
            </TButton>
            {showClear.value && (
              <CloseCircleFilledIcon
                class={`${baseClassName.value}__trigger--btn__clear-icon`}
                onClick={handleInnerClear}
              />
            )}
          </>
        );
      };

      return (
        <>
          {props.triggerType === 'input' && (
            <TInput
              borderless={props.borderless}
              clearable={props.clearable}
              size={props.size}
              v-slots={inputSlots}
              v-model={value.value}
              disabled={props.disabled}
              onBlur={handleChange}
              onChange={handleChange}
              onClear={handleClear}
              {...props.inputProps}
            />
          )}
          {props.triggerType === 'button' && renderBtnTrigger()}
        </>
      );
    };
  },
});
