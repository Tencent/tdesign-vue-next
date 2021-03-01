import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import props from '@TdTypes/list-item/props';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-list-item`;

export default Vue.extend({
  name,
  props,
  render(): VNode {
    const propsDefaultContent = renderTNodeJSX(this, 'default');
    const propsContent = renderTNodeJSX(this, 'content');
    const propsActionContent = renderTNodeJSX(this, 'action');

    const listItemContent: ScopedSlotReturnValue = [
      ['', null, undefined].includes(propsDefaultContent) ? propsContent : propsDefaultContent,
      typeof propsActionContent === 'undefined' ? '' : <ul class={`${name}__action`}>{propsActionContent}</ul>,
    ];

    return (
      <li class={name}>
        <div class={`${name}-main`}>{listItemContent}</div>
      </li>
    );
  },
});
