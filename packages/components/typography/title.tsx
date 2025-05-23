import { defineComponent, h } from 'vue';
import { usePrefixClass } from '@tdesign/hooks';
import props from './title-props';
import Ellipsis from './ellipsis';
import { useContent } from '@tdesign/hooks';

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
