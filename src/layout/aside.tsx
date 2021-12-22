import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './aside-props';
import { renderTNodeJSX } from '../utils/render-tnode';

export default defineComponent({
  name: 'TAside',

  inject: {
    layout: {
      default: undefined,
    },
  },

  props,

  mounted() {
    this.layout.hasSider = true;
  },

  unmounted() {
    this.layout.hasSider = false;
  },

  render() {
    const styles = this.width ? { width: this.width } : {};
    return (
      <aside class={`${prefix}-layout__sider`} style={styles}>
        {renderTNodeJSX(this, 'default')}
      </aside>
    );
  },
});
