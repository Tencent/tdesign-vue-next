import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-reasoning-props';

export default defineComponent({
  name: 'TChatReasoning',
  props,
  setup(props) {
    const componentName = usePrefixClass('chat-reasoning');

    return () => <div class={`${componentName.value}`}></div>;
  },
});
