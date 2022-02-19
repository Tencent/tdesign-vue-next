import { SetupContext, ref, VNode, watch, computed, toRefs } from 'vue';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import Input, { InputValue } from '../input';
import { SelectInputCommonProperties } from './interface';
import { TdSelectInputProps, SelectInputKeys } from './type';

export interface RenderSelectSingleInputParams {
  prefix: VNode[];
  singleValueDisplay: VNode;
  tPlaceholder: string;
}

// single 和 multiple 共有特性
const COMMON_PROPERTIES = [
  'status',
  'tips',
  'clearable',
  'disabled',
  'label',
  'placeholder',
  'readonly',
  'suffix',
  'suffixIcon',
  'onPaste',
  'onBlur',
  'onFocus',
  'onEnter',
  'onMouseenter',
  'onMouseleave',
];

const DEFAULT_KEYS = {
  label: 'label',
  key: 'key',
};

export default function useSingle(props: TdSelectInputProps, context: SetupContext) {
  const { value } = toRefs(props);
  const inputRef = ref();
  const inputValue = ref();

  const commonInputProps = computed<SelectInputCommonProperties>(() => pick(props, COMMON_PROPERTIES));

  const onInnerClear = (context: { e: MouseEvent }) => {
    context?.e?.stopPropagation();
    props.onClear?.(context);
    inputValue.value = '';
  };

  const onInnerInputChange = (value: InputValue, context: { e: InputEvent | MouseEvent }) => {
    if (props.allowInput) {
      inputValue.value = value;
      props.onInputChange?.(value, context);
    }
  };

  const iKeys = computed<SelectInputKeys>(() => ({ ...DEFAULT_KEYS, ...props.keys }));

  watch(
    [value],
    () => {
      inputValue.value = isObject(value.value) ? value.value[iKeys.value.label] : value.value;
    },
    { immediate: true },
  );

  const renderSelectSingle = (p: RenderSelectSingleInputParams) => {
    return (
      <Input
        ref="inputRef"
        {...commonInputProps.value}
        v-slots={{ ...context.slots }}
        autoWidth={props.borderless}
        placeholder={p.singleValueDisplay ? '' : props.placeholder}
        value={p.singleValueDisplay ? undefined : inputValue.value}
        label={p.prefix.length ? () => p.prefix : undefined}
        onChange={onInnerInputChange}
        readonly={!props.allowInput}
        onClear={onInnerClear}
        {...props.inputProps}
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
