import { defineComponent } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { prefix } from '../config';

export default defineComponent({
  name: 'TContent',

  render() {
    return <main class={`${prefix}-layout__content`}>{renderTNodeJSX(this, 'default')}</main>;
  },
});
