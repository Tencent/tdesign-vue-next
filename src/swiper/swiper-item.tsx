import { defineComponent } from 'vue';
import { prefix } from '../config';

const name = `${prefix}-swiper-item`;

export default defineComponent({
  name,
  render() {
    const { default: defaultSlot } = this.$slots;
    return (
      <div>
        { defaultSlot && defaultSlot() }
      </div>
    );
  },
});
