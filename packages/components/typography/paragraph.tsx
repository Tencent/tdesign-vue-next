import { defineComponent, computed, PropType } from 'vue';
import { usePrefixClass, useContent } from '@tdesign/shared-hooks';
import props from './paragraph-props';
import Ellipsis from './components/ellipsis';

export default defineComponent({
  name: 'TTypographyParagraph',
  props: {
    style: {
      type: Object as PropType<Record<string, string | number>>,
      default: () => ({}),
    },
    ...props,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const renderContent = useContent();
    const content = computed(() => {
      return renderContent('content', 'default');
    });

    return () => {
      return props.ellipsis ? (
        <Ellipsis {...props} class={COMPONENT_NAME.value}>
          {content.value}
        </Ellipsis>
      ) : (
        <p class={COMPONENT_NAME.value}>{content.value}</p>
      );
    };
  },
});
