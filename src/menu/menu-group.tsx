import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './menu-group-props';
const name = `${prefix}-menu-group`;

export default defineComponent({
  name,

  props,

  render() {
    return (
      <div class="t-menu-group">
        <div class="t-menu-group-title">
          {this.title}
        </div>
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
