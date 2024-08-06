import { defineComponent, ref, toRefs, computed, Fragment } from 'vue';
import { CloseCircleFilledIcon as TdCloseCircleFilledIcon } from 'tdesign-icons-vue-next';

import Input from '../input';
import props from './props';
import { RangeInputValue, RangeInputPosition } from './type';

// hooks
import useVModel from '../hooks/useVModel';
import { useDisabled } from '../hooks/useDisabled';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import isArray from 'lodash/isArray';

function calcArrayValue(value: unknown | Array<unknown>) {
  if (isArray(value)) {
    return value;
  }
  return [value, value];
}

export default defineComponent({
  name: 'TRangeInput',

  inheritAttrs: false,
  props,

  setup(props, { expose, attrs }) {
    const { value, modelValue } = toRefs(props);
    const { STATUS, SIZE } = useCommonClassName();
    const classPrefix = usePrefixClass();
    const disabled = useDisabled();
    const COMPONENT_NAME = usePrefixClass('range-input');
    const { CloseCircleFilledIcon } = useGlobalIcon({ CloseCircleFilledIcon: TdCloseCircleFilledIcon });
    const renderTNodeJSX = useTNodeJSX();

    const focused = ref(false);
    const isHover = ref(false);
    const format = computed(() => calcArrayValue(props.format));
    const inputProps = computed(() => calcArrayValue(props.inputProps));
    const placeholder = computed(() => calcArrayValue(props.placeholder));
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const inputValue = computed(() => String((innerValue.value[0] || innerValue.value[1]) ?? ''));

    const isShowClearIcon = computed(
      () =>
        ((props.clearable && inputValue.value?.length && !disabled.value) || props.showClearIconOnEmpty) &&
        isHover.value,
    );

    const inputRefs = {
      firstInputRef: ref(),
      secondInputRef: ref(),
    };

    function handleClear(context: { e: MouseEvent }) {
      props.onClear?.(context);
      setInnerValue(['', ''], { ...context, trigger: 'clear', position: 'all' });
    }

    function handleEnter(rangeValue: RangeInputValue, context: { e: MouseEvent }) {
      props.onEnter?.(rangeValue, context);
    }

    function handleFocus(rangeValue: RangeInputValue, context: { e: MouseEvent }) {
      focused.value = true;
      props.onFocus?.(rangeValue, context);
    }

    function handleBlur(rangeValue: RangeInputValue, context: { e: MouseEvent }) {
      focused.value = false;
      props.onBlur?.(rangeValue, context);
    }

    function handleMouseEnter(e: MouseEvent) {
      isHover.value = true;
      props?.onMouseenter?.({ e });
    }

    function handleMouseLeave(e: MouseEvent) {
      isHover.value = false;
      props?.onMouseleave?.({ e });
    }

    expose({
      firstInputElement: inputRefs.firstInputRef.value,
      secondInputElement: inputRefs.secondInputRef.value,
      focus: (options: any) => {
        const { position = 'first' } = options || {};
        inputRefs[`${position as Exclude<RangeInputPosition, 'all'>}InputRef`].value?.focus();
      },
      blur: (options: any) => {
        const { position = 'first' } = options || {};
        inputRefs[`${position as Exclude<RangeInputPosition, 'all'>}InputRef`].value?.blur();
      },
      select: (options: any) => {
        const { position = 'first' } = options || {};
        inputRefs[`${position as Exclude<RangeInputPosition, 'all'>}InputRef`].value?.select();
      },
    });

    return () => {
      const labelContent = renderTNodeJSX('label');
      const prefixIconContent = renderTNodeJSX('prefixIcon');
      const suffixContent = renderTNodeJSX('suffix');
      const suffixIconContent = renderTNodeJSX('suffixIcon');
      const tips = renderTNodeJSX('tips');
      const separator = renderTNodeJSX('separator');

      const RangeInputContent = (
        <div
          {...attrs}
          class={[
            COMPONENT_NAME.value,
            {
              [SIZE.value[props.size]]: props.size !== 'medium',
              [STATUS.value.disabled]: disabled.value,
              [STATUS.value.focused]: focused.value,
              [STATUS.value.success]: props.status === 'success',
              [STATUS.value.warning]: props.status === 'warning',
              [STATUS.value.error]: props.status === 'error',
              [`${COMPONENT_NAME.value}--prefix`]: prefixIconContent || labelContent,
              [`${COMPONENT_NAME.value}--suffix`]: suffixContent || suffixIconContent,
              [`${COMPONENT_NAME.value}--borderless`]: props.borderless,
            },
          ]}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        >
          <div class={`${COMPONENT_NAME.value}__inner`}>
            {prefixIconContent && <div class={`${COMPONENT_NAME.value}__prefix`}>{prefixIconContent}</div>}
            {labelContent ? <div class={`${COMPONENT_NAME.value}__prefix`}>{labelContent}</div> : null}
            <Input
              ref={inputRefs.firstInputRef}
              class={`${COMPONENT_NAME.value}__inner-left`}
              inputClass={{
                [`${classPrefix.value}-is-focused`]: props.activeIndex === 0,
              }}
              placeholder={placeholder.value[0]}
              disabled={disabled.value}
              readonly={props.readonly}
              format={format.value[0]}
              value={innerValue.value?.[0]}
              onClick={({ e }: { e: MouseEvent }) => props.onClick?.({ e, position: 'first' })}
              onClear={() => setInnerValue([], { position: 'first', trigger: 'input' })}
              onEnter={(val, { e }) =>
                handleEnter([val, innerValue.value?.[1]], { e, position: 'first' } as {
                  e: any;
                  position: RangeInputPosition;
                })
              }
              onFocus={(val, { e }) =>
                handleFocus([val, innerValue.value?.[1]], { e, position: 'first' } as {
                  e: any;
                  position: RangeInputPosition;
                })
              }
              onBlur={(val, { e }) =>
                handleBlur([val, innerValue.value?.[1]], { e, position: 'first' } as {
                  e: any;
                  position: RangeInputPosition;
                })
              }
              onChange={(val, { e }) =>
                setInnerValue([val, innerValue.value?.[1]], { e, position: 'first', trigger: 'input' })
              }
              {...inputProps.value[0]}
            />

            <div class={`${COMPONENT_NAME.value}__inner-separator`}>{separator}</div>

            <Input
              ref={inputRefs.secondInputRef}
              class={`${COMPONENT_NAME.value}__inner-right`}
              inputClass={{
                [`${classPrefix.value}-is-focused`]: props.activeIndex === 1,
              }}
              placeholder={placeholder.value[1]}
              disabled={disabled.value}
              readonly={props.readonly}
              format={format.value[1]}
              value={innerValue.value?.[1]}
              onClick={({ e }: { e: MouseEvent }) => props.onClick?.({ e, position: 'second' })}
              onClear={() => setInnerValue([], { position: 'second', trigger: 'input' })}
              onEnter={(val, { e }) =>
                handleEnter([innerValue.value?.[0], val], { e, position: 'second' } as {
                  e: any;
                  position: RangeInputPosition;
                })
              }
              onFocus={(val, { e }) =>
                handleFocus([innerValue.value?.[0], val], { e, position: 'second' } as {
                  e: any;
                  position: RangeInputPosition;
                })
              }
              onBlur={(val, { e }) =>
                handleBlur([innerValue.value?.[0], val], { e, position: 'second' } as {
                  e: any;
                  position: RangeInputPosition;
                })
              }
              onChange={(val, { e }) =>
                setInnerValue([innerValue.value?.[0], val], { e, position: 'second', trigger: 'input' })
              }
              {...inputProps.value[1]}
            />
            {suffixContent ? <div class={`${COMPONENT_NAME.value}__suffix`}>{suffixContent}</div> : null}
            {(suffixIconContent || isShowClearIcon.value) && (
              <span class={`${COMPONENT_NAME.value}__suffix ${COMPONENT_NAME.value}__suffix-icon`}>
                {isShowClearIcon.value ? (
                  <CloseCircleFilledIcon class={`${COMPONENT_NAME.value}__suffix-clear`} onClick={handleClear} />
                ) : (
                  suffixIconContent
                )}
              </span>
            )}
          </div>
        </div>
      );

      const tipsClasses = [
        `${COMPONENT_NAME.value}__tips`,
        `${classPrefix.value}-tips`,
        `${classPrefix.value}-is-${props.status}`,
      ];
      return (
        <Fragment>
          {RangeInputContent}
          {tips && <div class={tipsClasses}>{tips}</div>}
        </Fragment>
      );
    };
  },
});
