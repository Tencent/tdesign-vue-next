import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { createApp } from 'vue';
import { LoadingPlugin } from '@tdesign/components/loading/plugin';
import { Loading } from '@tdesign/components';
import vLoading from '../directive';

describe('Loading', () => {
  describe('props', () => {
    it(':attach[string/function]', async () => {
      mount(<Loading attach="body" />);
      await nextTick();
      expect(document.querySelector('body > .t-loading') !== null).toEqual(true);

      mount(<Loading attach={() => document.body} />);
      await nextTick();
      expect(document.querySelector('body > .t-loading') !== null).toEqual(true);
    });

    it(':content[string/function]', () => {
      const wrapper = mount(<Loading content="content" />);
      expect(wrapper.find('.t-loading__parent').text()).toBe('content');
      expect(wrapper.element).toMatchSnapshot();

      const renderContent = () => <span class="custom-content-node">TNode</span>;
      const wrapperFunction = mount(<Loading content={renderContent} />);
      expect(wrapperFunction.find('.custom-content-node').exists()).toBeTruthy();
      expect(wrapperFunction.element).toMatchSnapshot();
    });

    it(':content[slot]', () => {
      const wrapperSlot = mount(
        <Loading v-slots={{ content: () => <span class="custom-content-node">TNode</span> }} />,
      );
      expect(wrapperSlot.find('.custom-content-node').exists()).toBeTruthy();
      expect(wrapperSlot.element).toMatchSnapshot();
    });

    it(':default[string/function]', () => {
      const wrapper = mount(<Loading default="default" />);
      expect(wrapper.find('.t-loading__parent').text()).toBe('default');
      expect(wrapper.element).toMatchSnapshot();

      const renderDefault = () => <span class="custom-default-node">TNode</span>;
      const wrapperFunction = mount(<Loading default={renderDefault} />);
      expect(wrapperFunction.find('.custom-default-node').exists()).toBeTruthy();
      expect(wrapperFunction.element).toMatchSnapshot();
    });

    it(':default[slot]', () => {
      const wrapperSlot = mount(
        <Loading v-slots={{ default: () => <span class="custom-default-node">TNode</span> }} />,
      );
      expect(wrapperSlot.find('.custom-default-node').exists()).toBeTruthy();
      expect(wrapperSlot.element).toMatchSnapshot();
    });

    it(':delay[number]', async () => {
      vi.useFakeTimers();
      const wrapper = mount({
        template: `
          <t-loading :loading="loading" :delay="delay">
            <div class="wrap">Wrapped content</div>
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

      // Initial state should not show loading
      expect(wrapper.find('.t-loading').exists()).toBeFalsy();

      // Simulate time passing to half of delay (1500ms), should still not show loading
      vi.advanceTimersByTime(1500);
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBeFalsy();

      // Simulate time passing beyond delay (3000ms), should show loading
      vi.advanceTimersByTime(1500);
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBeTruthy();

      vi.useRealTimers();
    });

    it(':fullscreen[boolean]', async () => {
      const wrapper = mount(<Loading fullscreen={true} loading={true} attachTo={document.body} />);
      await nextTick();
      expect(wrapper.find('.t-loading__fullscreen').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ fullscreen: false });
      await nextTick();
      expect(wrapper.find('.t-loading__fullscreen').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':indicator[boolean/function]', () => {
      const wrapper = mount(<Loading indicator={true} />);
      expect(wrapper.find('.t-loading svg').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();

      const wrapperFalse = mount(<Loading indicator={false} />);
      expect(wrapperFalse.find('.t-loading svg').exists()).toBeFalsy();
      expect(wrapperFalse.element).toMatchSnapshot();

      const renderIndicator = () => <span class="custom-indicator-node">TNode</span>;
      const wrapperFunction = mount(<Loading indicator={renderIndicator} />);
      expect(wrapperFunction.find('.custom-indicator-node').exists()).toBeTruthy();
      expect(wrapperFunction.element).toMatchSnapshot();
    });

    it(':indicator[slot]', () => {
      const wrapperSlot = mount(
        <Loading v-slots={{ indicator: () => <span class="custom-indicator-node">TNode</span> }} />,
      );
      expect(wrapperSlot.find('.custom-indicator-node').exists()).toBeTruthy();
      expect(wrapperSlot.element).toMatchSnapshot();
    });

    it(':inheritColor[boolean]', async () => {
      const wrapper = mount(<Loading inheritColor={true} />);
      expect(wrapper.find('.t-loading--inherit-color').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ inheritColor: false });
      expect(wrapper.find('.t-loading--inherit-color').exists()).toBeFalsy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':loading[boolean]', async () => {
      const wrapper = mount(<Loading loading={true} />);
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ loading: false });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':preventScrollThrough[boolean]', async () => {
      const wrapper = mount(
        <Loading fullscreen={true} preventScrollThrough={true} loading={false} attachTo={document.body} />,
      );
      await nextTick();
      expect(document.body.classList.contains('t-loading--lock')).toBe(false);

      await wrapper.setProps({ loading: true });
      await nextTick();
      expect(document.body.classList.contains('t-loading--lock')).toBe(true);

      await wrapper.setProps({ loading: false });
      await nextTick();
      expect(document.body.classList.contains('t-loading--lock')).toBe(false);
    });

    it(':showOverlay[boolean]', async () => {
      // Test overlay when wrapping elements
      const wrapper1 = mount({
        template: `
          <div class="container">
            <Loading :showOverlay="true">
              <div>Wrapped content</div>
            </Loading>
          </div>
        `,
        components: { Loading },
      });
      await nextTick();
      expect(wrapper1.find('.t-loading__overlay').exists()).toBe(true);
      expect(wrapper1.element).toMatchSnapshot();

      // Test overlay when no wrapping elements (should not exist)
      const wrapper2 = mount(<Loading showOverlay={true} loading={true} />);
      await nextTick();
      expect(wrapper2.find('.t-loading__overlay').exists()).toBe(false);
      expect(wrapper2.element).toMatchSnapshot();
    });

    it(':size[string]', () => {
      const sizeList = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(<Loading size={size} />);
        const loading = wrapper.find('.t-loading');
        expect(loading.classes()).toContain(`t-size-${size.slice(0, 1)}`);
        expect(wrapper.element).toMatchSnapshot();
      });

      const wrapperCustom = mount(<Loading size="50px" />);
      const loading = wrapperCustom.find('.t-loading');
      expect(getComputedStyle(loading.element, null).fontSize).toBe('50px');
      expect(wrapperCustom.element).toMatchSnapshot();
    });

    it(':text[string/function]', () => {
      const wrapper = mount(<Loading text="Loading..." />);
      const text = wrapper.find('.t-loading .t-loading__text');
      expect(text.exists()).toBeTruthy();
      expect(text.text()).toBe('Loading...');
      expect(wrapper.element).toMatchSnapshot();

      const renderText = () => <span class="custom-text-node">TNode</span>;
      const wrapperFunction = mount(<Loading text={renderText} />);
      expect(wrapperFunction.find('.custom-text-node').exists()).toBeTruthy();
      expect(wrapperFunction.element).toMatchSnapshot();
    });

    it(':text[slot]', () => {
      const wrapperSlot = mount(<Loading v-slots={{ text: () => <span class="custom-text-node">TNode</span> }} />);
      expect(wrapperSlot.find('.custom-text-node').exists()).toBeTruthy();
      expect(wrapperSlot.element).toMatchSnapshot();
    });

    it(':zIndex[number]', () => {
      const wrapper = mount(<Loading zIndex={2022} />);
      const loading = wrapper.find('.t-loading');
      expect(getComputedStyle(loading.element, null).zIndex).toBe('2022');
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('events', () => {
    // Loading component has no explicit events, here we can test some interaction behaviors
    it('should handle loading state changes', async () => {
      const wrapper = mount(<Loading loading={false} />);
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(false);

      await wrapper.setProps({ loading: true });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(true);
    });
  });

  describe('plugin', () => {
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

  describe('directive', () => {
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
              text: 'Loading...',
              size: 'small',
            },
          };
        },
      });
      await nextTick();
      const loading = wrapper.find('.t-loading');
      expect(loading.exists()).toBe(true);
      expect(loading.find('.t-loading__text').text()).toBe('Loading...');
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

      // Initial state no loading
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(false);

      // Update to true, should create instance
      await wrapper.setData({ loading: true });
      await nextTick();
      expect(wrapper.find('.t-loading').exists()).toBe(true);

      // Update to false, should hide instance
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
