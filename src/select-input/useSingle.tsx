import { SetupContext, ref, watch, computed, toRefs } from 'vue';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import { SelectInputCommonProperties } from './interface';
import { TdSelectInputProps } from './type';
import Input, { InputValue } from '../input';
import Loading from '../loading';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import useDefaultValue from '../hooks/useDefaultValue';

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
  'onEnter',
  'onMouseenter',
  'onMouseleave',
];

const DEFAULT_KEYS = {
  label: 'label',
  value: 'value',
};

function getInputValue(value: TdSelectInputProps['value'], keys: TdSelectInputProps['keys']) {
  const iKeys = keys || DEFAULT_KEYS;
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

  const commonInputProps = computed<SelectInputCommonProperties>(() => pick(props, COMMON_PROPERTIES));

  const onInnerClear = (context: { e: MouseEvent }) => {
    context?.e?.stopPropagation();
    props.onClear?.(context);
    setInputValue('', { trigger: 'clear' });
  };

  const onInnerInputChange = (value: InputValue, context: { e: InputEvent | MouseEvent }) => {
    if (props.allowInput) {
      setInputValue(value, { ...context, trigger: 'input' });
    }
  };

  const renderSelectSingle = (popupVisible: boolean) => {
    const singleValueDisplay = renderTNode('valueDisplay');
    const displayedValue = popupVisible && props.allowInput ? inputValue.value : getInputValue(value.value, keys.value);
    const prefixContent = [singleValueDisplay, renderTNode('label')];
    const inputProps = {
      ...commonInputProps.value,
      ...props.inputProps,
      value: singleValueDisplay ? undefined : displayedValue,
      label: prefixContent.length ? () => prefixContent : undefined,
      autoWidth: props.autoWidth,
      readonly: !props.allowInput,
      placeholder: singleValueDisplay ? '' : props.placeholder,
      suffixIcon: !props.disabled && props.loading ? () => <Loading loading size="small" /> : props.suffixIcon,
      showClearIconOnEmpty: Boolean(props.clearable && inputValue.value),
    };
    return (
      <Input
        ref="inputRef"
        {...inputProps}
        v-slots={context.slots}
        onChange={onInnerInputChange}
        onClear={onInnerClear}
        onBlur={(val: InputValue, context: { e: MouseEvent }) => {
          props.onBlur?.(value.value, { ...context, inputValue: val });
          inputValue.value = getInputValue(value.value, keys.value);
        }}
        onMouseenter={() => {
          if (inputValue.value) return;
          inputValue.value = getInputValue(value.value, keys.value);
        }}
        onEnter={(val: InputValue, context: { e: KeyboardEvent }) => {
          props.onEnter?.(value.value, { ...context, inputValue: val });
        }}
        onFocus={(val, context) => {
          props.onFocus?.(value.value, { ...context, inputValue: val });
          !popupVisible && setInputValue(getInputValue(value.value, keys.value), { ...context, trigger: 'input' }); // 聚焦时拿到value
        }}
        inputClass={{
          [`${classPrefix.value}-input--focused`]: popupVisible,
        }}
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
