import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-content-props';

export default defineComponent({
  name: 'TChatContent',
  props,
  setup(props) {
    const componentName = usePrefixClass('chat-content');

    return () => <div class={`${componentName.value}`}></div>;
  },
});
