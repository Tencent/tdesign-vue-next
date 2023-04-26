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
    const prefixContent = [renderTNode('label'), singleValueDisplay];
    const inputProps = {
      ...commonInputProps.value,
      value: singleValueDisplay ? undefined : displayedValue,
      label: prefixContent.length ? () => prefixContent : undefined,
      autoWidth: props.autoWidth,
      readonly: !props.allowInput || props.readonly,
      placeholder: singleValueDisplay ? '' : props.placeholder,
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

  return {
    inputRef,
    commonInputProps,
    onInnerClear,
    renderSelectSingle,
  };
}
