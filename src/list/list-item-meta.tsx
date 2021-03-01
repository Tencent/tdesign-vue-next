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
    const listItemMetaContent: ScopedSlotReturnValue = [
      this.renderAvatar(),
      <div class={`${name}-content`}>
        {this.title && <h3 class={`${name}-title`}>{renderTNodeJSX(this, 'title')}</h3>}
        {this.description && <p class={`${name}-description`}>{renderTNodeJSX(this, 'description')}</p>}
      </div>,
    ];

    return <div class={name}>{listItemMetaContent}</div>;
  },
});
