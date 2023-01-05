import { onBeforeMount, onMounted, Ref } from 'vue';
import { off, on } from '../utils/dom';

/** 键盘操作 */
export function useKeyboard(
  radioGroupRef: Ref<HTMLElement>,
  setInnerValue: (value: any, context: { e: Event }) => void,
) {
  const checkRadioInGroup = (e: KeyboardEvent) => {
    if (/enter/i.test(e.key) || /enter/i.test(e.code)) {
      const inputNode = (e.target as HTMLElement).querySelector('input');
      const dataValue: string = inputNode.getAttribute('data-value');
      let value = !isNaN(Number(dataValue)) ? Number(dataValue) : dataValue;
      value = typeof value === 'string' && value[0] === "'" ? value.replace(/'/g, '') : value;
      setInnerValue(value, { e });
    }
  };

  onMounted(() => {
    on(radioGroupRef.value, 'keydown', checkRadioInGroup);
  });

  onBeforeMount(() => {
    off(radioGroupRef.value, 'keydown', checkRadioInGroup);
  });
}
