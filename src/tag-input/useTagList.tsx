import { ref, toRefs } from 'vue';
import { TagInputValue, TdTagInputProps, TagInputChangeContext } from './type';
import { InputValue } from '../input';
import Tag from '../tag';
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

export type ChangeParams = [TagInputChangeContext];

// handle tag add and remove
export default function useTagList(props: TdTagInputProps) {
  const renderTNode = useTNodeJSX();
  const classPrefix = usePrefixClass();
  const { value, modelValue, onRemove, max, minCollapsedNum, size, disabled, readonly, tagProps } = toRefs(props);
  // handle controlled property and uncontrolled property
  const [tagValue, setTagValue] = useVModel(value, modelValue, props.defaultValue || [], props.onChange);
  const oldInputValue = ref<InputValue>();

  // 点击标签关闭按钮，删除标签
  const onClose = (p: { e?: MouseEvent; index: number; item: string | number }) => {
    const arr = [...tagValue.value];
    arr.splice(p.index, 1);
    setTagValue(arr, { trigger: 'tag-remove', ...p });
    onRemove.value?.({ ...p, trigger: 'tag-remove', value: arr });
  };

  const clearAll = (context: { e: MouseEvent }) => {
    setTagValue([], { trigger: 'clear', e: context.e });
  };

  // 按下 Enter 键，新增标签
  const onInnerEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
    const valueStr = value ? String(value).trim() : '';
    if (!valueStr) return;
    const isLimitExceeded = max && tagValue.value?.length >= max.value;
    let newValue: TagInputValue = tagValue.value;
    if (!isLimitExceeded) {
      newValue = tagValue.value instanceof Array ? tagValue.value.concat(String(valueStr)) : [valueStr];
      setTagValue(newValue, {
        trigger: 'enter',
        index: newValue.length - 1,
        item: valueStr,
        e: context.e,
      });
    }
    props?.onEnter?.(newValue, { ...context, inputValue: value });
  };

  // 按下回退键，删除标签
  const onInputBackspaceKeyUp = (value: InputValue, context: { e: KeyboardEvent }) => {
    const { e } = context;
    if (!tagValue.value || !tagValue.value.length) return;
    // 回车键删除，输入框值为空时，才允许 Backspace 删除标签
    if (!oldInputValue.value && ['Backspace', 'NumpadDelete'].includes(e.code)) {
      const index = tagValue.value.length - 1;
      const item = tagValue.value[index];
      const trigger = 'backspace';
      setTagValue(tagValue.value.slice(0, -1), { e, index, item, trigger });
      onRemove.value?.({ e, index, item, trigger, value: tagValue.value });
    }
    oldInputValue.value = value;
  };

  const renderLabel = ({ displayNode, label }: { displayNode: any; label: any }) => {
    const newList = minCollapsedNum.value ? tagValue.value.slice(0, minCollapsedNum.value) : tagValue.value;
    const list = displayNode
      ? [displayNode]
      : newList?.map((item, index) => {
          const tagContent = renderTNode('tag', { params: { value: item } });
          return (
            <Tag
              key={`${item}${index}`}
              size={size.value}
              disabled={disabled.value}
              onClose={(context: { e: MouseEvent }) => onClose({ e: context.e, item, index })}
              closable={!readonly.value && !disabled.value}
              {...tagProps.value}
            >
              {tagContent ?? item}
            </Tag>
          );
        });
    if (![null, undefined, ''].includes(label)) {
      list.unshift(
        <div class={`${classPrefix.value}-tag-input__prefix`} key="label">
          {label}
        </div>,
      );
    }
    // 超出省略
    if (newList.length !== tagValue.value.length) {
      const len = tagValue.value.length - newList.length;
      const more = renderTNode('collapsedItems', {
        params: {
          value: tagValue,
          count: tagValue.value.length,
          collapsedTags: tagValue.value.slice(minCollapsedNum.value, tagValue.value.length),
        },
      });
      list.push(more ?? <Tag key="more">+{len}</Tag>);
    }
    return list;
  };

  return {
    tagValue,
    clearAll,
    onClose,
    onInnerEnter,
    onInputBackspaceKeyUp,
    renderLabel,
  };
}
