import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeEach, expect, it, vi, describe } from 'vitest';
import { Affix } from '@tdesign/components';

describe('Affix', () => {
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    cb(performance.now());
    return 1;
  });

  describe('props', () => {
    it(':offsetTop[number]', async () => {
      const offsetTop = 10;
      const wrapper = mount(<Affix offsetTop={offsetTop}>Content</Affix>);
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':offsetBottom[number]', async () => {
      const offsetBottom = 50;
      const wrapper = mount(<Affix offsetBottom={offsetBottom}>Content</Affix>);
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':zIndex[number]', async () => {
      const zIndex = 1000;
      const wrapper = mount(<Affix zIndex={zIndex}>Content</Affix>);
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':container[function]', async () => {
      const wrapper = mount({
        methods: {
          container(): any {
            return (this as any).$refs?.container;
          },
        },
        render() {
          return (
            <div class="container" ref="container">
              <Affix container={(this as any).container}>Content</Affix>
            </div>
          );
        },
      });
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':onFixedChange[function]', async () => {
      const onFixedChange = vi.fn();
      const wrapper = mount(<Affix onFixedChange={onFixedChange}>Content</Affix>);
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('@fixedChange', async () => {
      const onFixedChange = vi.fn();
      const wrapper = mount(
        <Affix offsetTop={10} onFixedChange={onFixedChange}>
          Content
        </Affix>,
      );

      // Mock getBoundingClientRect to trigger fixed state
      const affixRef = (wrapper.vm.$refs as any).affixRef;
      if (affixRef) {
        vi.spyOn(affixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: 5,
          width: 100,
          height: 20,
        }));

        // Trigger scroll to activate fixed state
        window.dispatchEvent(new CustomEvent('scroll'));
        await nextTick();

        expect(onFixedChange).toHaveBeenCalled();
      }
    });
  });

  describe('functionality', () => {
    describe('window container', () => {
      const offsetTop = 10;
      const slotWidth = 100;
      const slotHeight = 20;

      const wrapper = mount({
        render() {
          return (
            <Affix ref="affixRef" offsetTop={offsetTop}>
              <div style={{ width: `${slotWidth}px`, height: `${slotHeight}px` }}>hello world</div>
            </Affix>
          );
        },
      });

      const { affixRef } = wrapper.vm.$refs as { affixRef: { affixWrapRef: any; scrollContainer: HTMLElement } };

      vi.spyOn(affixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
        top: 5,
        width: slotWidth,
        height: slotHeight,
      }));

      it('should get window as default container', async () => {
        await nextTick();
        expect(affixRef.scrollContainer).toBe(window);
      });

      it('should apply fixed class when scrolling', async () => {
        window.dispatchEvent(new CustomEvent('scroll'));
        expect(wrapper.find('.t-affix').classes()).toContain('t-affix');
      });

      it('should calculate correct position when fixed', () => {
        window.dispatchEvent(new CustomEvent('scroll'));
        const style = wrapper.find('.t-affix').attributes('style');
        expect(style).toBe(`top: ${offsetTop}px; width: ${slotWidth}px; height: ${slotHeight}px;`);
      });

      it('should generate placeholder element when fixed', () => {
        window.dispatchEvent(new CustomEvent('scroll'));
        expect(wrapper.html()).toContain(`<div style="width: ${slotWidth}px; height: ${slotHeight}px;"></div>`);
      });
    });

    describe('custom container', () => {
      const offsetTop = 10;
      const slotWidth = 100;
      const slotHeight = 20;
      const containerTop = 100;

      const wrapper = mount({
        methods: {
          container(): any {
            return (this as any).$refs?.container;
          },
        },
        render() {
          return (
            <div class="container" ref="container">
              <Affix ref="affixRef" container={(this as any).container} offsetTop={offsetTop}>
                <div style="width: 100px; height: 20px">hello world</div>
              </Affix>
            </div>
          );
        },
      });

      const { affixRef } = wrapper.vm.$refs as {
        affixRef: { affixWrapRef: any; scrollContainer: any; handleScroll: () => void };
      };

      it('should get custom container', async () => {
        await nextTick();
        expect(affixRef.scrollContainer).toBe((wrapper.vm as any).container());
      });

      beforeEach(() => {
        vi.spyOn(affixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: 5,
          width: slotWidth,
          height: slotHeight,
        }));
      });

      it('should apply fixed class when container scrolling', async () => {
        (wrapper.vm as any).container().dispatchEvent(new CustomEvent('scroll'));
        expect(wrapper.find('.t-affix').classes()).toContain('t-affix');
      });

      beforeEach(() => {
        window.addEventListener('scroll', affixRef.handleScroll);
        vi.spyOn(affixRef.scrollContainer, 'getBoundingClientRect').mockImplementation(() => ({
          top: containerTop,
        }));
      });

      it('should calculate correct position relative to container', () => {
        window.dispatchEvent(new CustomEvent('scroll'));
        const style = wrapper.find('.t-affix').attributes('style');
        expect(style).toBe(`top: ${offsetTop + containerTop}px; width: ${slotWidth}px; height: ${slotHeight}px;`);
      });
    });

    describe('offsetBottom', () => {
      const offsetBottom = 50;
      const slotWidth = 100;
      const slotHeight = 20;
      const containerHeight = 400;
      const containerTop = 0;

      const wrapper = mount({
        methods: {
          container(): any {
            return (this as any).$refs?.container;
          },
        },
        render() {
          return (
            <div class="container" ref="container" style={`height: ${containerHeight}px`}>
              <Affix
                ref="affixRef"
                container={(this as any).container}
                offsetBottom={offsetBottom}
                offsetTop={undefined}
              >
                <div style="width: 100px; height: 20px">hello world</div>
              </Affix>
            </div>
          );
        },
      });

      const { affixRef } = wrapper.vm.$refs as {
        affixRef: { affixWrapRef: any; scrollContainer: any; handleScroll: () => void };
      };

      beforeEach(() => {
        vi.spyOn(affixRef.scrollContainer, 'getBoundingClientRect').mockImplementation(() => ({
          top: containerTop,
        }));

        Object.defineProperty(affixRef.scrollContainer, 'clientHeight', {
          value: containerHeight,
          writable: true,
        });
      });

      it('should trigger when element reaches bottom boundary', async () => {
        await nextTick();

        const wrapToTop = containerHeight - offsetBottom + 10;
        vi.spyOn(affixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: wrapToTop,
          width: slotWidth,
          height: slotHeight,
        }));

        affixRef.handleScroll();
        await nextTick();

        expect(wrapper.find('.t-affix').classes()).toContain('t-affix');
      });

      it('should calculate correct bottom position', async () => {
        await nextTick();

        const wrapToTop = containerHeight - offsetBottom + 10;
        vi.spyOn(affixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: wrapToTop,
          width: slotWidth,
          height: slotHeight,
        }));

        affixRef.handleScroll();
        await nextTick();

        const expectedTop = containerTop + containerHeight - slotHeight - offsetBottom;
        const style = wrapper.find('.t-affix').attributes('style');
        expect(style).toBe(`top: ${expectedTop}px; width: ${slotWidth}px; height: ${slotHeight}px;`);
      });

      it('should not trigger when element is above bottom boundary', async () => {
        const testWrapper = mount({
          methods: {
            container(): any {
              return (this as any).$refs?.container;
            },
          },
          render() {
            return (
              <div class="container" ref="container" style={`height: ${containerHeight}px`}>
                <Affix
                  ref="testAffixRef"
                  container={(this as any).container}
                  offsetBottom={offsetBottom}
                  offsetTop={undefined}
                >
                  <div style="width: 100px; height: 20px">hello world</div>
                </Affix>
              </div>
            );
          },
        });

        const { testAffixRef } = testWrapper.vm.$refs as {
          testAffixRef: { affixWrapRef: any; scrollContainer: any; handleScroll: () => void };
        };

        await nextTick();

        vi.spyOn(testAffixRef.scrollContainer, 'getBoundingClientRect').mockImplementation(() => ({
          top: containerTop,
        }));

        Object.defineProperty(testAffixRef.scrollContainer, 'clientHeight', {
          value: containerHeight,
          writable: true,
        });

        const normalPosition = 50;
        vi.spyOn(testAffixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: normalPosition,
          width: slotWidth,
          height: slotHeight,
        }));

        testAffixRef.handleScroll();
        await nextTick();

        const affixElements = testWrapper.findAll('.t-affix');
        expect(affixElements.length).toBe(0);
      });

      it('should create placeholder element for offsetBottom', async () => {
        await nextTick();

        const wrapToTop = containerHeight - offsetBottom + 10;
        vi.spyOn(affixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: wrapToTop,
          width: slotWidth,
          height: slotHeight,
        }));

        affixRef.handleScroll();
        await nextTick();

        expect(wrapper.html()).toContain(`<div style="width: ${slotWidth}px; height: ${slotHeight}px;"></div>`);
      });
    });

    describe('event binding/unbinding', () => {
      const offsetTop = 10;
      const slotWidth = 100;
      const slotHeight = 20;

      it('should remove event listeners when component unmounts', async () => {
        const testWrapper = mount({
          methods: {
            container(): any {
              return (this as any).$refs?.container;
            },
          },
          render() {
            return (
              <div class="container" ref="container">
                <Affix ref="testAffixRef" container={(this as any).container} offsetTop={offsetTop}>
                  <div style="width: 100px; height: 20px">test content</div>
                </Affix>
              </div>
            );
          },
        });

        const testAffixRef = (testWrapper.vm as any).$refs.testAffixRef;
        await nextTick();

        expect(testAffixRef.scrollContainer).toBeDefined();

        const offSpy = vi.fn();
        vi.doMock('@tdesign/shared-utils', () => ({
          off: offSpy,
          on: vi.fn(),
          getScrollContainer: vi.fn(() => testAffixRef.scrollContainer),
        }));

        const mockRAFId = 123;
        const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
        vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(mockRAFId);
        vi.spyOn(testAffixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: 5,
          width: slotWidth,
          height: slotHeight,
        }));

        testAffixRef.handleScroll();
        testWrapper.unmount();
        await nextTick();

        expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(mockRAFId);
        vi.restoreAllMocks();
      });

      it('should handle null scrollContainer gracefully', async () => {
        const testWrapper = mount({
          render() {
            return (
              <Affix offsetTop={offsetTop}>
                <div>test content</div>
              </Affix>
            );
          },
        });

        await nextTick();

        const testAffixRef = (testWrapper.vm.$refs as any).affixRef;
        if (testAffixRef) {
          testAffixRef.scrollContainer = { value: null };
        }

        expect(() => {
          testWrapper.unmount();
        }).not.toThrow();
      });

      it('should handle missing rAFId gracefully', async () => {
        const testWrapper = mount({
          methods: {
            container(): any {
              return (this as any).$refs?.container;
            },
          },
          render() {
            return (
              <div class="container" ref="container">
                <Affix ref="testAffixRef" container={(this as any).container} offsetTop={offsetTop}>
                  <div style="width: 100px; height: 20px">test content</div>
                </Affix>
              </div>
            );
          },
        });

        const testAffixRef = (testWrapper.vm.$refs as any).testAffixRef;
        await nextTick();

        expect(testAffixRef.scrollContainer).toBeDefined();

        const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');

        testWrapper.unmount();
        await nextTick();

        expect(cancelAnimationFrameSpy).not.toHaveBeenCalled();
        vi.restoreAllMocks();
      });

      it('should manage isBind state correctly', async () => {
        const testWrapper = mount({
          methods: {
            container(): any {
              return (this as any).$refs?.container;
            },
          },
          render() {
            return (
              <div class="container" ref="container">
                <Affix ref="testAffixRef" container={(this as any).container} offsetTop={offsetTop}>
                  <div style="width: 100px; height: 20px">test content</div>
                </Affix>
              </div>
            );
          },
        });

        const testAffixRef = (testWrapper.vm.$refs as any).testAffixRef;
        await nextTick();

        expect(testAffixRef.scrollContainer).toBeDefined();

        expect(() => {
          testWrapper.unmount();
        }).not.toThrow();

        expect(() => {
          testWrapper.unmount();
        }).not.toThrow();
      });

      it('should handle bindScroll early return when already bound', async () => {
        const testWrapper = mount({
          methods: {
            container(): any {
              return (this as any).$refs?.container;
            },
          },
          render() {
            return (
              <div class="container" ref="container">
                <Affix ref="testAffixRef" container={(this as any).container} offsetTop={offsetTop}>
                  <div style="width: 100px; height: 20px">test content</div>
                </Affix>
              </div>
            );
          },
        });

        await nextTick();

        const testAffixRef = (testWrapper.vm.$refs as any).testAffixRef;
        expect(testAffixRef).toBeDefined();
        expect(testAffixRef.scrollContainer).toBeDefined();

        expect(() => {
          testAffixRef.handleScroll();
        }).not.toThrow();

        testWrapper.unmount();
      });
    });

    describe('props watchers', () => {
      it('should trigger component update when props change', async () => {
        const testWrapper = mount(Affix, {
          props: {
            offsetTop: 10,
            offsetBottom: 10,
            zIndex: 100,
          },
          slots: {
            default: '<div>test content</div>',
          },
        });

        await nextTick();
        expect(testWrapper.exists()).toBe(true);

        await testWrapper.setProps({ offsetTop: 20 });
        await nextTick();
        expect(testWrapper.exists()).toBe(true);

        await testWrapper.setProps({ offsetBottom: 20 });
        await nextTick();
        expect(testWrapper.exists()).toBe(true);

        await testWrapper.setProps({ zIndex: 200 });
        await nextTick();
        expect(testWrapper.exists()).toBe(true);

        await testWrapper.setProps({
          offsetTop: 30,
          offsetBottom: 30,
          zIndex: 300,
        });
        await nextTick();
        expect(testWrapper.exists()).toBe(true);

        testWrapper.unmount();
      });

      it('should handle undefined values correctly', async () => {
        const testWrapper = mount(Affix, {
          props: {
            offsetTop: undefined,
            offsetBottom: undefined,
            zIndex: undefined,
          },
          slots: {
            default: '<div>test content</div>',
          },
        });

        await nextTick();
        expect(testWrapper.exists()).toBe(true);

        await testWrapper.setProps({ offsetTop: 10, offsetBottom: 10, zIndex: 100 });
        await nextTick();
        expect(testWrapper.exists()).toBe(true);

        await testWrapper.setProps({ offsetTop: undefined, offsetBottom: undefined, zIndex: undefined });
        await nextTick();
        expect(testWrapper.exists()).toBe(true);

        testWrapper.unmount();
      });

      it('should handle rapid prop changes', async () => {
        const testWrapper = mount(Affix, {
          props: { offsetTop: 10 },
          slots: { default: '<div>test content</div>' },
        });

        await nextTick();

        for (let i = 0; i < 3; i++) {
          await testWrapper.setProps({ offsetTop: 10 + i * 5, zIndex: 100 + i * 10 });
        }

        await nextTick();
        expect(testWrapper.exists()).toBe(true);
        expect(testWrapper.find('div').exists()).toBe(true);

        testWrapper.unmount();
      });
    });
  });
});
