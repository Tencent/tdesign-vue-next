import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import props from '@TdTypes/list-item/props';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import { renderPropNode } from '../mixins/utils';

const name = `${prefix}-list-item`;

export default Vue.extend({
  name,
  props,
  render(): VNode {
    const propsDefaultContent = renderPropNode(this, 'default');
    const propsContent = renderPropNode(this, 'content');
    const propsActionContent = renderPropNode(this, 'action');

    const listItemContent: ScopedSlotReturnValue = [
      typeof propsDefaultContent === 'undefined' ? propsContent : propsDefaultContent,
      typeof propsActionContent === 'undefined' ? '' : <ul class={`${name}__action`}>{propsActionContent}</ul>,
    ];

    return (
      <li class={name}>
        <div class={`${name}-main`}>{listItemContent}</div>
      </li>
    );
  },
});
