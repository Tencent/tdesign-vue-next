import { ref } from 'vue';
import { TagInputValue, TdTagInputProps } from './type';
import { InputValue } from '../input';
import { TdTagProps } from '..';

export default function useTagList(props: TdTagInputProps) {
  const { onChange } = props;
  const oldInputValue = ref<InputValue>();

  // 点击标签关闭按钮，删除标签
  const onClose = (p: { e: MouseEvent; index: number; item: string | number }) => {
    const arr = [...props.value];
    arr.splice(p.index, 1);
    onChange?.(arr, { trigger: 'tag-remove', index: p.index, e: p.e });
    props.onRemove?.({ ...p, trigger: 'tag-remove', value: props.value });
  };

  const clearAll = (context: { e: MouseEvent }) => {
    onChange?.([], { trigger: 'clear', e: context.e });
  };

  // 按下 Enter 键，新增标签
  const onInnerEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
    const valueStr = String(value).trim();
    if (!valueStr) return;
    const isLimitExceeded = props.max && props.value?.length >= props.max;
    let newValue: TagInputValue = props.value;
    if (!isLimitExceeded) {
      newValue = props.value instanceof Array ? props.value.concat(String(valueStr)) : [valueStr];
      onChange?.(newValue, {
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
      const index = props.value?.length;
      const item = props.value?.[index];
      const trigger = 'backspace';
      onChange?.(props.value.slice(0, -1), { e, index, item, trigger });
      props.onRemove?.({ e, index, item, trigger, value: props.value });
    }
    oldInputValue.value = value;
  };

  return {
    clearAll,
    onClose,
    onInnerEnter,
    onInputBackspaceKeyUp,
  };
}
