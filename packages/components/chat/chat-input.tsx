import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-item-props';

export default defineComponent({
  name: 'TChatInput',
  props,
  setup(props) {
    const componentName = usePrefixClass('chat-input');

    return () => <div class={`${componentName.value}`}></div>;
  },
});
