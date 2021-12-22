import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './footer-props';
import { renderTNodeJSX } from '../utils/render-tnode';

export default defineComponent({
  name: 'TFooter',

  props,

  render() {
    const styles = this.height ? { height: this.height } : {};
    return (
      <footer class={`${prefix}-layout__footer`} style={styles}>
        {renderTNodeJSX(this, 'default')}
      </footer>
    );
  },
});
