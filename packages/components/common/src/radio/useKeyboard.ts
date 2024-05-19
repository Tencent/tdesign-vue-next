import type { Ref } from '@td/adapter-vue';
import { onBeforeMount, onMounted } from '@td/adapter-vue';
import { isString } from 'lodash-es';
import { off, on } from '../utils/dom';
import { CHECKED_CODE_REG } from '../_common/js/common';

/** 键盘操作 */
export default function useKeyboard(
  radioGroupRef: Ref<HTMLElement>,
  setInnerValue: (value: any, context: { e: Event }) => void,
) {
  const checkRadioInGroup = (e: KeyboardEvent) => {
    const isCheckedCode = CHECKED_CODE_REG.test(e.key) || CHECKED_CODE_REG.test(e.code);
    if (isCheckedCode) {
      e.preventDefault();
      const inputNode = (e.target as HTMLElement).querySelector('input');
      if (!inputNode) {
        return;
      }

      const data = inputNode.dataset;
      if (inputNode.checked && data.allowUncheck) {
        setInnerValue(undefined, { e });
      } else {
        // Number
        let value: number | string | boolean = !isNaN(Number(data.value)) ? Number(data.value) : data.value;
        // Boolean
        value = (isString(value) && { true: true, false: false }[value]) || value;
        // String
        value = isString(value) && value[0] === '\'' ? value.replace(/'/g, '') : value;
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
