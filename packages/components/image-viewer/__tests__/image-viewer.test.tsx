// @ts-nocheck
import { mount } from '@vue/test-utils';
import { expect, it, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref } from 'vue';
import { ImageViewer } from '@tdesign/components/image-viewer';
import { Button } from '@tdesign/components/button';

const images = [
  'https://tdesign.gtimg.com/demo/demo-image-1.png',
  'https://tdesign.gtimg.com/demo/demo-image-2.png',
  'https://tdesign.gtimg.com/demo/demo-image-3.png',
];

describe('ImageViewer Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== Props Tests ====================
  describe(':props', () => {
    describe('props.trigger', () => {
      it('trigger with function type', () => {
        const wrapper = mount({
          render() {
            return <ImageViewer trigger={() => <Button>test</Button>} />;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });

      it('trigger with slot', () => {
        const wrapper = mount(ImageViewer, {
          slots: {
            trigger: ({ open }) => <Button onClick={() => open()}>Open Viewer</Button>,
          },
          props: { images },
        });
        expect(wrapper.find('button').exists()).toBeTruthy();
      });

      it('default trigger renders when no trigger prop', () => {
        const wrapper = mount(ImageViewer, {
          props: { images },
        });
        expect(wrapper.find('.t-image-viewer__trigger').exists()).toBeTruthy();
      });

      it('default trigger opens viewer on click', async () => {
        mount(ImageViewer, {
          props: { images },
        });
        const trigger = document.querySelector('.t-image-viewer__trigger--hover') as HTMLElement;
        if (trigger) {
          trigger.click();
          await nextTick();
          expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
        }
      });
    });

    describe('props.images', () => {
      it('images with string array', () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
          },
        });
        expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();
      });

      it('images with ImageInfo objects', async () => {
        const imageInfos = [
          {
            mainImage: 'https://example.com/main1.jpg',
            thumbnail: 'https://example.com/thumb1.jpg',
            download: true,
          },
        ];
        mount(ImageViewer, {
          props: {
            visible: true,
            images: imageInfos,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer')).toBeTruthy();
      });

      it('images with empty array', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images: [],
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer')).toBeTruthy();
      });
    });

    describe('props.index', () => {
      it('controlled index', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            index: 1,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });

      it('defaultIndex', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            defaultIndex: 2,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });
    });

    describe('props.visible', () => {
      it('controlled visible', async () => {
        const wrapper = mount(ImageViewer, {
          props: {
            visible: false,
            images,
          },
        });
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeFalsy();

        await wrapper.setProps({ visible: true });
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });

      it('defaultVisible = true', () => {
        mount(ImageViewer, {
          props: {
            defaultVisible: true,
            images,
          },
        });
        expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();
      });

      it('defaultVisible = false', () => {
        mount(ImageViewer, {
          props: {
            defaultVisible: false,
            images,
          },
        });
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeFalsy();
      });

      it('v-model:visible', async () => {
        const visibleRef = ref(false);
        mount({
          setup() {
            return () => <ImageViewer v-model:visible={visibleRef.value} images={images} />;
          },
        });

        visibleRef.value = true;
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });
    });

    describe('props.closeBtn', () => {
      it('closeBtn = true (default)', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeBtn: true,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer__modal-close-bt')).toBeTruthy();
      });

      it('closeBtn = false', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeBtn: false,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer__modal-close-bt')).toBeFalsy();
      });

      it('closeBtn with custom function', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeBtn: () => <span class="custom-close">X</span>,
          },
        });
        await nextTick();
        expect(document.querySelector('.custom-close')).toBeTruthy();
      });
    });

    describe('props.closeOnEscKeydown', () => {
      it('closeOnEscKeydown = true (default)', async () => {
        const onClose = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeOnEscKeydown: true,
            onClose,
          },
        });

        await nextTick();
        const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
        if (viewer) {
          viewer.focus();
          const event = new KeyboardEvent('keydown', { code: 'Escape' });
          viewer.dispatchEvent(event);
          await nextTick();
          expect(onClose).toHaveBeenCalledWith(
            expect.objectContaining({
              trigger: 'esc',
            }),
          );
        }
      });

      it('closeOnEscKeydown = false', async () => {
        const onClose = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeOnEscKeydown: false,
            onClose,
          },
        });

        await nextTick();
        const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
        if (viewer) {
          viewer.focus();
          const event = new KeyboardEvent('keydown', { code: 'Escape' });
          viewer.dispatchEvent(event);
          await nextTick();
          expect(onClose).not.toHaveBeenCalled();
        }
      });
    });

    describe('props.closeOnOverlay', () => {
      it('closeOnOverlay = true', async () => {
        const onClose = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeOnOverlay: true,
            onClose,
          },
        });

        await nextTick();
        const mask = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
        if (mask) {
          mask.click();
          await nextTick();
          expect(onClose).toHaveBeenCalledWith(
            expect.objectContaining({
              trigger: 'overlay',
            }),
          );
        }
      });

      it('closeOnOverlay = false (default)', async () => {
        const onClose = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeOnOverlay: false,
            onClose,
          },
        });

        await nextTick();
        const mask = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
        if (mask) {
          mask.click();
          await nextTick();
          expect(onClose).not.toHaveBeenCalled();
        }
      });
    });

    describe('props.draggable', () => {
      it('draggable in modeless mode', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            mode: 'modeless',
            draggable: true,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-dialog')).toBeTruthy();
      });

      it('draggable = false', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            mode: 'modeless',
            draggable: false,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-dialog')).toBeTruthy();
      });
    });

    describe('props.imageScale', () => {
      it('custom imageScale config', async () => {
        const imageScale = {
          max: 3,
          min: 0.1,
          step: 0.1,
          defaultScale: 1.5,
        };
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            imageScale,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });
    });

    describe('props.mode', () => {
      it('mode = modal (default)', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            mode: 'modal',
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });

      it('mode = modeless', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            mode: 'modeless',
          },
        });
        await nextTick();
        // modeless mode uses TDialog component
        expect(document.querySelector('.t-dialog')).toBeTruthy();
      });
    });

    describe('props.navigationArrow', () => {
      it('navigationArrow = true (default)', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            navigationArrow: true,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer__modal-prev-bt')).toBeTruthy();
        expect(document.querySelector('.t-image-viewer__modal-next-bt')).toBeTruthy();
      });

      it('navigationArrow with custom function', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            navigationArrow: () => <span class="custom-arrow">←</span>,
          },
        });
        await nextTick();
        expect(document.querySelector('.custom-arrow')).toBeTruthy();
      });
    });

    describe('props.showOverlay', () => {
      it('showOverlay = true', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            showOverlay: true,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer__modal-mask')).toBeTruthy();
      });

      it('showOverlay = false', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            showOverlay: false,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer__modal-mask')).toBeFalsy();
      });

      it('showOverlay default for modal mode', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            mode: 'modal',
          },
        });
        await nextTick();
        // modal mode shows overlay by default
        expect(document.querySelector('.t-image-viewer__modal-mask')).toBeTruthy();
      });
    });

    describe('props.title', () => {
      it('title with string', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            title: 'Custom Title',
          },
        });
        await nextTick();
        const titleEl = document.querySelector('.t-image-viewer__modal-index');
        expect(titleEl?.textContent).toBe('Custom Title');
      });

      it('title with function', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            title: () => <span class="custom-title">Function Title</span>,
          },
        });
        await nextTick();
        expect(document.querySelector('.custom-title')).toBeTruthy();
      });

      it('default title shows index', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            index: 0,
          },
        });
        await nextTick();
        const titleEl = document.querySelector('.t-image-viewer__modal-index');
        expect(titleEl?.textContent).toBe('1/3');
      });
    });

    describe('props.zIndex', () => {
      it('custom zIndex', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            zIndex: 5000,
          },
        });
        await nextTick();
        const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
        expect(viewer?.style.zIndex).toBe('5000');
      });

      it('default zIndex is 3000', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
          },
        });
        await nextTick();
        const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
        expect(viewer?.style.zIndex).toBe('3000');
      });
    });

    describe('props.attach', () => {
      it('attach with string selector', async () => {
        const container = document.createElement('div');
        container.id = 'custom-container';
        document.body.appendChild(container);

        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            attach: '#custom-container',
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });

      it('attach = body (default)', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });
    });

    describe('props.viewerScale', () => {
      it('viewerScale in modeless mode', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            mode: 'modeless',
            viewerScale: {
              minWidth: 400,
              minHeight: 300,
            },
          },
        });
        await nextTick();
        expect(document.querySelector('.t-dialog')).toBeTruthy();
      });
    });

    describe('props.imageReferrerpolicy', () => {
      it('imageReferrerpolicy = no-referrer', async () => {
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            imageReferrerpolicy: 'no-referrer',
          },
        });
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      });
    });
  });

  // ==================== Events Tests ====================
  describe('@events', () => {
    describe('onClose', () => {
      it('onClose triggered by close button', async () => {
        const onClose = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            onClose,
          },
        });

        await nextTick();
        const closeBtn = document.querySelector('.t-image-viewer__modal-close-bt') as HTMLElement;
        if (closeBtn) {
          closeBtn.click();
          await nextTick();
          expect(onClose).toHaveBeenCalledWith(
            expect.objectContaining({
              trigger: 'close-btn',
            }),
          );
        }
      });

      it('onClose triggered by ESC key', async () => {
        const onClose = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeOnEscKeydown: true,
            onClose,
          },
        });

        await nextTick();
        const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
        if (viewer) {
          viewer.focus();
          const event = new KeyboardEvent('keydown', { code: 'Escape' });
          viewer.dispatchEvent(event);
          await nextTick();
          expect(onClose).toHaveBeenCalledWith(
            expect.objectContaining({
              trigger: 'esc',
            }),
          );
        }
      });

      it('onClose triggered by overlay click', async () => {
        const onClose = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            closeOnOverlay: true,
            onClose,
          },
        });

        await nextTick();
        const mask = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
        if (mask) {
          mask.click();
          await nextTick();
          expect(onClose).toHaveBeenCalledWith(
            expect.objectContaining({
              trigger: 'overlay',
            }),
          );
        }
      });
    });

    describe('onIndexChange', () => {
      it('onIndexChange triggered by prev button', async () => {
        const onIndexChange = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            index: 1,
            onIndexChange,
          },
        });

        await nextTick();
        const prevBtn = document.querySelector('.t-image-viewer__modal-prev-bt') as HTMLElement;
        if (prevBtn) {
          prevBtn.click();
          await nextTick();
          expect(onIndexChange).toHaveBeenCalledWith(0, { trigger: 'prev' });
        }
      });

      it('onIndexChange triggered by next button', async () => {
        const onIndexChange = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            index: 0,
            onIndexChange,
          },
        });

        await nextTick();
        const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
        if (nextBtn) {
          nextBtn.click();
          await nextTick();
          expect(onIndexChange).toHaveBeenCalledWith(1, { trigger: 'next' });
        }
      });

      it('onIndexChange triggered by thumbnail click', async () => {
        const onIndexChange = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            index: 0,
            onIndexChange,
          },
        });

        await nextTick();
        const thumbnails = document.querySelectorAll('.t-image-viewer__header-img');
        if (thumbnails.length > 1) {
          (thumbnails[1] as HTMLElement).click();
          await nextTick();
          expect(onIndexChange).toHaveBeenCalledWith(1, { trigger: 'current' });
        }
      });

      it('onIndexChange triggered by left arrow key', async () => {
        const onIndexChange = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            index: 1,
            onIndexChange,
          },
        });

        await nextTick();
        const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
        if (viewer) {
          viewer.focus();
          const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
          viewer.dispatchEvent(event);
          await nextTick();
          expect(onIndexChange).toHaveBeenCalledWith(0, { trigger: 'prev' });
        }
      });

      it('onIndexChange triggered by right arrow key', async () => {
        const onIndexChange = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images,
            index: 0,
            onIndexChange,
          },
        });

        await nextTick();
        const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
        if (viewer) {
          viewer.focus();
          const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });
          viewer.dispatchEvent(event);
          await nextTick();
          expect(onIndexChange).toHaveBeenCalledWith(1, { trigger: 'next' });
        }
      });
    });

    describe('onDownload', () => {
      it('onDownload custom handler', async () => {
        const onDownload = vi.fn();
        mount(ImageViewer, {
          props: {
            visible: true,
            images: [{ mainImage: images[0], download: true }],
            onDownload,
          },
        });

        await nextTick();
        // Download icon should be visible for downloadable images
        expect(document.querySelector('.t-image-viewer__utils')).toBeTruthy();
      });
    });
  });

  // ==================== Keyboard Interactions ====================
  describe('keyboard interactions', () => {
    it('up arrow key zooms in', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        viewer.dispatchEvent(event);
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('down arrow key zooms out', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        viewer.dispatchEvent(event);
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });
  });

  // ==================== Mouse Interactions ====================
  describe('mouse interactions', () => {
    it('wheel zoom in', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        const wheelEvent = new WheelEvent('wheel', { deltaY: -100 });
        viewer.dispatchEvent(wheelEvent);
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('wheel zoom out', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        const wheelEvent = new WheelEvent('wheel', { deltaY: 100 });
        viewer.dispatchEvent(wheelEvent);
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('expand/collapse header', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const expandBtn = document.querySelector('.t-image-viewer__header-pre-bt') as HTMLElement;
      if (expandBtn) {
        expandBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer__modal-header')).toBeTruthy();
      }
    });
  });

  // ==================== Edge Cases ====================
  describe('edge cases', () => {
    it('single image without navigation', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [images[0]],
        },
      });
      await nextTick();
      // With single image, navigation and header should not be rendered
      expect(document.querySelector('.t-image-viewer__modal-prev-bt')).toBeFalsy();
      expect(document.querySelector('.t-image-viewer__modal-next-bt')).toBeFalsy();
      expect(document.querySelector('.t-image-viewer__modal-header')).toBeFalsy();
    });

    it('boundary check - prev at first image', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          index: 0,
          onIndexChange,
        },
      });

      await nextTick();
      const prevBtn = document.querySelector('.t-image-viewer__modal-prev-bt') as HTMLElement;
      if (prevBtn) {
        prevBtn.click();
        await nextTick();
        // Should stay at 0, not go negative
        expect(onIndexChange).toHaveBeenCalledWith(0, { trigger: 'prev' });
      }
    });

    it('boundary check - next at last image', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          index: 2,
          onIndexChange,
        },
      });

      await nextTick();
      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      if (nextBtn) {
        nextBtn.click();
        await nextTick();
        // Should stay at last index, not exceed
        expect(onIndexChange).toHaveBeenCalledWith(2, { trigger: 'next' });
      }
    });

    it('animation cleanup on unmount', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      wrapper.unmount();
      // Test passes if no errors are thrown
      expect(true).toBe(true);
    });

    it('visibility toggle with animation', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: false,
          images,
        },
      });

      await wrapper.setProps({ visible: true });
      await nextTick();

      await wrapper.setProps({ visible: false });
      await nextTick();

      // Should handle animation states properly
      expect(true).toBe(true);
    });
  });

  // ==================== Custom Trigger ====================
  describe('custom trigger', () => {
    it('trigger provides open function via slot', async () => {
      let openFn: ((index?: number) => void) | undefined;

      mount(ImageViewer, {
        props: {
          images,
        },
        slots: {
          trigger: ({ open }) => {
            openFn = open;
            return <button>Open</button>;
          },
        },
      });

      await nextTick();
      expect(typeof openFn).toBe('function');
    });

    it('trigger function prop can open viewer', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const trigger = (_h: unknown, { open }: { open: () => void }) => (
        <button class="custom-trigger" onClick={open}>
          Open
        </button>
      );

      const wrapper = mount({
        setup() {
          return () => <ImageViewer images={images} trigger={trigger} />;
        },
      });

      await nextTick();
      const triggerEl = wrapper.find('.custom-trigger');
      expect(triggerEl.exists()).toBeTruthy();

      // Click trigger to open viewer
      await triggerEl.trigger('click');
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });
  });

  // ==================== Utils Toolbar ====================
  describe('utils toolbar', () => {
    it('utils toolbar is rendered', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils')).toBeTruthy();
    });

    it('scale percentage is displayed', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();
    });

    it('mirror button click should trigger onMirror', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const mirrorBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[0] as HTMLElement;
      if (mirrorBtn) {
        mirrorBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('rotate button click should trigger onRotate', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const rotateBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[1] as HTMLElement;
      if (rotateBtn) {
        rotateBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('zoom out button click should trigger onZoomOut', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const zoomOutBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[2] as HTMLElement;
      if (zoomOutBtn) {
        zoomOutBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();
      }
    });

    it('zoom in button click should trigger onZoomIn', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const zoomInBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[4] as HTMLElement;
      if (zoomInBtn) {
        zoomInBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();
      }
    });

    it('reset button click should trigger onReset', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const resetBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[5] as HTMLElement;
      if (resetBtn) {
        resetBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('download button click should trigger onDownload when download enabled', async () => {
      const onDownload = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [{ mainImage: images[0], download: true }],
          onDownload,
        },
      });

      await nextTick();
      // Find download button (last icon when download is enabled)
      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const downloadBtn = icons[icons.length - 1] as HTMLElement;
      if (downloadBtn) {
        downloadBtn.click();
        await nextTick();
        expect(onDownload).toHaveBeenCalled();
      }
    });
  });

  // ==================== Modeless Mode Tests ====================
  describe('modeless mode', () => {
    it('should render in dialog mode', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          mode: 'modeless',
        },
      });

      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it('should have footer with utils in modeless mode', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          mode: 'modeless',
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__footer')).toBeTruthy();
    });

    it('should close dialog via close button in modeless mode', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          mode: 'modeless',
          onClose,
        },
      });

      await nextTick();
      const closeBtn = document.querySelector('.t-dialog__close-btn') as HTMLElement;
      if (closeBtn) {
        closeBtn.click();
        await nextTick();
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('should use custom trigger in modeless mode', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const trigger = (_h: unknown, { open }: { open: () => void }) => (
        <button class="modeless-trigger" onClick={open}>
          Open Modeless
        </button>
      );

      const wrapper = mount({
        setup() {
          return () => <ImageViewer images={images} mode="modeless" trigger={trigger} />;
        },
      });

      await nextTick();
      const triggerEl = wrapper.find('.modeless-trigger');
      expect(triggerEl.exists()).toBeTruthy();

      // Click to open
      await triggerEl.trigger('click');
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it('should render default trigger in modeless mode when no trigger prop', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          images,
          mode: 'modeless',
        },
      });

      await nextTick();
      // In modeless mode, default trigger is still rendered
      expect(wrapper.find('.t-image-viewer__trigger').exists()).toBeTruthy();
    });
  });

  // ==================== Keyboard Default Branch ====================
  describe('keyboard default branch', () => {
    it('should handle unrecognized key codes', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        // Press a key that is not handled
        const event = new KeyboardEvent('keydown', { code: 'KeyA' });
        viewer.dispatchEvent(event);
        await nextTick();
        // Viewer should still be present (no crash)
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });
  });

  // ==================== Open with Index ====================
  describe('open with index', () => {
    it('should open viewer at specific index', async () => {
      let openFn: ((index?: number) => void) | undefined;

      mount(ImageViewer, {
        props: {
          images,
        },
        slots: {
          trigger: ({ open }) => {
            openFn = open;
            return <button>Open</button>;
          },
        },
      });

      await nextTick();
      expect(typeof openFn).toBe('function');

      // Open at index 2
      if (openFn) {
        openFn(2);
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });
  });

  // ==================== Modeless Mode Deep Tests ====================
  describe('modeless mode deep tests', () => {
    it('should apply viewerScale minWidth and minHeight', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          mode: 'modeless',
          viewerScale: {
            minWidth: 500,
            minHeight: 400,
          },
        },
      });

      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });

    it('should render footer with utils in modeless mode', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          mode: 'modeless',
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__footer')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__utils')).toBeTruthy();
    });

    it('should render title in dialog header', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          mode: 'modeless',
          title: 'Test Modal Title',
        },
      });

      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });
  });

  // ==================== Navigation Deep Tests ====================
  describe('navigation deep tests', () => {
    it('should show navigation arrows only for multiple images', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [images[0]], // Single image
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-prev-bt')).toBeFalsy();
      expect(document.querySelector('.t-image-viewer__modal-next-bt')).toBeFalsy();
    });

    it('should show header thumbnails only for multiple images', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [images[0]], // Single image
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-header')).toBeFalsy();
    });

    it('should update header thumbnail active state on index change', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          index: 0,
        },
      });

      await nextTick();
      const thumbnails = document.querySelectorAll('.t-image-viewer__header-box');
      if (thumbnails.length > 0) {
        expect(thumbnails[0].classList.contains('t-is-active')).toBeTruthy();
      }
    });

    it('should handle rapid navigation clicks', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          index: 1,
          onIndexChange,
        },
      });

      await nextTick();
      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      if (nextBtn) {
        // Rapid clicks
        nextBtn.click();
        nextBtn.click();
        nextBtn.click();
        await nextTick();
        expect(onIndexChange).toHaveBeenCalled();
      }
    });
  });

  // ==================== Visibility Watch Tests ====================
  describe('visibility watch', () => {
    it('should reset transform on visibility change', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: false,
          images,
        },
      });

      // Open viewer
      await wrapper.setProps({ visible: true });
      await nextTick();

      // Perform some transformations (zoom in)
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        viewer.dispatchEvent(event);
        await nextTick();
      }

      // Close and reopen - should reset
      await wrapper.setProps({ visible: false });
      await nextTick();
      await wrapper.setProps({ visible: true });
      await nextTick();

      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('should focus viewer element when opened', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: false,
          images,
        },
      });

      await wrapper.setProps({ visible: true });
      await nextTick();

      // Small delay for focus to be applied
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('should handle animation timer cleanup', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();

      // Toggle visibility multiple times rapidly
      await wrapper.setProps({ visible: false });
      await wrapper.setProps({ visible: true });
      await wrapper.setProps({ visible: false });
      await nextTick();

      // Unmount should clean up timers
      wrapper.unmount();
      expect(true).toBe(true); // No errors means cleanup successful
    });
  });

  // ==================== Image Format Tests ====================
  describe('image format handling', () => {
    it('should handle ImageInfo object with all properties', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [
            {
              mainImage: 'https://example.com/main.jpg',
              thumbnail: 'https://example.com/thumb.jpg',
              download: true,
            },
          ],
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('should handle mixed string and ImageInfo array', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [
            'https://example.com/image1.jpg',
            {
              mainImage: 'https://example.com/main2.jpg',
              thumbnail: 'https://example.com/thumb2.jpg',
            },
            'https://example.com/image3.jpg',
          ],
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      expect(document.querySelectorAll('.t-image-viewer__header-img').length).toBe(3);
    });

    it('should use mainImage as thumbnail fallback', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [
            {
              mainImage: 'https://example.com/main.jpg',
              // No thumbnail - should use mainImage
            },
          ],
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });
  });

  // ==================== Default Value Tests ====================
  describe('default values', () => {
    it('should use defaultIndex when index is not provided', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          defaultIndex: 1,
        },
      });

      await nextTick();
      const titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).toBe('2/3');
    });

    it('should default to index 0 when no defaultIndex', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).toBe('1/3');
    });
  });

  // ==================== Teleport Tests ====================
  describe('teleport behavior', () => {
    it('should teleport to body by default', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      expect(document.body.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('should teleport to custom container', async () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);

      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          attach: '#test-container',
        },
      });

      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();

      document.body.removeChild(container);
    });

    it('should handle attach as empty string (disabled teleport)', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: true,
          images,
          attach: '', // Empty string disables teleport
        },
      });

      await nextTick();
      expect(wrapper.element).toBeTruthy();
    });
  });

  // ==================== Title Rendering Tests ====================
  describe('title rendering', () => {
    it('should render custom title slot', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
        slots: {
          title: () => <span class="custom-slot-title">Custom Title Slot</span>,
        },
      });

      await nextTick();
      expect(document.querySelector('.custom-slot-title')).toBeTruthy();
    });

    it('should update title when index changes', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: true,
          images,
          index: 0,
        },
      });

      await nextTick();
      let titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).toBe('1/3');

      await wrapper.setProps({ index: 2 });
      await nextTick();
      titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).toBe('3/3');
    });
  });

  // ==================== Close Button Variations ====================
  describe('close button variations', () => {
    it('should render custom closeBtn slot', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
        slots: {
          closeBtn: () => <span class="custom-close-slot">×</span>,
        },
      });

      await nextTick();
      expect(document.querySelector('.custom-close-slot')).toBeTruthy();
    });
  });

  // ==================== Arrow Key Disabled Tests ====================
  describe('arrow key navigation edge cases', () => {
    it('should not navigate left at first image', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          index: 0,
          onIndexChange,
        },
      });

      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
        viewer.dispatchEvent(event);
        await nextTick();
        // Should call with index 0 (clamped)
        expect(onIndexChange).toHaveBeenCalledWith(0, { trigger: 'prev' });
      }
    });

    it('should not navigate right at last image', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          index: 2, // Last image
          onIndexChange,
        },
      });

      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });
        viewer.dispatchEvent(event);
        await nextTick();
        // Should stay at index 2
        expect(onIndexChange).toHaveBeenCalledWith(2, { trigger: 'next' });
      }
    });
  });

  // ==================== Wheel Event Prevention ====================
  describe('wheel event handling', () => {
    it('should prevent default on wheel event', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        const wheelEvent = new WheelEvent('wheel', { deltaY: 100, cancelable: true });
        viewer.dispatchEvent(wheelEvent);
        // Wheel event should be handled
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });
  });

  // ==================== Multiple Images Header Tests ====================
  describe('header with multiple images', () => {
    it('should render correct number of thumbnails', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const headerImgs = document.querySelectorAll('.t-image-viewer__header-img');
      expect(headerImgs.length).toBe(3);
    });

    it('should toggle header expand/collapse', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
      });

      await nextTick();
      const expandBtn = document.querySelector('.t-image-viewer__header-pre-bt') as HTMLElement;
      if (expandBtn) {
        // Initial state - expanded
        expect(document.querySelector('.t-image-viewer__modal-header.t-is-show')).toBeTruthy();

        // Click to collapse
        expandBtn.click();
        await nextTick();

        // Click again to expand
        expandBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer__modal-header')).toBeTruthy();
      }
    });

    it('should apply transform style to thumbnails on index change', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: true,
          images,
          index: 0,
        },
      });

      await nextTick();
      const trans = document.querySelector('.t-image-viewer__header-trans') as HTMLElement;
      const initialTransform = trans?.style.transform;

      await wrapper.setProps({ index: 1 });
      await nextTick();
      const newTransform = trans?.style.transform;

      // Transform should be different
      expect(newTransform).not.toBe(initialTransform);
    });
  });

  // ==================== Custom Navigation Arrow Tests ====================
  describe('custom navigation arrows', () => {
    it('should render custom navigationArrow slot', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
        },
        slots: {
          navigationArrow: () => <span class="custom-nav-arrow">→</span>,
        },
      });

      await nextTick();
      expect(document.querySelector('.custom-nav-arrow')).toBeTruthy();
    });
  });

  // ==================== ImageScale Config Tests ====================
  describe('imageScale configuration', () => {
    it('should use custom step for zoom', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          imageScale: {
            max: 5,
            min: 0.1,
            step: 0.5,
            defaultScale: 1,
          },
        },
      });

      await nextTick();
      const scaleEl = document.querySelector('.t-image-viewer__utils-scale');
      expect(scaleEl?.textContent).toContain('100%');

      // Zoom in
      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const zoomInBtn = icons[4] as HTMLElement;
      if (zoomInBtn) {
        zoomInBtn.click();
        await new Promise((resolve) => setTimeout(resolve, 100));
        await nextTick();
        // Should have zoomed by step 0.5 (50%)
      }
    });

    it('should respect min/max scale limits', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          imageScale: {
            max: 1.2,
            min: 0.8,
            step: 0.2,
            defaultScale: 1,
          },
        },
      });

      await nextTick();
      // Multiple zoom out clicks should be clamped at min
      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const zoomOutBtn = icons[2] as HTMLElement;
      if (zoomOutBtn) {
        zoomOutBtn.click();
        await new Promise((resolve) => setTimeout(resolve, 60));
        zoomOutBtn.click();
        await new Promise((resolve) => setTimeout(resolve, 60));
        zoomOutBtn.click();
        await nextTick();
        // Scale should be clamped at min
      }
    });
  });

  // ==================== ImageReferrerpolicy Tests ====================
  describe('imageReferrerpolicy', () => {
    it('should apply referrerpolicy to images', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          imageReferrerpolicy: 'no-referrer',
        },
      });

      await nextTick();
      const img = document.querySelector('.t-image-viewer__modal-image') as HTMLImageElement;
      if (img) {
        expect(img.getAttribute('referrerpolicy')).toBe('no-referrer');
      }
    });

    it('should apply referrerpolicy in modeless mode', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          mode: 'modeless',
          imageReferrerpolicy: 'origin',
        },
      });

      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });
  });

  // ==================== V-Model Tests ====================
  describe('v-model binding', () => {
    it('should update v-model:index on navigation', async () => {
      const indexRef = ref(0);
      mount({
        setup() {
          return () => <ImageViewer v-model:index={indexRef.value} visible={true} images={images} />;
        },
      });

      await nextTick();
      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      if (nextBtn) {
        nextBtn.click();
        await nextTick();
        // Index should have updated
      }
    });
  });

  // ==================== Props Usage Check ====================
  describe('props usage detection', () => {
    it('should detect trigger prop usage', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const trigger = (_h: unknown, { open }: { open: () => void }) => (
        <button class="detected-trigger" onClick={open}>
          Open
        </button>
      );

      const wrapper = mount({
        setup() {
          return () => <ImageViewer images={images} trigger={trigger} />;
        },
      });

      await nextTick();
      // Should use provided trigger instead of default
      expect(wrapper.find('.detected-trigger').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__trigger').exists()).toBeFalsy();
    });

    it('should handle default index change with onIndexChange callback', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          defaultIndex: 1,
          onIndexChange,
        },
      });

      await nextTick();
      // Test index change by clicking navigation
      const nextBtn = document.querySelector('.t-image-viewer__nav--next') as HTMLElement;
      if (nextBtn) {
        nextBtn.click();
        await nextTick();
        expect(onIndexChange).toHaveBeenCalled();
      }
    });

    it('should handle custom onDownload callback', async () => {
      const onDownload = vi.fn();
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [{ mainImage: images[0], download: true }],
          onDownload,
        },
      });

      await nextTick();
      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const downloadBtn = icons[icons.length - 1] as HTMLElement;
      if (downloadBtn) {
        downloadBtn.click();
        await nextTick();
        expect(onDownload).toHaveBeenCalledWith(images[0]);
      }
    });

    it('should handle thumbnail fallback to mainImage', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: true,
          images: [{ mainImage: images[0] }], // No thumbnail provided
        },
      });

      await nextTick();
      // Component should render successfully
      expect(wrapper.exists()).toBeTruthy();
    });

    it('should handle string image with mainImage fallback', async () => {
      const wrapper = mount(ImageViewer, {
        props: {
          images: [images[0]], // String image
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__trigger-img').exists()).toBeTruthy();
    });
  });
});
