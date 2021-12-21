import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TSwiperItem',
  render() {
    const { default: defaultSlot } = this.$slots;
    return <div>{defaultSlot && defaultSlot()}</div>;
  },
});
