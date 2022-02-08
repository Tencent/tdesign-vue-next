import { ref, SetupContext } from 'vue';
import { TagInputValue, TdTagInputProps } from './type';
import { InputValue } from '../input';
import useDefault from '../hooks/useDefault';

export type ChangeParams = [Parameters<TdTagInputProps['onChange']>[1]];

// handle tag add and remove
export default function useTagList(props: TdTagInputProps, context: SetupContext) {
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
    props.onRemove?.({ ...p, trigger: 'tag-remove', value: tagValue.value });
  };

  const clearAll = (context: { e: MouseEvent }) => {
    setTagValue<ChangeParams>([], { trigger: 'clear', e: context.e });
  };

  // 按下 Enter 键，新增标签
  const onInnerEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
    const valueStr = String(value).trim();
    if (!valueStr) return;
    const isLimitExceeded = props.max && tagValue.value?.length >= props.max;
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
      props.onRemove?.({ e, index, item, trigger, value: tagValue.value });
    }
    oldInputValue.value = value;
  };

  return {
    tagValue,
    clearAll,
    onClose,
    onInnerEnter,
    onInputBackspaceKeyUp,
  };
}
