import { SetupContext, ref, computed, toRefs } from 'vue';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import { SelectInputCommonProperties } from './interface';
import { TdSelectInputProps } from './type';
import Input, { InputValue, TdInputProps } from '../input';
import Loading from '../loading';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import useDefaultValue from '../hooks/useDefaultValue';
import { useFormDisabled } from '../form/hooks';

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

function getInputValue(value: TdSelectInputProps['value'], keys: TdSelectInputProps['keys']) {
  const iKeys = { ...DEFAULT_KEYS, ...keys };
  return isObject(value) ? value[iKeys.label] : value;
}

export default function useSingle(props: TdSelectInputProps, context: SetupContext) {
  const { value, keys, inputValue: propsInputValue } = toRefs(props);
  const classPrefix = usePrefixClass();
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

  const onInnerInputChange: TdInputProps['onChange'] = (value, context) => {
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
      allowTriggerBlur: props.allowInput && !props.readonly,
      ...props.inputProps,
    };

    // eslint-disable-next-line
    const { tips, ...slots } = context.slots;

    const inputClassProps = popupVisible
      ? [`${classPrefix.value}-input--focused`, `${classPrefix.value}-is-focused`, inputProps?.inputClass]
      : inputProps?.inputClass;

    return (
      <Input
        ref="inputRef"
        style={context.attrs?.style}
        v-slots={slots}
        {...{
          onChange: onInnerInputChange,
          onClear: onInnerClear,
          onBlur: (val: InputValue, context: { e: MouseEvent }) => {
            props.onBlur?.(value.value, { ...context, inputValue: val });
          },
          onEnter: (val: InputValue, context: { e: KeyboardEvent }) => {
            props.onEnter?.(value.value, { ...context, inputValue: val });
          },
          onFocus: (val, context) => {
            props.onFocus?.(value.value, { ...context, inputValue: val });
            //删除，下面这行代码不允许恢复！不符合正常逻辑，也会造成 defaultInputValue 无效；树形结构搜索功能异常等问题
            // !popupVisible && setInputValue(getInputValue(value.value, keys.value), { ...context, trigger: 'input' }); // 聚焦时拿到value
          },
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
    if (singleValueDisplay) {
      if (
        (props.valueDisplayOptions?.usePlaceholder && !value.value) ||
        (props.valueDisplayOptions?.useInputDisplay && popupVisible)
      ) {
        return [renderTNode('label')];
      }
    }
    return [renderTNode('label'), singleValueDisplay];
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
    commonInputProps,
    onInnerClear,
    renderSelectSingle,
  };
}
