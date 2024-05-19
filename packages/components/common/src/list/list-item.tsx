import { defineComponent } from '@td/adapter-vue';
import props from '@td/intel/list/props';
import { usePrefixClass } from '@td/adapter-hooks';
import { useTNodeJSX } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TListItem',
  props,
  setup() {
    const COMPONENT_NAME = usePrefixClass('list-item');
    const renderTNodeJSX = useTNodeJSX();

    return () => {
      const propsContent = renderTNodeJSX('content');
      const propsDefaultContent = renderTNodeJSX('default');
      const propsActionContent = renderTNodeJSX('action');

      return (
        <li class={COMPONENT_NAME.value}>
          <div class={`${COMPONENT_NAME.value}-main`}>
            {propsDefaultContent || propsContent}
            {propsActionContent && <li class={`${COMPONENT_NAME.value}__action`}>{propsActionContent}</li>}
          </div>
        </li>
      );
    };
  },
});
