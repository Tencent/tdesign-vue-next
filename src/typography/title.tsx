import { defineComponent, h } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './title-props';
import Ellipsis from './ellipsis';
import { useContent } from '../hooks/tnode';

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
        <Ellipsis {...props}>{h(Tag, { class: COMPONENT_NAME.value }, ...content)}</Ellipsis>
      ) : (
        <>{h(Tag, { class: COMPONENT_NAME.value }, ...content)}</>
      );
    };
  },
});
