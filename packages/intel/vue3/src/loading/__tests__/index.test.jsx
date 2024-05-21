import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Loading } from 'tdesign-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('loading', () => {
  // test props api
  describe(':props', () => {
    it(':default', () => {
      const wrapper = mount(() => <Loading default="加载中"></Loading>);
      const text = wrapper.find('.t-loading__parent');
      expect(text.exists()).toBe(true);
      expect(text.text()).toBe('加载中');
    });

    it(':content', () => {
      const wrapper = mount(() => <Loading content="加载中"></Loading>);
      const text = wrapper.find('.t-loading__parent');
      expect(text.exists()).toBe(true);
      expect(text.text()).toBe('加载中');
    });

    it(':delay', () => {
      const wrapper = mount(() => <Loading delay={3000}></Loading>);
      const loading = wrapper.find('.t-loading');
      setTimeout(() => {
        expect(loading.exists()).toBeTruthy();
      }, 3000);
    });

    it(':indicator', () => {
      const wrapper = mount(() => <Loading indicator={false}></Loading>);
      const svg = wrapper.find('.t-loading svg');
      expect(svg.exists()).toBeFalsy();
    });

    it(':inheritColor', () => {
      const wrapper = mount(() => <Loading inheritColor></Loading>);
      expect(wrapper.find('.t-loading--inherit-color')).toBeTruthy();
    });

    it(':text', () => {
      const wrapper = mount(() => <Loading text="内容"></Loading>);
      const text = wrapper.find('.t-loading .t-loading__text');
      expect(text.exists()).toBeTruthy();
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
      expect(document.querySelector('body > .t-loading') !== null).toEqual(true);
    });
  });
});
