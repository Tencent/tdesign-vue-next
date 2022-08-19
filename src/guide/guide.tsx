import { computed, defineComponent } from 'vue';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import props from './props';

export default defineComponent({
  name: 'TGuide',
  props: { ...props },
  setup(props) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('link');
    const { STATUS, SIZE } = useCommonClassName();
    const { classPrefix } = useConfig('classPrefix');

    return () => {
      return <div>guide</div>;
    };
  },
});
