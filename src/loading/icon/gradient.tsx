import { defineComponent } from 'vue';
import { prefix } from '../../config';

const name = `${prefix}-loading__gradient`;
const classname = `${prefix}-icon-loading`;

export default defineComponent({
  name,

  props: {
    size: {
      type: String,
      default: 'medium',
    },
  },

  data() {
    return {
      classname,
    };
  },

  render() {
    const classes = [name, `${name}-${this.size}`, classname];
    return (
      <div class={classes}>
        <div></div>
      </div>
    );
  },
});
