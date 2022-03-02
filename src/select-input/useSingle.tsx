import { SetupContext, ref, watch, computed, toRefs } from 'vue';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import Input, { InputValue } from '../input';
import { SelectInputCommonProperties } from './interface';
import { TdSelectInputProps } from './type';
import { useTNodeJSX } from '../hooks/tnode';

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
  const { value, keys } = toRefs(props);
  const inputRef = ref();
  const inputValue = ref<string | number>('');
  const renderTNode = useTNodeJSX();

  const commonInputProps = computed<SelectInputCommonProperties>(() => pick(props, COMMON_PROPERTIES));

  const onInnerClear = (context: { e: MouseEvent }) => {
    context?.e?.stopPropagation();
    props.onClear?.(context);
    inputValue.value = '';
  };

  const onInnerInputChange = (value: InputValue, context: { e: InputEvent | MouseEvent }) => {
    if (props.allowInput) {
      inputValue.value = value;
      props.onInputChange?.(value, { ...context, trigger: 'input' });
    }
  };

  watch(
    [value],
    () => {
      inputValue.value = getInputValue(value.value, keys.value);
    },
    { immediate: true },
  );

  const renderSelectSingle = () => {
    const singleValueDisplay = renderTNode('valueDisplay');
    const prefixContent = [singleValueDisplay, renderTNode('label')];
    const inputProps = {
      ...commonInputProps.value,
      ...props.inputProps,
      value: singleValueDisplay ? undefined : inputValue.value,
      label: prefixContent.length ? () => prefixContent : undefined,
      autoWidth: props.autoWidth,
      readonly: !props.allowInput,
      placeholder: singleValueDisplay ? '' : props.placeholder,
    };
    return (
      <Input
        ref="inputRef"
        {...inputProps}
        v-slots={context.slots}
        onChange={onInnerInputChange}
        onClear={onInnerClear}
        onBlur={(val, context) => {
          props.onBlur?.(value, { ...context, inputValue: val });
          inputValue.value = getInputValue(value.value, keys.value);
        }}
        onFocus={(val, context) => {
          props.onFocus?.(value, { ...context, inputValue: val });
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
