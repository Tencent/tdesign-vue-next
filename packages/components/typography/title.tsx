import { defineComponent, h } from 'vue';
import { useContent, usePrefixClass } from '@tdesign/shared-hooks';
import props from './title-props';
import Ellipsis from './ellipsis';

export default defineComponent({
  name: 'TTypographyTitle',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const renderContent = useContent();

    return () => {
      const { level: Tag } = props;
      const content = renderContent('default', 'content');
      return props.ellipsis ? (
        <Ellipsis {...props} class={COMPONENT_NAME.value}>
          {h(Tag, ...content)}
        </Ellipsis>
      ) : (
        <>{h(Tag, { class: COMPONENT_NAME.value }, ...content)}</>
      );
    };
  },
});
