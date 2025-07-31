import { mount } from '@vue/test-utils';
import { nextTick, createApp } from 'vue';
import { describe, it, vi, beforeEach } from 'vitest';
import { LoadingPlugin } from '@tdesign/components/loading/plugin';
import Loading from '@tdesign/components/loading';
import vLoading from '../directive';

// every component needs four parts: props/events/slots/functions.
describe('Loading', () => {
  // test props api
  describe(':props', () => {
    it(':loading', async () => {
      const wrapper = mount(Loading, {
        props: {
          loading: true,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(true);

      await wrapper.setProps({ loading: false });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });

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

    it(':delay', async () => {
      vi.useFakeTimers();
      // 需要在覆盖情况下测试
      const wrapper = mount({
        template: `
          <t-loading :loading="loading" :delay="delay">
            <div class="wrap">包裹内容</div>
          </t-loading>
        `,
        components: { 't-loading': Loading },
        data() {
          return {
            loading: true,
            delay: 3000,
          };
        },
      });

      // 初始状态不应显示加载状态
      expect(wrapper.find('.t-loading').exists()).toBeFalsy();

      // 模拟时间流逝到delay的一半（1500ms），仍不应显示加载状态
      vi.advanceTimersByTime(1500);
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBeFalsy();

      // 模拟时间流逝超过delay（3000ms），应显示加载状态
      vi.advanceTimersByTime(1500);
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBeTruthy();

      vi.useRealTimers();
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

    it(':fullscreen', async () => {
      const wrapper = mount(Loading, {
        props: {
          fullscreen: true,
          loading: true,
        },
        attachTo: document.body,
      });
      await nextTick();
      expect(wrapper.find('.t-loading__fullscreen').exists()).toBe(true);

      // 测试 attach 属性与 fullscreen 的组合
      await wrapper.setProps({ attach: 'body' });
      await nextTick();
      expect(wrapper.find('body > .t-loading__fullscreen')).not.toBeNull();

      wrapper.unmount();
    });

    it(':showOverlay', async () => {
      // 测试包裹元素时的遮罩层
      const wrapper1 = mount({
        template: `
          <div class="container">
            <Loading :showOverlay="true">
              <div>被包裹的内容</div>
            </Loading>
          </div>
        `,
        components: { Loading },
      });
      await nextTick();
      expect(wrapper1.find('.t-loading__overlay').exists()).toBe(true);

      // 测试无包裹元素时的遮罩层(应该不存在)
      const wrapper2 = mount(Loading, {
        props: {
          showOverlay: true,
          loading: true,
        },
      });
      await nextTick();
      expect(wrapper2.find('.t-loading__overlay').exists()).toBe(false);

      // 清理
      wrapper1.unmount();
      wrapper2.unmount();
    });

    it('should add/remove lock class when loading changes', async () => {
      const wrapper = mount(Loading, {
        props: {
          fullscreen: true,
          preventScrollThrough: true,
          loading: false,
        },
        attachTo: document.body,
      });
      await nextTick();
      expect(document.body.classList.contains('t-loading--lock')).toBe(false);

      await wrapper.setProps({ loading: true });
      await nextTick();
      expect(document.body.classList.contains('t-loading--lock')).toBe(true);

      await wrapper.setProps({ loading: false });
      await nextTick();
      expect(document.body.classList.contains('t-loading--lock')).toBe(false);

      wrapper.unmount();
    });

    it('should return null when attach is set but loading is false', async () => {
      const wrapper = mount({
        template: '<Loading :attach="attach" :loading="loading" />',
        components: { Loading },
        data() {
          return {
            attach: 'body',
            loading: false,
          };
        },
      });

      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });
  });
  describe(':plugin', () => {
    let app: ReturnType<typeof createApp>;

    beforeEach(() => {
      app = createApp({});
    });

    it('should install and add $loading to globalProperties', () => {
      LoadingPlugin.install(app);
      expect(typeof app.config.globalProperties.$loading).toBe('function');
    });

    it('should create fullscreen loading when called with true', () => {
      const instance = LoadingPlugin(true);
      expect(instance).toBeTruthy();
      expect(document.body.querySelector('.t-loading')).not.toBeNull();
      instance.hide();
    });

    it('should handle missing attach gracefully', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      LoadingPlugin({ loading: true, attach: '#not-exist' });
      expect(spy).toHaveBeenCalledWith('attach is not exist');
      spy.mockRestore();
    });

    it('should call hide and set fullScreenLoadingInstance to null when called with false', () => {
      const instance = LoadingPlugin(true);
      const hideSpy = vi.spyOn(instance, 'hide');
      const result = LoadingPlugin(false);
      expect(hideSpy).toHaveBeenCalled();
      const newInstance = LoadingPlugin(true);
      expect(newInstance).not.toBe(instance);
      expect(result).toBeUndefined();
      newInstance.hide();
    });
  });

  describe(':directive', () => {
    it('should work with boolean value', async () => {
      const wrapper = mount({
        template: '<div v-loading="loading"></div>',
        directives: { loading: vLoading },
        data() {
          return { loading: true };
        },
      });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(true);

      await wrapper.setData({ loading: false });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });

    it('should work with object value', async () => {
      const wrapper = mount({
        template: '<div v-loading="options"></div>',
        directives: { loading: vLoading },
        data() {
          return {
            options: {
              loading: true,
              text: '加载中',
              size: 'small',
            },
          };
        },
      });
      await nextTick();
      const loading = wrapper.find('.t-loading');
      expect(loading.exists()).toBe(true);
      expect(loading.find('.t-loading__text').text()).toBe('加载中');
      expect(loading.classes()).toContain('t-size-s');
    });

    it('should update loading state when binding value changes', async () => {
      const wrapper = mount({
        template: '<div v-loading="loading"></div>',
        directives: { loading: vLoading },
        data() {
          return { loading: false };
        },
      });

      // 初始状态无loading
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(false);

      // 更新为true，应创建实例
      await wrapper.setData({ loading: true });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(true);

      // 更新为false，应隐藏实例
      await wrapper.setData({ loading: false });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });

    it('should clean up on unmount', async () => {
      const wrapper = mount({
        template: '<div v-loading="true"></div>',
        directives: { loading: vLoading },
      });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(true);

      wrapper.unmount();
      await nextTick();

      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });
  });
});
