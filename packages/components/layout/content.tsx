import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import { useContent } from '../hooks/tnode';
import props from './content-props';

export default defineComponent({
  name: 'TContent',
  props,
  setup() {
    const COMPONENT_NAME = usePrefixClass('layout__content');
    const renderContent = useContent();

    return () => <main class={COMPONENT_NAME.value}>{renderContent('default', 'content')}</main>;
  },
});
