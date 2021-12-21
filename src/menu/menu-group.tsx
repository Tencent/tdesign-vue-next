import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './menu-group-props';
import { renderTNodeJSX } from '../utils/render-tnode';

export default defineComponent({
  name: 'TMenuGroup',
  props,
  render() {
    return (
      <div class={`${prefix}-menu-group`}>
        <div class={`${prefix}-menu-group__title`}>{this.title}</div>
        {renderTNodeJSX(this, 'default')}
      </div>
    );
  },
});
