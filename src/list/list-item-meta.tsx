import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import props from '@TdTypes/list-item-meta/props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { ScopedSlotReturnValue } from 'vue/types/vnode';

const name = `${prefix}-list-item__meta`;

export default Vue.extend({
  name,
  props,
  methods: {
    renderAvatar() {
      if (this.avatar && typeof this.avatar === 'string') {
        return (
          <div class={`${name}-avatar`}>
            <img src={this.avatar} alt=""></img>
          </div>
        );
      }
      return renderTNodeJSX(this, 'avator');
    },
  },
  render(): VNode {
    const propsTitleContent = renderTNodeJSX(this, 'title');
    const propsDescriptionContent = renderTNodeJSX(this, 'description');


    const listItemMetaContent: ScopedSlotReturnValue = [
      this.renderAvatar(),
      <div class={`${name}-content`}>
        {propsTitleContent && <h3 class={`${name}-title`}>{propsTitleContent}</h3>}
        {propsDescriptionContent && <p class={`${name}-description`}>{propsDescriptionContent}</p>}
      </div>,
    ];

    return <div class={name}>{listItemMetaContent}</div>;
  },
});
