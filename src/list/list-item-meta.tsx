import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './list-item-meta-props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-list-item__meta`;

export default defineComponent({
  name: `${prefix}-list-item-meta`,
  props,
  methods: {
    renderAvatar() {
      if (this.avatar || this.$slots.avatar) {
        console.warn('`avatar` is going to be deprecated, please use `image` instead');
      }
      const thumbnail = renderContent(this, 'avatar', 'image');
      if (!thumbnail) return;
      if (typeof thumbnail === 'string') {
        return (
          <div class={`${name}-avatar`}>
            <img src={thumbnail}></img>
          </div>
        );
      }
      return <div class={`${name}-avatar`}>{thumbnail}</div>;
    },
  },
  render() {
    const propsTitleContent = renderTNodeJSX(this, 'title');
    const propsDescriptionContent = renderTNodeJSX(this, 'description');

    const listItemMetaContent = [
      this.renderAvatar(),
      <div class={`${name}-content`}>
        {propsTitleContent && <h3 class={`${name}-title`}>{propsTitleContent}</h3>}
        {propsDescriptionContent && <p class={`${name}-description`}>{propsDescriptionContent}</p>}
      </div>,
    ];

    return <div class={name}>{listItemMetaContent}</div>;
  },
});
