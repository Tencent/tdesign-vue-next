import { defineComponent } from 'vue';
import { useContent, usePrefixClass } from '@tdesign/hooks';

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
