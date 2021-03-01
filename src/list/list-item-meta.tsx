import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import props from '@TdTypes/list-item-meta/props';
import { renderPropNode } from '../mixins/utils';
import { ScopedSlotReturnValue } from 'vue/types/vnode';

const name = `${prefix}-list-item__meta`;

export default Vue.extend({
  name,
  props,
  methods: {
    renderAvatar(h: CreateElement) {
      if (typeof this.avatar === 'function') {
        return <div class={`${name}-avatar`}>{this.avatar(h)}</div>;
      }
      if (!this.avatar && this.$scopedSlots.avatar) {
        return <div class={`${name}-avatar`}>{this.$scopedSlots.avatar(null)}</div>;
      }
      if (typeof this.avatar === 'string') {
        return (
          <div class={`${name}-avatar`}>
            <img src={this.avatar} alt=""></img>
          </div>
        );
      }
      return this.avatar;
    },
  },
  render(h: CreateElement): VNode {
    const listItemMetaContent: ScopedSlotReturnValue = [
      this.renderAvatar(h),
      <div class={`${name}-content`}>
        {typeof renderPropNode(this, 'title') !== 'undefined' ? <h3 class={`${name}-title`}>{renderPropNode(this, 'title')}</h3> : undefined}
        {typeof renderPropNode(this, 'description') !== 'undefined' ? <p class={`${name}-description`}>{renderPropNode(this, 'description')}</p> : undefined}
      </div>,
    ];

    return <div class={name}>{listItemMetaContent}</div>;
  },
});
