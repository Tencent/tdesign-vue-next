import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './header-props';
import { renderTNodeJSX } from '../utils/render-tnode';

export default defineComponent({
  name: 'THeader',

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
      <header class={`${this.classPrefix}-layout__header`} style={styles}>
        {renderTNodeJSX(this, 'default')}
      </header>
    );
  },
});
