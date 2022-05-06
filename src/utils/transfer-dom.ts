import { DirectiveBinding } from 'vue';
import { getAttach } from './dom';

// Set code to be same as Vue2.
const TransferDom = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (!binding.value) return;
    const parentNode = getAttach(binding.value);
    parentNode?.appendChild(el);
  },
};

export default TransferDom;
