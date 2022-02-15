import { ref, SetupContext, toRefs } from 'vue';
import { TagInputValue, TdTagInputProps, TagInputChangeContext } from './type';
import { InputValue } from '../input';
import Tag from '../tag';
import useDefault from '../hooks/useDefault';
import { prefix } from '../config';
import { useTNodeJSX } from '../hooks/tnode';

export type ChangeParams = [TagInputChangeContext];

// handle tag add and remove
export default function useTagList(props: TdTagInputProps, context: SetupContext) {
  const renderTnode = useTNodeJSX();
  const { onRemove, max, minCollapsedNum, size, disabled, readonly, tagProps } = toRefs(props);
  // handle controlled property and uncontrolled property
  const [tagValue, setTagValue] = useDefault<TdTagInputProps['value'], TdTagInputProps>(
    props,
    context.emit,
    'value',
    'change',
  );
  // const { onChange } = props;
  const oldInputValue = ref<InputValue>();

  // 点击标签关闭按钮，删除标签
  const onClose = (p: { e: MouseEvent; index: number; item: string | number }) => {
    const arr = [...tagValue.value];
    arr.splice(p.index, 1);
    setTagValue<ChangeParams>(arr, { trigger: 'tag-remove', index: p.index, e: p.e });
    onRemove.value?.({ ...p, trigger: 'tag-remove', value: tagValue.value });
  };

  const clearAll = (context: { e: MouseEvent }) => {
    setTagValue<ChangeParams>([], { trigger: 'clear', e: context.e });
  };

  // 按下 Enter 键，新增标签
  const onInnerEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
    const valueStr = String(value).trim();
    if (!valueStr) return;
    const isLimitExceeded = max && tagValue.value?.length >= max.value;
    let newValue: TagInputValue = tagValue.value;
    if (!isLimitExceeded) {
      newValue = tagValue.value instanceof Array ? tagValue.value.concat(String(valueStr)) : [valueStr];
      setTagValue<ChangeParams>(newValue, {
        trigger: 'enter',
        index: newValue.length - 1,
        e: context.e,
      });
    }
    props?.onEnter?.(newValue, { ...context, inputValue: value });
  };

  // 按下回退键，删除标签
  const onInputBackspaceKeyUp = (value: InputValue, context: { e: KeyboardEvent }) => {
    const { e } = context;
    // 回车键删除，输入框值为空时，才允许 Backspace 删除标签
    if (!oldInputValue.value && ['Backspace', 'NumpadDelete'].includes(e.code)) {
      const index = tagValue.value?.length;
      const item = tagValue.value?.[index];
      const trigger = 'backspace';
      setTagValue<ChangeParams>(tagValue.value.slice(0, -1), { e, index, item, trigger });
      onRemove.value?.({ e, index, item, trigger, value: tagValue.value });
    }
    oldInputValue.value = value;
  };

  const renderLabel = ({
    slots,
    displayNode,
    label,
  }: {
    slots: SetupContext['slots'];
    displayNode: any;
    label: any;
  }) => {
    const newList = minCollapsedNum.value ? tagValue.value.slice(0, minCollapsedNum.value) : tagValue.value;
    const list = displayNode
      ? [displayNode]
      : newList?.map((item, index) => {
          const tagContent = renderTnode('tag', { params: { value: item } });
          return (
            <Tag
              key={item}
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
        <div class={`${prefix}-tag-input__prefix`} key="label">
          {label}
        </div>,
      );
    }
    // 超出省略
    if (newList.length !== tagValue.value.length) {
      const len = tagValue.value.length - newList.length;
      const more = renderTnode('collapsedItems', {
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
