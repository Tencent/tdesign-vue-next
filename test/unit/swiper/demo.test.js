import { mount } from '@vue/test-utils';
import swiper from '@/examples/swiper/demos/swiper.vue';
import vertical from '@/examples/swiper/demos/vertical.vue';

describe('Swiper', () => {
  it('swiper demo works fine', () => {
    const wrapper = mount(swiper);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('vertical demo works fine', () => {
    const wrapper = mount(vertical);
    expect(wrapper.element).toMatchSnapshot();
  });
});
