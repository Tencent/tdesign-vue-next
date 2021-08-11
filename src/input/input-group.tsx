import { defineComponent } from 'vue';
import { prefix } from '../config';
import { ClassName } from '../common';

const name = `${prefix}-input-group`;
export default defineComponent({
  name,
  props: {
    separate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    CLASS(): ClassName {
      return [
        name,
        {
          [`${name}--separate`]: this.separate,
        },
      ];
    },
  },
  render() {
    const { CLASS } = this;
    return (
      <div class={CLASS}>
        {this.$slots.default && this.$slots.default(null)}
      </div>
    );
  },
});
