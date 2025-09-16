import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Watermark from '@tdesign/components/watermark';
import injectStyle from '@tdesign/common-js/utils/injectStyle';
import generateBase64Url from '@tdesign/common-js/watermark/generateBase64Url';

// every component needs four parts: props/events/slots/functions.
describe('Watermark', () => {
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = vi.fn();
    vi.mock('@tdesign/common-js/utils/injectStyle', { spy: true });
    vi.mock('@tdesign/common-js/watermark/generateBase64Url', { spy: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
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

    describe(':lineSpace[number]', () => {
      it('should accept lineSpace value 50', () => {
        const wrapper = mount(Watermark, {
          props: { lineSpace: 50 },
        });
        expect(wrapper.vm.lineSpace).toBe(50);
      });

      it('should use default lineSpace value', () => {
        const wrapper = mount(Watermark);
        // Default lineSpace is 16 according to props.ts
        expect(wrapper.vm.lineSpace).toBe(16);
      });
    });

    describe(':movable[boolean]', () => {
      it('should accept movable value true', () => {
        const wrapper = mount(Watermark, {
          props: { movable: true },
        });
        expect(wrapper.vm.movable).toBe(true);
        expect(wrapper.element.children[0].style['background-repeat']).toBe('no-repeat');
        expect(injectStyle).toBeCalled();
      });

      it('should accept movable value false', () => {
        const wrapper = mount(Watermark, {
          props: { movable: false },
        });
        expect(injectStyle).not.toBeCalled();
        expect(wrapper.vm.movable).toBe(false);
        expect(wrapper.element.children[0].style['background-repeat']).toBe('repeat');
        expect(injectStyle).not.toBeCalled();
      });
    });

    describe(':moveInterval[number]', () => {
      it('should accept moveInterval value 150', () => {
        const wrapper = mount(Watermark, {
          props: { movable: true, moveInterval: 150 },
        });
        expect(wrapper.vm.moveInterval).toBe(150);
        expect(wrapper.element.children[0].style.animation).toBe('watermark infinite 10s');
      });

      it('should use default moveInterval value', () => {
        const wrapper = mount(Watermark, {
          props: { movable: true },
        });
        expect(wrapper.vm.moveInterval).toBe(3000);
        expect(wrapper.element.children[0].style.animation).toBe('watermark infinite 200s');
      });
    });

    describe(':offset[array]', () => {
      it('should accept offset value [10,10]', () => {
        const wrapper = mount(Watermark, {
          props: { offset: [10, 10] },
        });
        expect(wrapper.vm.offset).toEqual([10, 10]);
        expect(generateBase64Url).toBeCalledWith(
          expect.objectContaining({ offsetLeft: 10, offsetTop: 10 }),
          expect.any(Function),
        );
      });

      it('offset takes higher priority than gapX and gapY', () => {
        const wrapper = mount(Watermark, {
          props: { offset: [10, 10], gapX: 100, gapY: 100 },
        });
        expect(wrapper.vm.offset).toEqual([10, 10]);
        expect(generateBase64Url).toBeCalledWith(
          expect.objectContaining({ offsetLeft: 10, offsetTop: 10 }),
          expect.any(Function),
        );
      });
    });

    describe(':removable[boolean]', () => {
      it('should accept removable value false', () => {
        const wrapper = mount(Watermark, {
          props: { removable: false },
        });
        expect(wrapper.vm.removable).toBe(false);
      });

      it('should accept removable value true', () => {
        const wrapper = mount(Watermark, {
          props: { removable: true },
        });
        expect(wrapper.vm.removable).toBe(true);
      });

      it('should use default removable value', () => {
        const wrapper = mount(Watermark);
        expect(wrapper.vm.removable).toBe(true);
      });
    });

    describe(':rotate[number]', () => {
      it('should accept rotate value 20', () => {
        const wrapper = mount(Watermark, {
          props: { rotate: 20 },
        });
        expect(wrapper.vm.rotate).toBe(20);
        expect(generateBase64Url).toBeCalledWith(expect.objectContaining({ rotate: 20 }), expect.any(Function));
      });

      it('should use default rotate value', () => {
        const wrapper = mount(Watermark);
        expect(wrapper.vm.rotate).toBe(-22);
        expect(generateBase64Url).toBeCalledWith(expect.objectContaining({ rotate: -22 }), expect.any(Function));
      });
    });

    describe(':watermarkContent[object]', () => {
      it('should render object watermarkContent', () => {
        const watermarkContent = { text: 'Test Content' };
        const wrapper = mount(Watermark, {
          props: { watermarkContent },
        });
        expect(wrapper.vm.watermarkContent).toStrictEqual(watermarkContent);
        expect(generateBase64Url).toBeCalledWith(expect.objectContaining({ watermarkContent }), expect.any(Function));
      });
    });

    describe(':watermarkContent[array]', () => {
      it('should render array watermarkContent', () => {
        const watermarkContent = [{ text: 'Test Content' }, { text: 'Test Content 2' }];
        const wrapper = mount(Watermark, {
          props: { watermarkContent },
        });
        expect(wrapper.vm.watermarkContent).toStrictEqual(watermarkContent);
        expect(generateBase64Url).toBeCalledWith(expect.objectContaining({ watermarkContent }), expect.any(Function));
      });
    });

    describe(':width[number]', () => {
      it('should accept width value 200', () => {
        const wrapper = mount(Watermark, {
          props: { width: 200 },
        });
        expect(wrapper.vm.width).toBe(200);
        expect(generateBase64Url).toBeCalledWith(expect.objectContaining({ width: 200 }), expect.any(Function));
      });
    });

    describe(':x[number]', () => {
      it('should accept x value 100', () => {
        const wrapper = mount(Watermark, {
          props: { x: 100 },
        });
        expect(wrapper.vm.x).toBe(100);
        expect(generateBase64Url).toBeCalledWith(expect.objectContaining({ gapX: 100 }), expect.any(Function));
      });
    });

    describe(':y[number]', () => {
      it('should accept y value 100', () => {
        const wrapper = mount(Watermark, {
          props: { y: 100 },
        });
        expect(wrapper.vm.y).toBe(100);
        expect(generateBase64Url).toBeCalledWith(expect.objectContaining({ gapY: 100 }), expect.any(Function));
      });
    });

    describe(':zIndex[number]', () => {
      it('should accept zIndex value 1000', () => {
        const wrapper = mount(Watermark, {
          props: { zIndex: 1000 },
        });
        expect(wrapper.vm.zIndex).toBe(1000);
        expect(wrapper.element.children[0].style.zIndex).toBe('1000');
      });

      it('should use default zIndex value', () => {
        const wrapper = mount(Watermark);
        expect(wrapper.vm.zIndex).toBeUndefined();
        expect(wrapper.element.children[0].style.zIndex).toBe('');
      });
    });
  });
});
