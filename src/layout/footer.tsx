import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './footer-props';
import { renderTNodeJSX } from '../utils/render-tnode';

export default defineComponent({
  name: 'TFooter',

  props,
  setup() {
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
    };
  },
  render() {
    const styles = this.height ? { height: this.height } : {};
    return (
      <footer class={`${this.classPrefix}-layout__footer`} style={styles}>
        {renderTNodeJSX(this, 'default')}
      </footer>
    );
  },
});
