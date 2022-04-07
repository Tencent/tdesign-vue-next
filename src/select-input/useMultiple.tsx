import { SetupContext, computed, ref, toRefs } from 'vue';
import isObject from 'lodash/isObject';
import { TdSelectInputProps, SelectInputChangeContext, SelectInputKeys } from './type';
import { SelectInputCommonProperties } from './interface';
import { InputValue } from '../input';
import TagInput, { TagInputValue, InputValueChangeContext } from '../tag-input';
import Loading from '../loading';
import useDefault from '../hooks/useDefaultValue';
import { usePrefixClass } from '../hooks/useConfig';

export interface RenderSelectMultipleParams {
  commonInputProps: SelectInputCommonProperties;
  onInnerClear: (context: { e: MouseEvent }) => void;
  popupVisible: boolean;
}

const DEFAULT_KEYS = {
  label: 'label',
  key: 'key',
  children: 'children',
};

export default function useMultiple(props: TdSelectInputProps, context: SetupContext) {
  const { inputValue } = toRefs(props);
  const classPrefix = usePrefixClass();
  const tagInputRef = ref();
  const [tInputValue, setTInputValue] = useDefault(
    inputValue,
    props.defaultInputValue,
    props.onInputChange,
    'inputValue',
  );

  const iKeys = computed<SelectInputKeys>(() => ({ ...DEFAULT_KEYS, ...props.keys }));
  const tags = computed<TagInputValue>(() => {
    if (!(props.value instanceof Array)) {
      return isObject(props.value) ? [props.value[iKeys.value.label]] : [props.value];
    }
    return props.value.map((item) => (isObject(item) ? item[iKeys.value.label] : item));
  });

  const tPlaceholder = computed<string>(() => (!tags.value || !tags.value.length ? props.placeholder : ''));

  const onTagInputChange = (val: TagInputValue, context: SelectInputChangeContext) => {
    // 避免触发浮层的显示或隐藏
    if (context.trigger === 'tag-remove') {
      context.e?.stopPropagation();
    }
    props.onTagChange?.(val, context);
  };

  const renderSelectMultiple = (p: RenderSelectMultipleParams) => {
    const tagInputProps = {
      ...p.commonInputProps,
      ...props.tagInputProps,
      tagProps: props.tagProps,
      label: props.label,
      autoWidth: props.autoWidth,
      placeholder: tPlaceholder.value,
      minCollapsedNum: props.minCollapsedNum,
      collapsedItems: props.collapsedItems,
      tag: props.tag,
      value: tags.value,
      valueDisplay: props.valueDisplay,
      inputValue: tInputValue.value || '',
      inputProps: {
        readonly: !props.allowInput || props.readonly,
        inputClass: {
          [`${classPrefix.value}-input--focused`]: p.popupVisible,
        },
      },
      suffixIcon: !props.disabled && props.loading ? () => <Loading loading size="small" /> : props.suffixIcon,
    };

    return (
      <TagInput
        ref="tagInputRef"
        {...tagInputProps}
        v-slots={context.slots}
        onInputChange={(val: InputValue, context: InputValueChangeContext) => {
          // 筛选器统一特性：筛选器按下回车时不清空输入框
          if (context?.trigger === 'enter') return;
          setTInputValue(val, { trigger: context.trigger, e: context.e });
        }}
        onChange={onTagInputChange}
        onClear={p.onInnerClear}
        onBlur={(val, context) => {
          // 筛选器统一特性：失去焦点时，清空输入内容
          setTInputValue('', { ...context, trigger: 'blur' });
          props.onBlur?.(props.value, { ...context, tagInputValue: val });
        }}
        onFocus={(val, context) => {
          props.onFocus?.(props.value, { ...context, tagInputValue: val });
        }}
      />
    );
  };

  return {
    tags,
    tPlaceholder,
    tagInputRef,
    renderSelectMultiple,
  };
}
