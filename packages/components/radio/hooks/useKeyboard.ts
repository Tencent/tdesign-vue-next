import { onBeforeMount, onMounted, Ref } from 'vue';
import { isString } from 'lodash-es';
import { off, on } from '@tdesign/shared-utils';
import { CHECKED_CODE_REG } from '@tdesign/common-js/common';

/** 键盘操作 */
export function useKeyboard(
  radioGroupRef: Ref<HTMLElement>,
  setInnerValue: (value: any, context: { e: Event }) => void,
) {
  const checkRadioInGroup = (e: KeyboardEvent) => {
    const inputNode = (e.target as HTMLElement).querySelector('input');
    if (!inputNode) return;

    const isCheckedCode = CHECKED_CODE_REG.test(e.key) || CHECKED_CODE_REG.test(e.code);
    if (isCheckedCode) {
      e.preventDefault();

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
