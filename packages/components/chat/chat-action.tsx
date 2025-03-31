import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-action-props';

export default defineComponent({
  name: 'TChatAction',
  props,
  setup(props) {
    const componentName = usePrefixClass('chat-action');

    return () => <div class={`${componentName.value}`}></div>;
  },
});
