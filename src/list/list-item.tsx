import { defineComponent } from 'vue';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TListItem',
  props,
  setup() {
    const COMPONENT_NAME = usePrefixClass('list-item');
    return {
      COMPONENT_NAME,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    const propsDefaultContent = renderTNodeJSX(this, 'default');
    const propsContent = renderTNodeJSX(this, 'content');
    const propsActionContent = renderTNodeJSX(this, 'action');

    return (
      <li class={COMPONENT_NAME}>
        <div class={`${COMPONENT_NAME}-main`}>
          {propsDefaultContent || propsContent}
          {propsActionContent && <li class={`${COMPONENT_NAME}__action`}>{propsActionContent}</li>}
        </div>
      </li>
    );
  },
});
