import { onBeforeMount, onMounted, Ref } from 'vue';
import { off, on } from '../utils/dom';
import isString from 'lodash/isString';

/** 键盘操作 */
export default function useKeyboard(
  radioGroupRef: Ref<HTMLElement>,
  setInnerValue: (value: any, context: { e: Event }) => void,
) {
  const checkRadioInGroup = (e: KeyboardEvent) => {
    if (/enter/i.test(e.key) || /enter/i.test(e.code)) {
      const inputNode = (e.target as HTMLElement).querySelector('input');
      const data = inputNode.dataset;
      if (inputNode.checked && data.allowUncheck) {
        setInnerValue(undefined, { e });
      } else {
        // Number
        let value: number | string | boolean = !isNaN(Number(data.value)) ? Number(data.value) : data.value;
        // Boolean
        value = (isString(value) && { true: true, false: false }[value]) || value;
        // String
        value = isString(value) && value[0] === "'" ? value.replace(/'/g, '') : value;
        setInnerValue(value, { e });
      }
    }
  };

  onMounted(() => {
    on(radioGroupRef.value, 'keydown', checkRadioInGroup);
  });

  onBeforeMount(() => {
    off(radioGroupRef.value, 'keydown', checkRadioInGroup);
  });
}
