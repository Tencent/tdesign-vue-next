import { SetupContext, computed, ref, toRefs } from 'vue';
import isObject from 'lodash/isObject';
import { TdSelectInputProps, SelectInputChangeContext, SelectInputKeys } from './type';
import TagInput, { TagInputValue } from '../tag-input';
import { SelectInputCommonProperties } from './interface';
import useDefault from '../hooks/useDefault';

export interface RenderSelectMultipleParams {
  commonInputProps: SelectInputCommonProperties;
  onInnerClear: (context: { e: MouseEvent }) => void;
}

const DEFAULT_KEYS = {
  label: 'label',
  key: 'key',
  children: 'children',
};

export default function useMultiple(props: TdSelectInputProps, context: SetupContext) {
  const { inputValue } = toRefs(props);
  const tagInputRef = ref();
  const [tInputValue, setTInputValue] = useDefault(
    inputValue,
    props.defaultInputValue,
    props.onInputChange,
    context.emit,
    'inputValue',
  );
  const iKeys = computed<SelectInputKeys>(() => ({ ...DEFAULT_KEYS, ...props.keys }));
  const tags = computed<TagInputValue>(() => {
    if (!(props.value instanceof Array)) {
      return isObject(props.value) ? [props.value[iKeys.value.label]] : [props.value];
    }
    return props.value.map((item) => {
      return isObject(item) ? item[iKeys.value.label] : item;
    });
  });

  const tPlaceholder = computed<string>(() => {
    return !tags.value || !tags.value.length ? props.placeholder : '';
  });

  const onTagInputChange = (val: TagInputValue, context: SelectInputChangeContext) => {
    // 避免触发浮层的显示或隐藏
    if (context.trigger === 'tag-remove') {
      context.e?.stopPropagation();
    }
    props.onTagChange?.(val, context);
  };

  const renderSelectMultiple = (p: RenderSelectMultipleParams) => {
    return (
      <TagInput
        ref="tagInputRef"
        {...p.commonInputProps}
        v-slots={context.slots}
        label={props.label}
        readonly={!props.allowInput}
        autoWidth={props.borderless || props.autoWidth}
        minCollapsedNum={props.minCollapsedNum}
        collapsedItems={props.collapsedItems}
        tag={props.tag}
        valueDisplay={props.valueDisplay}
        placeholder={tPlaceholder.value}
        value={tags.value}
        inputValue={tInputValue.value || ''}
        onChange={onTagInputChange}
        onInputChange={(val, context) => {
          // 筛选器统一特性：筛选器按下回车时不清空输入框
          if (context?.trigger === 'enter') return;
          setTInputValue(val, { trigger: context.trigger, e: context.e });
        }}
        tagProps={props.tagProps}
        onClear={p.onInnerClear}
        onBlur={(val, context) => {
          // 筛选器统一特性：失去焦点时，清空输入内容
          setTInputValue('', { ...context, trigger: 'blur' });
          props.onBlur?.(props.value, { ...context, tagInputValue: val });
        }}
        onFocus={(val, context) => {
          props.onFocus?.(props.value, { ...context, tagInputValue: val });
        }}
        {...props.tagInputProps}
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
