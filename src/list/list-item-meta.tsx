import { defineComponent, ComponentPublicInstance } from 'vue';
import props from './list-item-meta-props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TListItemMeta',
  props,
  setup(props, ctx) {
    const COMPONENT_NAME = usePrefixClass('list-item__meta');

    const renderAvatar = (context: ComponentPublicInstance) => {
      if (props.avatar || ctx.slots.avatar) {
        console.warn('`avatar` is going to be deprecated, please use `image` instead');
      }
      const thumbnail = renderContent(context, 'avatar', 'image');
      if (!thumbnail) return;
      if (typeof thumbnail === 'string') {
        return (
          <div class={`${COMPONENT_NAME.value}-avatar`}>
            <img src={thumbnail}></img>
          </div>
        );
      }
      return <div class={`${COMPONENT_NAME.value}-avatar`}>{thumbnail}</div>;
    };
    return {
      renderAvatar,
      COMPONENT_NAME,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    const propsTitleContent = renderTNodeJSX(this, 'title');
    const propsDescriptionContent = renderTNodeJSX(this, 'description');

    const listItemMetaContent = [
      this.renderAvatar(this),
      <div class={`${COMPONENT_NAME}-content`}>
        {propsTitleContent && <h3 class={`${COMPONENT_NAME}-title`}>{propsTitleContent}</h3>}
        {propsDescriptionContent && <p class={`${COMPONENT_NAME}-description`}>{propsDescriptionContent}</p>}
      </div>,
    ];

    return <div class={COMPONENT_NAME}>{listItemMetaContent}</div>;
  },
});
