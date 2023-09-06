import { computed, defineComponent, h, provide } from 'vue';
import props from './button-group-props';
import { usePrefixClass } from '../hooks/useConfig';
import { useContent } from '../hooks/tnode';
import { ButtonGroupInjectionKey } from './constants';

export default defineComponent({
  name: 'TButtonGroup',
  props,
  setup(props) {
    const renderContent = useContent();
    const COMPONENT_NAME = usePrefixClass('button-group');

    const buttonGroupClass = computed(() => [`${COMPONENT_NAME.value}`]);

    provide(
      ButtonGroupInjectionKey,
      computed(() => ({
        theme: props.theme,
        size: props.size,
        disabled: props.disabled,
      })),
    );
    return () => {
      const content = renderContent('default', 'content');
      return <div class={buttonGroupClass.value}>{content}</div>;
    };
  },
});
