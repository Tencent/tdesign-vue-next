import { isString } from 'lodash-es';
import { defineComponent } from '@td/adapter-vue';

import props from '@td/intel/components/list/list-item-meta-props';
import { usePrefixClass, useContent, useTNodeJSX } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TListItemMeta',
  props,
  setup(props, ctx) {
    const COMPONENT_NAME = usePrefixClass('list-item__meta');
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

    const renderAvatar = () => {
      if (props.avatar || ctx.slots.avatar) {
        console.warn('`avatar` is going to be deprecated, please use `image` instead');
      }
      const thumbnail = renderContent('avatar', 'image');
      if (!thumbnail) return;
      if (isString(thumbnail)) {
        return (
          <div class={`${COMPONENT_NAME.value}-avatar`}>
            <img src={thumbnail}></img>
          </div>
        );
      }
      return <div class={`${COMPONENT_NAME.value}-avatar`}>{thumbnail}</div>;
    };
    return () => {
      const propsTitleContent = renderTNodeJSX('title');
      const propsDescriptionContent = renderTNodeJSX('description');

      const listItemMetaContent = [
        renderAvatar(),
        <div class={`${COMPONENT_NAME.value}-content`}>
          {propsTitleContent && <h3 class={`${COMPONENT_NAME.value}-title`}>{propsTitleContent}</h3>}
          {propsDescriptionContent && <p class={`${COMPONENT_NAME.value}-description`}>{propsDescriptionContent}</p>}
        </div>,
      ];

      return <div class={COMPONENT_NAME.value}>{listItemMetaContent}</div>;
    };
  },
});
