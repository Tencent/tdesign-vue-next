import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './props';

export default defineComponent({
  name: 'TChat',
  props,
  setup(props) {
    const componentName = usePrefixClass('chat');

    return () => <div class={`${componentName.value}`}></div>;
  },
});
