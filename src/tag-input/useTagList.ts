import { ref } from 'vue';
import { TagInputValue, TdTagInputProps } from './type';
import { InputValue } from '../input';
import { CloseFuncContext } from './tag-list';

export default function useTagList(props: TdTagInputProps) {
  const { onChange, onEnter } = props;
  const oldInputValue = ref<InputValue>();

  // 点击标签关闭按钮，删除标签
  const onClose = (p: CloseFuncContext) => {
    const arr = [...props.value];
    arr.splice(p.index, 1);
    onChange?.(arr, { trigger: 'tag-delete', index: p.index, e: p.e });
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
    onEnter?.(newValue, { ...context, inputValue: value });
  };

  // 按下回退键，删除标签
  const onInputBackspaceKeyUp = (value: InputValue, context: { e: KeyboardEvent }) => {
    const { e } = context;
    // 回车键删除，输入框值为空时，才允许 Backspace 删除标签。TODO: 小键盘删除测试
    if (!oldInputValue.value && e.code === 'Backspace') {
      onChange?.(props.value.slice(0, -1), {
        trigger: 'backspace',
        index: props.value?.length,
        e,
      });
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
