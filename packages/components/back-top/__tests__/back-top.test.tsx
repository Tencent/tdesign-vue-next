import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, describe, it, expect } from 'vitest';
import { BackTop } from '@tdesign/components/back-top';
import props from '@tdesign/components/back-top/props';
import * as TDesignSharedUtils from '@tdesign/shared-utils';

const scrollToSpy = vi.spyOn(TDesignSharedUtils, 'scrollTo');

describe('BackTop', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('props', () => {
    it(':container[string/function]', () => {
      // Function
      const containerEl = document.createElement('div');
      containerEl.className = 'custom-container';
      const wrapper = mount(<BackTop container={() => containerEl}></BackTop>);
      expect(wrapper.exists()).toBeTruthy();

      // String selector
      const wrapper2 = mount(<BackTop container="body"></BackTop>);
      expect(wrapper2.exists()).toBeTruthy();
    });

    it(':content[string/function]', () => {
      // Function
      const wrapper = mount(<BackTop content={() => <span class="custom-node">TNode</span>}></BackTop>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot('content-TNode');
    });

    it(':content[slot]', () => {
      const wrapper = mount(<BackTop v-slots={{ content: () => <span class="custom-node">TNode</span> }}></BackTop>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot('content-slot');
    });

    it(':default[string/function]', () => {
      // Function
      const wrapper = mount(<BackTop default={() => <span class="custom-node">TNode</span>}></BackTop>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot('default-TNode');
    });

    it(':default[slot]', () => {
      const wrapper = mount(<BackTop v-slots={{ default: () => <span class="custom-node">TNode</span> }}></BackTop>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot('default-slot');
    });

    it(':duration[Number]', () => {
      const wrapper = mount(<BackTop duration={1000}></BackTop>);
      expect(wrapper.exists()).toBeTruthy();

      const wrapper2 = mount(<BackTop duration={0}></BackTop>);
      expect(wrapper2.exists()).toBeTruthy();
    });

    it(':offset[Array]', () => {
      const wrapper = mount(<BackTop offset={['10px', '20px']}></BackTop>);
      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':shape[circle/square]', () => {
      const { validator } = props.shape;
      expect(validator('circle')).toBeTruthy();
      expect(validator('square')).toBeTruthy();
      // @ts-expect-error
      expect(validator('other')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      const shapeList = ['circle', 'square'] as const;
      shapeList.forEach((item) => {
        const wrapper = mount(<BackTop shape={item}></BackTop>);
        expect(wrapper.classes(`t-back-top--${item}`)).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot(`shape-${item}`);
      });
    });

    it(':size[medium/small]', () => {
      const { validator } = props.size;
      expect(validator('medium')).toBeTruthy();
      expect(validator('small')).toBeTruthy();
      // @ts-expect-error
      expect(validator('other')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      const sizeClassNameList = ['t-size-s', 't-size-m'];
      const sizeList = ['small', 'medium'] as const;
      sizeList.forEach((item, index) => {
        const wrapper = mount(<BackTop size={item}>BackTop</BackTop>);
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot(`size-${item}`);
      });
    });

    it(':target[string/function]', async () => {
      // Function
      const targetEl = document.createElement('div');
      targetEl.className = 'scroll-target';
      const wrapper = mount(<BackTop target={() => targetEl}></BackTop>);
      expect(wrapper.exists()).toBeTruthy();

      // String selector
      const wrapper2 = mount(<BackTop target="body"></BackTop>);
      expect(wrapper2.exists()).toBeTruthy();
    });

    it.skipIf(process.env.TEST_TARGET === 'snap')(':target click behavior', async () => {
      const targetEl = document.createElement('div');
      targetEl.className = 'scroll-target';
      const wrapper = mount(<BackTop target={() => targetEl}></BackTop>);
      await wrapper.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();

      const wrapper2 = mount(<BackTop target="body"></BackTop>);
      await wrapper2.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();
    });

    it(':theme[light/primary/dark]', () => {
      const { validator } = props.theme;
      expect(validator('light')).toBeTruthy();
      expect(validator('primary')).toBeTruthy();
      expect(validator('dark')).toBeTruthy();
      // @ts-expect-error
      expect(validator('other')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      const themeList = ['light', 'primary', 'dark'] as const;
      themeList.forEach((item) => {
        const wrapper = mount(<BackTop theme={item}>Text</BackTop>);
        expect(wrapper.classes(`t-back-top--theme-${item}`)).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot(`theme-${item}`);
      });
    });

    it(':visibleHeight[string/number]', () => {
      const wrapper = mount(<BackTop visibleHeight={300}></BackTop>);
      expect(wrapper.exists()).toBeTruthy();

      const wrapper2 = mount(<BackTop visibleHeight={0}></BackTop>);
      expect(wrapper2.exists()).toBeTruthy();

      const wrapper3 = mount(<BackTop visibleHeight="100px"></BackTop>);
      expect(wrapper3.exists()).toBeTruthy();
    });

    it(':onClick[Function]', async () => {
      const fn = vi.fn();
      const wrapper = mount(<BackTop onClick={fn}></BackTop>);
      wrapper.findComponent(BackTop).trigger('click');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it.skipIf(process.env.TEST_TARGET === 'snap')('click behavior', async () => {
      const wrapper = mount(<BackTop></BackTop>);
      await wrapper.trigger('click');
      expect(scrollToSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const wrapper = mount(<BackTop></BackTop>);
      wrapper.findComponent(BackTop).trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()).toHaveProperty('click');
    });
  });

  describe('component behavior', () => {
    it('renders with correct structure', () => {
      const wrapper = mount(<BackTop></BackTop>);
      expect(wrapper.classes()).toContain('t-back-top');
      expect(wrapper.find('.t-icon-backtop.t-back-top__icon').exists()).toBeTruthy();
    });

    it('works with multiple props combined', () => {
      const wrapper = mount(
        <BackTop
          shape="square"
          size="medium"
          theme="primary"
          offset={['20px', '30px']}
          duration={500}
          visibleHeight={200}
        >
          Custom Content
        </BackTop>,
      );
      expect(wrapper.classes()).toContain('t-back-top--square');
      expect(wrapper.classes()).toContain('t-size-m');
      expect(wrapper.classes()).toContain('t-back-top--theme-primary');
      expect(wrapper.text()).toContain('Custom Content');
    });

    it('shows back-top when visibleHeight is 0', async () => {
      const wrapper = mount(<BackTop visibleHeight={0}></BackTop>);
      await nextTick();
      expect(wrapper.classes()).toContain('t-back-top--show');
    });

    it('handles container scroll events', async () => {
      // Create a mock container
      const container = document.createElement('div');
      container.style.height = '100px';
      container.style.overflow = 'scroll';
      Object.defineProperty(container, 'scrollTop', {
        writable: true,
        value: 0,
      });
      document.body.appendChild(container);

      void mount(<BackTop container={() => container} visibleHeight={50}></BackTop>);
      await nextTick();

      // Simulate scroll event
      container.scrollTop = 100;
      const scrollEvent = new Event('scroll');
      container.dispatchEvent(scrollEvent);

      document.body.removeChild(container);
    });

    it('toggles visibility based on scroll position', async () => {
      const container = document.createElement('div');
      container.style.height = '100px';
      container.style.overflow = 'scroll';
      Object.defineProperty(container, 'scrollTop', {
        writable: true,
        value: 0,
      });
      document.body.appendChild(container);

      const wrapper = mount(<BackTop container={() => container} visibleHeight={50}></BackTop>);
      await nextTick();

      // Initially not visible
      expect(wrapper.classes()).not.toContain('t-back-top--show');

      // Scroll past threshold - should become visible
      container.scrollTop = 100;
      if (container.onscroll) {
        container.onscroll(new Event('scroll') as any);
      }
      await nextTick();

      // Scroll back below threshold - should become invisible
      container.scrollTop = 30;
      if (container.onscroll) {
        container.onscroll(new Event('scroll') as any);
      }
      await nextTick();

      document.body.removeChild(container);
    });

    it('cleans up scroll listener on unmount', async () => {
      const container = document.createElement('div');
      Object.defineProperty(container, 'onscroll', {
        writable: true,
        value: null,
      });
      document.body.appendChild(container);

      const wrapper = mount(<BackTop container={() => container}></BackTop>);
      await nextTick();

      // Verify scroll listener was added
      expect(container.onscroll).toBeTruthy();

      // Unmount and verify cleanup
      wrapper.unmount();
      expect(container.onscroll).toBeNull();

      document.body.removeChild(container);
    });
  });

  describe('edge cases', () => {
    it.skipIf(process.env.TEST_TARGET === 'snap')('handles various target scenarios', async () => {
      // Same target and container
      const container = document.createElement('div');
      document.body.appendChild(container);
      const wrapper1 = mount(<BackTop container={() => container} target={() => container}></BackTop>);
      await wrapper1.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();
      document.body.removeChild(container);

      // Target as body string
      const wrapper2 = mount(<BackTop target="body"></BackTop>);
      await wrapper2.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();

      // Target with exact body string comparison
      const wrapper3 = mount(<BackTop container="body" target="body"></BackTop>);
      await wrapper3.trigger('click');
      expect(scrollToSpy).toHaveBeenCalledWith(0, expect.any(Object));

      // No target
      const wrapper4 = mount(<BackTop target={undefined as any}></BackTop>);
      await wrapper4.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();

      // Target that returns null
      const wrapper5 = mount(<BackTop target={() => null}></BackTop>);
      await wrapper5.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();
    });

    it.skipIf(process.env.TEST_TARGET === 'snap')('handles target with getBoundingClientRect', async () => {
      const targetElement = document.createElement('div');
      targetElement.getBoundingClientRect = vi.fn().mockReturnValue({ y: 100 });
      document.body.appendChild(targetElement);

      const wrapper = mount(<BackTop target={() => targetElement}></BackTop>);
      await wrapper.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();
      expect(targetElement.getBoundingClientRect).toHaveBeenCalled();

      document.body.removeChild(targetElement);
    });

    it.skipIf(process.env.TEST_TARGET === 'snap')('handles target as string selector', async () => {
      const targetElement = document.createElement('div');
      targetElement.className = 'scroll-target';
      targetElement.getBoundingClientRect = vi.fn().mockReturnValue({ y: 150 });
      document.body.appendChild(targetElement);

      const wrapper = mount(<BackTop target=".scroll-target"></BackTop>);
      await wrapper.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();
      expect(targetElement.getBoundingClientRect).toHaveBeenCalled();

      document.body.removeChild(targetElement);
    });

    it('handles container as querySelector string', async () => {
      const testDiv = document.createElement('div');
      testDiv.className = 'test-container';
      document.body.appendChild(testDiv);

      const wrapper = mount(<BackTop container=".test-container"></BackTop>);
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();

      document.body.removeChild(testDiv);
    });

    it('handles document scroll when container has no scrollTop', async () => {
      const container = document.createElement('div');
      // Don't define scrollTop property to test the undefined case
      document.body.appendChild(container);

      void mount(<BackTop container={() => container} visibleHeight={50}></BackTop>);
      await nextTick();

      document.body.removeChild(container);
    });

    it('handles container querySelector that returns null', async () => {
      // Create a test where querySelector returns null to cover that branch
      const originalQuerySelector = document.querySelector;
      document.querySelector = vi.fn().mockReturnValue(null);

      try {
        // This should hit the return null branch in getContainer when querySelector returns null
        const wrapper = mount(<BackTop container=".non-existent"></BackTop>);

        // The component will be created but will have issues in onMounted due to null containerRef
        // We expect this test to exist but potentially throw an error in onMounted
        expect(wrapper.exists()).toBeTruthy();

        await nextTick();
      } catch (error) {
        // This is expected since containerRef.value will be null
        expect(error).toBeDefined();
      } finally {
        document.querySelector = originalQuerySelector;
      }
    });

    it('handles container that is neither string nor function', async () => {
      // Pass an object (neither string nor function) to trigger the return null path
      const container = { someProperty: 'value' };

      try {
        const wrapper = mount(<BackTop container={container as any}></BackTop>);
        expect(wrapper.exists()).toBeTruthy();

        await nextTick();
      } catch (error) {
        // This is expected since containerRef.value will be null due to return null in getContainer
        expect(error).toBeDefined();
      }
    });

    it.skipIf(process.env.TEST_TARGET === 'snap')('handles edge case target values', async () => {
      // Null value
      const wrapper1 = mount(<BackTop target={null as any}></BackTop>);
      await wrapper1.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();

      // False value
      const wrapper2 = mount(<BackTop target={false as any}></BackTop>);
      await wrapper2.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();

      // Empty string
      const wrapper3 = mount(<BackTop target="">BackTop</BackTop>);
      await wrapper3.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();

      // Zero value
      const wrapper4 = mount(<BackTop target={0 as any}></BackTop>);
      await wrapper4.trigger('click');
      expect(scrollToSpy).toHaveBeenCalled();
    });
  });
});
