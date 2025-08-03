import { defineComponent, h } from 'vue';
import { useContent, usePrefixClass } from '@tdesign/shared-hooks';
import props from './title-props';
import Ellipsis from './components/ellipsis';

export default defineComponent({
  name: 'TTypographyTitle',
  props,
  setup(props, { attrs }) {
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
        <>{h(Tag, { class: COMPONENT_NAME.value, ...attrs }, ...content)}</>
      );
    };
  },
});
