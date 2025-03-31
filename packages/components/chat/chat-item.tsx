import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-item-props';

export default defineComponent({
  name: 'TChatItem',
  props,
  setup(props) {
    const componentName = usePrefixClass('chat-item');

    return () => <div class={`${componentName.value}`}></div>;
  },
});
