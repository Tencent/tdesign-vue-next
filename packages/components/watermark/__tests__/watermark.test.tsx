import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Watermark from '@tdesign/components/watermark';

// every component needs four parts: props/events/slots/functions.
describe('Watermark', () => {
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = vi.fn();
  });

  // test props api
  describe(':props', () => {
    it('renders correctly', () => {
      const wrapper = mount({
        render() {
          return <Watermark></Watermark>;
        },
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('t-watermark');
    });

    describe(':alpha[number]', () => {
      it('should accept alpha value 0', () => {
        const wrapper = mount(Watermark, {
          props: { alpha: 0 },
        });
        expect(wrapper.vm.alpha).toBe(0);
      });

      it('should accept alpha value 0.5', () => {
        const wrapper = mount(Watermark, {
          props: { alpha: 0.5 },
        });
        expect(wrapper.vm.alpha).toBe(0.5);
      });

      it('should accept alpha value 1', () => {
        const wrapper = mount(Watermark, {
          props: { alpha: 1 },
        });
        expect(wrapper.vm.alpha).toBe(1);
      });

      it('should use default alpha value', () => {
        const wrapper = mount(Watermark);
        // Default alpha is 1 according to props.ts
        expect(wrapper.vm.alpha).toBe(1);
      });
    });

    describe(':content[string]', () => {
      it('should render string content', () => {
        const wrapper = mount(Watermark, {
          props: { content: 'Test Content' },
        });
        expect(wrapper.text()).toContain('Test Content');
      });
    });

    describe(':content[function]', () => {
      it('should render function content', () => {
        const contentFn = () => 'Function Content';
        const wrapper = mount(Watermark, {
          props: { content: contentFn },
        });
        expect(wrapper.text()).toContain('Function Content');
      });
    });

    describe(':default slot', () => {
      it('should render default slot content [string]', () => {
        const wrapper = mount(Watermark, {
          slots: {
            default: 'Slot Content',
          },
        });
        expect(wrapper.text()).toContain('Slot Content');
      });

      it('should render default slot content [function]', () => {
        const wrapper = mount(Watermark, {
          slots: {
            default: () => 'Slot Content',
          },
        });
        expect(wrapper.text()).toContain('Slot Content');
      });

      it('default slot should take higher priority', () => {
        const contentFn = () => 'Function Content';
        const wrapper = mount(Watermark, {
          props: { content: contentFn },
          slots: {
            default: () => 'Slot Content',
          },
        });
        expect(wrapper.text()).toContain('Slot Content');
      });
    });

    describe(':height[number]', () => {
      it('should accept height value 100', () => {
        const wrapper = mount(Watermark, {
          props: { height: 100 },
        });
        expect(wrapper.vm.height).toBe(100);
      });
    });

    describe(':isRepeat[boolean]', () => {
      it('should accept isRepeat value false', () => {
        const wrapper = mount(Watermark, {
          props: { isRepeat: false },
        });
        expect(wrapper.vm.isRepeat).toBe(false);
        expect(wrapper.element.children[0].style['background-repeat']).toBe('no-repeat');
      });

      it('should accept isRepeat value true', () => {
        const wrapper = mount(Watermark, {
          props: { isRepeat: true },
        });
        expect(wrapper.vm.isRepeat).toBe(true);
        expect(wrapper.element.children[0].style['background-repeat']).toBe('repeat');
      });

      it('should use default isRepeat value', () => {
        const wrapper = mount(Watermark);
        expect(wrapper.vm.isRepeat).toBe(true);
        expect(wrapper.element.children[0].style['background-repeat']).toBe('repeat');
      });
    });
  });
});
