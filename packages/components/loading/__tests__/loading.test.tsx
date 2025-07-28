import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Loading } from '@tdesign/components';

// every component needs four parts: props/events/slots/functions.
describe('Loading', () => {
  // test props api
  describe(':props', () => {
    it(':default', () => {
      const wrapper = mount(() => <Loading default="加载中"></Loading>);
      const text = wrapper.find('.t-loading__parent');
      expect(text.exists()).eq(true);
      expect(text.text()).toBe('加载中');
    });

    it(':content', () => {
      const wrapper = mount(() => <Loading content="加载中"></Loading>);
      const text = wrapper.find('.t-loading__parent');
      expect(text.exists()).eq(true);
      expect(text.text()).toBe('加载中');
    });

    it(':delay', () => {
      const wrapper = mount(() => <Loading delay={3000}></Loading>);
      setTimeout(() => {
        expect(wrapper.find('.t-loading').exists()).eq(true);
      }, 3000);
    });

    it(':dynamic update', async () => {
      const showLoading = ref(false);
      const wrapper = mount(() => <Loading fullscreen loading={showLoading.value} default="加载中"></Loading>);
      expect(wrapper.find('.t-loading').exists()).eq(false);
      showLoading.value = true;
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).eq(true);
      showLoading.value = false;
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).eq(false);
    });

    it(':fullscreen', () => {
      const wrapper = mount(() => <Loading fullscreen default="加载中"></Loading>);
      const text = wrapper.find('.t-loading');
      expect(text.exists()).eq(true);
    });

    it(':indicator', () => {
      const wrapper = mount(() => <Loading indicator={false}></Loading>);
      const svg = wrapper.find('.t-loading svg');
      expect(svg.exists()).eq(false);
    });

    it(':inheritColor', () => {
      const wrapper = mount(() => <Loading inheritColor></Loading>);
      expect(wrapper.find('.t-loading--inherit-color').exists()).eq(true);
    });

    it(':text', () => {
      const wrapper = mount(() => <Loading text="内容"></Loading>);
      const text = wrapper.find('.t-loading .t-loading__text');
      expect(text.exists()).eq(true);
      expect(text.text()).toBe('内容');
    });

    it(':zIndex', () => {
      const wrapper = mount(() => <Loading zIndex={2022}></Loading>);
      const loading = wrapper.find('.t-loading');
      expect(getComputedStyle(loading.element, null).zIndex).toBe('2022');
    });

    it(':size', () => {
      const sizeList = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <Loading size={size}></Loading>);
        const loading = wrapper.find('.t-loading');
        expect(loading.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
      const wrapper = mount(() => <Loading size="50px"></Loading>);
      const loading = wrapper.find('.t-loading');
      expect(getComputedStyle(loading.element, null).fontSize).toBe('50px');
    });

    it(':attach', async () => {
      await mount(() => <Loading attach="body"></Loading>);
      // 组件的attach使用了Teleport，所以wrapper.find等方法拿不到
      expect(document.querySelector('body > .t-loading') !== null).eq(true);
      await mount(() => <Loading fullscreen attach="#test"></Loading>);
      expect(document.querySelector('#test > .t-loading') !== null).eq(false);
    });
  });
});
