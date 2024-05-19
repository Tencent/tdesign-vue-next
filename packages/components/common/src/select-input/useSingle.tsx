import { SetupContext, ref, computed, toRefs, Ref } from 'vue';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import Input, { StrInputProps } from '../input';
import Loading from '../loading';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import useDefaultValue from '../hooks/useDefaultValue';
import { useFormDisabled } from '../form/hooks';
import { PopupInstanceFunctions } from '../popup';
import { TdSelectInputProps } from '@td/intel/select-input/type';
import { SelectInputCommonProperties } from './interface';

// single 和 multiple 共有特性
const COMMON_PROPERTIES = [
  'status',
  'clearable',
  'disabled',
  'label',
  'placeholder',
  'readonly',
  'suffix',
  'suffixIcon',
  'onPaste',
  'onMouseenter',
  'onMouseleave',
];

const DEFAULT_KEYS = {
  label: 'label',
  value: 'value',
  children: 'children',
};

export interface SelectInputValueDisplayOptions {
  useInputDisplay: boolean;
  usePlaceholder: boolean;
}

function getInputValue(value: TdSelectInputProps['value'], keys: TdSelectInputProps['keys']) {
  const iKeys = { ...DEFAULT_KEYS, ...keys };
  return isObject(value) ? value[iKeys.label] : value;
}

export default function useSingle(
  props: TdSelectInputProps & { valueDisplayOptions: SelectInputValueDisplayOptions },
  context: SetupContext,
  popupRef: Ref<PopupInstanceFunctions>,
) {
  const { value, keys, inputValue: propsInputValue } = toRefs(props);
  const classPrefix = usePrefixClass();
  const isSingleFocus = ref(props.autofocus);
  const inputRef = ref();
  const [inputValue, setInputValue] = useDefaultValue(
    propsInputValue,
    props.defaultInputValue ?? '',
    props.onInputChange,
    'inputValue',
  );
  const renderTNode = useTNodeJSX();
  const disable = useFormDisabled();

  const commonInputProps = computed<SelectInputCommonProperties>(() => ({
    ...pick(props, COMMON_PROPERTIES),
    disabled: disable.value,
  }));

  const onInnerClear = (context: { e: MouseEvent }) => {
    context?.e?.stopPropagation();
    props.onClear?.(context);
    setInputValue('', { trigger: 'clear' });
  };

  const onInnerInputChange: StrInputProps['onChange'] = (value, context) => {
    if (props.allowInput) {
      setInputValue(value, { ...context, trigger: context.trigger || 'input' });
    }
  };

  const renderSelectSingle = (popupVisible: boolean) => {
    const singleValueDisplay = renderTNode('valueDisplay');
    const displayedValue = popupVisible && props.allowInput ? inputValue.value : getInputValue(value.value, keys.value);
    const prefixContent = renderPrefixContent(singleValueDisplay, popupVisible);
    const inputProps = {
      ...commonInputProps.value,
      value: renderInputDisplay(singleValueDisplay, displayedValue, popupVisible),
      label: prefixContent.length ? () => prefixContent : undefined,
      autoWidth: props.autoWidth,
      readonly: !props.allowInput || props.readonly,
      placeholder: renderPlaceholder(singleValueDisplay),
      suffixIcon: !disable.value && props.loading ? () => <Loading loading size="small" /> : props.suffixIcon,
      showClearIconOnEmpty: Boolean(
        props.clearable && (inputValue.value || displayedValue) && !disable.value && !props.readonly,
      ),
      ...props.inputProps,
    };

    // eslint-disable-next-line
    const { tips, ...slots } = context.slots;

    const inputClassProps = popupVisible
      ? [`${classPrefix.value}-input--focused`, `${classPrefix.value}-is-focused`, inputProps?.inputClass]
      : inputProps?.inputClass;

    const onEnter: StrInputProps['onEnter'] = (val, context) => {
      props.onEnter?.(value.value, { ...context, inputValue: val });
    };

    const onFocus: StrInputProps['onFocus'] = (val, context) => {
      const overlayState = popupRef.value?.getOverlayState();
      if (isSingleFocus.value || overlayState?.hover) return;
      isSingleFocus.value = true;
      props.onFocus?.(value.value, { ...context, inputValue: val });
    };

    const onBlur: StrInputProps['onBlur'] = (val, context) => {
      const overlayState = popupRef.value?.getOverlayState();
      if (overlayState?.hover) return;
      isSingleFocus.value = false;
      props.onBlur?.(value.value, { ...context, inputValue: val });
    };

    return (
      <Input
        ref={inputRef}
        style={context.attrs?.style}
        v-slots={slots}
        {...{
          onChange: onInnerInputChange,
          onClear: onInnerClear,
          onEnter,
          onFocus,
          onBlur,
          ...inputProps,
        }}
        inputClass={inputClassProps}
      />
    );
  };

  const renderPrefixContent = (singleValueDisplay: any, popupVisible: boolean) => {
    // 需要隐藏valueDisplay的两个情况
    // 1 用户传入usePlaceholder希望使用自带占位符实现，则应在未选择值时隐藏valueDisplay，只展示占位符
    // 2 用户传入useInputDisplay希望使用自带输入回显实现，激活选择器浮层时只展示input值（待讨论是否修改为激活后真的输入字符再隐藏valueDisplay，此处实现效果与不使用valueDisplay只使用filterable时不同）
    const label = renderTNode('label');

    if (!label && !singleValueDisplay) {
      return [];
    }

    if (singleValueDisplay) {
      if (
        (props.valueDisplayOptions?.usePlaceholder && !value.value) ||
        (props.valueDisplayOptions?.useInputDisplay && popupVisible)
      ) {
        return [label];
      }
    }
    return [label, singleValueDisplay];
  };

  const renderInputDisplay = (singleValueDisplay: any, displayedValue: any, popupVisible: boolean) => {
    // 使用valueDisplay插槽时，如用户传入useInputDisplay使用自带输入回显实现，未传则认为用户自行实现。
    if (singleValueDisplay)
      if (
        !props.valueDisplayOptions?.useInputDisplay ||
        (props.valueDisplayOptions?.useInputDisplay && !popupVisible)
      ) {
        return undefined;
      }
    return displayedValue;
  };

  const renderPlaceholder = (singleValueDisplay: any) => {
    // 使用valueDisplay插槽时，如用户传入usePlaceholder使用自带占位符实现，未传则认为用户自行实现。
    // 如果当前存在value（对应直接使用组件和select组件调用时），不显示占位符。
    if (singleValueDisplay) {
      if (!props.valueDisplayOptions?.usePlaceholder || (props.valueDisplayOptions?.usePlaceholder && value.value)) {
        return '';
      }
    }
    return props.placeholder;
  };

  return {
    inputRef,
    isSingleFocus,
    commonInputProps,
    singleInputValue: inputValue,
    onInnerClear,
    renderSelectSingle,
  };
}
