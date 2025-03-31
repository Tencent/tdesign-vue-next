import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-sender-props';

export default defineComponent({
  name: 'TChatSender',
  props,
  setup(props) {
    const componentName = usePrefixClass('chat-sender');

    return () => <div class={`${componentName.value}`}></div>;
  },
});
