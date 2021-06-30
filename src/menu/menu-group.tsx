import { defineComponent } from 'vue';
import { prefix } from '../config';
const name = `${prefix}-menu-group`;
export default defineComponent({
  name,
  props: {
    title: {
      type: String,
      default: '',
    },
  },
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
