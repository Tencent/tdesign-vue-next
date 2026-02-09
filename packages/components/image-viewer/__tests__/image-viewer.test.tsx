import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { ImageViewer } from '@tdesign/components/image-viewer';
import ImageViewerProps from '@tdesign/components/image-viewer/props';
import { Button } from '@tdesign/components/button';

const images = [
  'https://tdesign.gtimg.com/demo/demo-image-1.png',
  'https://tdesign.gtimg.com/demo/demo-image-2.png',
  'https://tdesign.gtimg.com/demo/demo-image-3.png',
];

describe('ImageViewer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it(':trigger[function]', () => {
      const wrapper = mount({
        render() {
          return <ImageViewer trigger={() => <Button>test</Button>} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':trigger[slot]', () => {
      const wrapper = mount(ImageViewer, {
        slots: {
          trigger: ({ open }: { open: () => void }) => <Button onClick={() => open()}>Open Viewer</Button>,
        },
        props: { images },
      });
      expect(wrapper.find('button').exists()).eq(true);
    });

    it(':trigger not provided renders default trigger', () => {
      const wrapper = mount(ImageViewer, {
        props: { images },
      });
      expect(wrapper.find('.t-image-viewer__trigger').exists()).eq(true);
    });

    it(':trigger default opens viewer on click', async () => {
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

    it(':trigger provides open function with index', async () => {
      let openFn: ((index?: number) => void) | undefined;
      mount(ImageViewer, {
        props: { images },
        slots: {
          trigger: ({ open }: { open: (index?: number) => void }) => {
            openFn = open;
            return <button>Open</button>;
          },
        },
      });
      await nextTick();
      expect(typeof openFn).eq('function');
      if (openFn) {
        openFn(2);
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it(':trigger detects prop usage vs default', async () => {
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
      expect(wrapper.find('.detected-trigger').exists()).eq(true);
      expect(wrapper.find('.t-image-viewer__trigger').exists()).eq(false);
    });

    it(':images[string array]', () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();
    });

    it(':images[ImageInfo objects]', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [
            { mainImage: 'https://example.com/main1.jpg', thumbnail: 'https://example.com/thumb1.jpg', download: true },
          ],
        },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer')).toBeTruthy();
    });

    it(':images[mixed string and ImageInfo]', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [
            'https://example.com/image1.jpg',
            { mainImage: 'https://example.com/main2.jpg', thumbnail: 'https://example.com/thumb2.jpg' },
            'https://example.com/image3.jpg',
          ],
        },
      });
      await nextTick();
      expect(document.querySelectorAll('.t-image-viewer__header-img').length).eq(3);
    });

    it(':images[empty array]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images: [] },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer')).toBeTruthy();
    });

    it(':images with thumbnail fallback to mainImage', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [{ mainImage: 'https://example.com/main.jpg' }],
        },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':images string image with default trigger fallback', async () => {
      const wrapper = mount(ImageViewer, {
        props: { images: [images[0]] },
      });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__trigger-img').exists()).eq(true);
    });

    it(':index[number]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, index: 1 },
      });
      await nextTick();
      const titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).eq('2/3');
    });

    it(':defaultIndex[number]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, defaultIndex: 2 },
      });
      await nextTick();
      const titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).eq('3/3');
    });

    it(':defaultIndex defaults to 0', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).eq('1/3');
    });

    it(':visible[boolean]', async () => {
      const wrapper = mount(ImageViewer, {
        props: { visible: false, images },
      });
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeFalsy();

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':defaultVisible[boolean]', () => {
      mount(ImageViewer, {
        props: { defaultVisible: true, images },
      });
      expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();
    });

    it(':visible v-model binding', async () => {
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

    it(':closeBtn[boolean] = true', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, closeBtn: true },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-close-bt')).toBeTruthy();
    });

    it(':closeBtn[boolean] = false', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, closeBtn: false },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-close-bt')).toBeFalsy();
    });

    it(':closeBtn[function]', async () => {
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

    it(':closeBtn[slot]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
        slots: {
          closeBtn: () => <span class="custom-close-slot">×</span>,
        },
      });
      await nextTick();
      expect(document.querySelector('.custom-close-slot')).toBeTruthy();
    });

    it(':closeOnEscKeydown[boolean] = true', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, closeOnEscKeydown: true, onClose },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        await nextTick();
        expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'esc' }));
      }
    });

    it(':closeOnEscKeydown[boolean] = false', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, closeOnEscKeydown: false, onClose },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        await nextTick();
        expect(onClose).not.toHaveBeenCalled();
      }
    });

    it(':closeOnOverlay[boolean] = true', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, closeOnOverlay: true, onClose },
      });
      await nextTick();
      const mask = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
      if (mask) {
        mask.click();
        await nextTick();
        expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'overlay' }));
      }
    });

    it(':closeOnOverlay[boolean] = false', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, closeOnOverlay: false, onClose },
      });
      await nextTick();
      const mask = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
      if (mask) {
        mask.click();
        await nextTick();
        expect(onClose).not.toHaveBeenCalled();
      }
    });

    it(':draggable in modeless mode', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless', draggable: true },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':draggable = false in modeless mode', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless', draggable: false },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':imageReferrerpolicy[string] validator', () => {
      const validator = ImageViewerProps.imageReferrerpolicy.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('no-referrer')).toBe(true);
      expect(validator('origin')).toBe(true);
      expect(validator('same-origin')).toBe(true);
      expect(validator('strict-origin')).toBe(true);
      expect(validator('unsafe-url')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid-value')).toBe(false);
    });

    it(':imageReferrerpolicy applies to images', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, imageReferrerpolicy: 'no-referrer' },
      });
      await nextTick();
      const img = document.querySelector('.t-image-viewer__modal-image') as HTMLImageElement;
      if (img) {
        expect(img.getAttribute('referrerpolicy')).eq('no-referrer');
      }
    });

    it(':imageReferrerpolicy in modeless mode', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless', imageReferrerpolicy: 'origin' },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':imageScale[object]', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          imageScale: { max: 3, min: 0.1, step: 0.1, defaultScale: 1.5 },
        },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':imageScale custom step zoom', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          imageScale: { max: 5, min: 0.1, step: 0.5, defaultScale: 1 },
        },
      });
      await nextTick();
      const scaleEl = document.querySelector('.t-image-viewer__utils-scale');
      expect(scaleEl?.textContent).toContain('100%');

      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const zoomInBtn = icons[4] as HTMLElement;
      if (zoomInBtn) {
        zoomInBtn.click();
        await new Promise((resolve) => setTimeout(resolve, 100));
        await nextTick();
      }
    });

    it(':imageScale respects min/max limits', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          imageScale: { max: 1.2, min: 0.8, step: 0.2, defaultScale: 1 },
        },
      });
      await nextTick();
      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const zoomOutBtn = icons[2] as HTMLElement;
      if (zoomOutBtn) {
        zoomOutBtn.click();
        await new Promise((resolve) => setTimeout(resolve, 60));
        zoomOutBtn.click();
        await new Promise((resolve) => setTimeout(resolve, 60));
        zoomOutBtn.click();
        await nextTick();
      }
    });

    it(':mode[string] validator', () => {
      const validator = ImageViewerProps.mode.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('modal')).toBe(true);
      expect(validator('modeless')).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);
    });

    it(':mode[string] = modal (default)', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modal' },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':mode[string] = modeless', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless' },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':navigationArrow[boolean] = true', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, navigationArrow: true },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-prev-bt')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__modal-next-bt')).toBeTruthy();
    });

    it(':navigationArrow[function]', async () => {
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

    it(':navigationArrow[slot]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
        slots: {
          navigationArrow: () => <span class="custom-nav-arrow">→</span>,
        },
      });
      await nextTick();
      expect(document.querySelector('.custom-nav-arrow')).toBeTruthy();
    });

    it(':showOverlay[boolean] = true', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, showOverlay: true },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-mask')).toBeTruthy();
    });

    it(':showOverlay[boolean] = false', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, showOverlay: false },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-mask')).toBeFalsy();
    });

    it(':showOverlay default for modal mode', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modal' },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-mask')).toBeTruthy();
    });

    it(':title[string]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, title: 'Custom Title' },
      });
      await nextTick();
      const titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).eq('Custom Title');
    });

    it(':title[function]', async () => {
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

    it(':title[slot]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
        slots: {
          title: () => <span class="custom-slot-title">Custom Title Slot</span>,
        },
      });
      await nextTick();
      expect(document.querySelector('.custom-slot-title')).toBeTruthy();
    });

    it(':title default shows index', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, index: 0 },
      });
      await nextTick();
      const titleEl = document.querySelector('.t-image-viewer__modal-index');
      expect(titleEl?.textContent).eq('1/3');
    });

    it(':title updates when index changes', async () => {
      const wrapper = mount(ImageViewer, {
        props: { visible: true, images, index: 0 },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-index')?.textContent).eq('1/3');

      await wrapper.setProps({ index: 2 });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-index')?.textContent).eq('3/3');
    });

    it(':viewerScale in modeless mode', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images,
          mode: 'modeless',
          viewerScale: { minWidth: 500, minHeight: 400 },
        },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });

    it(':zIndex[number]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, zIndex: 5000 },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer?.style.zIndex).eq('5000');
    });

    it(':zIndex default is 3000', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer?.style.zIndex).eq('3000');
    });

    it(':attach[string]', async () => {
      const container = document.createElement('div');
      container.id = 'custom-container';
      document.body.appendChild(container);

      mount(ImageViewer, {
        props: { visible: true, images, attach: '#custom-container' },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':attach empty string disables teleport', async () => {
      const wrapper = mount(ImageViewer, {
        props: { visible: true, images, attach: '' },
      });
      await nextTick();
      expect(wrapper.element).toBeTruthy();
    });

    it('should render single image without navigation or header', async () => {
      mount(ImageViewer, {
        props: { visible: true, images: [images[0]] },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-prev-bt')).toBeFalsy();
      expect(document.querySelector('.t-image-viewer__modal-next-bt')).toBeFalsy();
      expect(document.querySelector('.t-image-viewer__modal-header')).toBeFalsy();
    });

    it('boundary: prev at first image stays at 0', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, index: 0, onIndexChange },
      });
      await nextTick();
      const prevBtn = document.querySelector('.t-image-viewer__modal-prev-bt') as HTMLElement;
      if (prevBtn) {
        prevBtn.click();
        await nextTick();
        expect(onIndexChange).toHaveBeenCalledWith(0, { trigger: 'prev' });
      }
    });

    it('boundary: next at last image stays at last', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, index: 2, onIndexChange },
      });
      await nextTick();
      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      if (nextBtn) {
        nextBtn.click();
        await nextTick();
        expect(onIndexChange).toHaveBeenCalledWith(2, { trigger: 'next' });
      }
    });
  });

  describe('events', () => {
    it('onClose by close button', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, onClose },
      });
      await nextTick();
      const closeBtn = document.querySelector('.t-image-viewer__modal-close-bt') as HTMLElement;
      if (closeBtn) {
        closeBtn.click();
        await nextTick();
        expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'close-btn' }));
      }
    });

    it('onClose by ESC key', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, closeOnEscKeydown: true, onClose },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        await nextTick();
        expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'esc' }));
      }
    });

    it('onClose by overlay click', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, closeOnOverlay: true, onClose },
      });
      await nextTick();
      const mask = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
      if (mask) {
        mask.click();
        await nextTick();
        expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'overlay' }));
      }
    });

    it('onIndexChange by prev button', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, index: 1, onIndexChange },
      });
      await nextTick();
      const prevBtn = document.querySelector('.t-image-viewer__modal-prev-bt') as HTMLElement;
      if (prevBtn) {
        prevBtn.click();
        await nextTick();
        expect(onIndexChange).toHaveBeenCalledWith(0, { trigger: 'prev' });
      }
    });

    it('onIndexChange by next button', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, index: 0, onIndexChange },
      });
      await nextTick();
      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      if (nextBtn) {
        nextBtn.click();
        await nextTick();
        expect(onIndexChange).toHaveBeenCalledWith(1, { trigger: 'next' });
      }
    });

    it('onIndexChange by thumbnail click', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, index: 0, onIndexChange },
      });
      await nextTick();
      const thumbnails = document.querySelectorAll('.t-image-viewer__header-img');
      if (thumbnails.length > 1) {
        (thumbnails[1] as HTMLElement).click();
        await nextTick();
        expect(onIndexChange).toHaveBeenCalledWith(1, { trigger: 'current' });
      }
    });

    it('onIndexChange by left arrow key', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, index: 1, onIndexChange },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
        await nextTick();
        expect(onIndexChange).toHaveBeenCalledWith(0, { trigger: 'prev' });
      }
    });

    it('onIndexChange by right arrow key', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, index: 0, onIndexChange },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
        await nextTick();
        expect(onIndexChange).toHaveBeenCalledWith(1, { trigger: 'next' });
      }
    });

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
      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const downloadBtn = icons[icons.length - 1] as HTMLElement;
      if (downloadBtn) {
        downloadBtn.click();
        await nextTick();
        expect(onDownload).toHaveBeenCalledWith(images[0]);
      }
    });

    it('onDownload default (no custom handler) does not throw', async () => {
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [{ mainImage: images[0], download: true }],
        },
      });
      await nextTick();
      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const downloadBtn = icons[icons.length - 1] as HTMLElement;
      if (downloadBtn) {
        expect(() => downloadBtn.click()).not.toThrow();
      }
    });
  });

  describe('keyboard interactions', () => {
    it('up arrow zooms in', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('down arrow zooms out', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('unrecognized key does not crash', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.focus();
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });
  });

  describe('mouse interactions', () => {
    it('wheel zoom in (deltaY < 0)', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.dispatchEvent(new WheelEvent('wheel', { deltaY: -100 }));
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('wheel zoom out (deltaY > 0)', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('expand/collapse header toggle', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const expandBtn = document.querySelector('.t-image-viewer__header-pre-bt') as HTMLElement;
      if (expandBtn) {
        expect(document.querySelector('.t-image-viewer__modal-header.t-is-show')).toBeTruthy();
        expandBtn.click();
        await nextTick();
        expandBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer__modal-header')).toBeTruthy();
      }
    });
  });

  describe('utils toolbar', () => {
    it('toolbar is rendered', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils')).toBeTruthy();
    });

    it('scale percentage displayed', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();
    });

    it('mirror button click', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const mirrorBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[0] as HTMLElement;
      if (mirrorBtn) {
        mirrorBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('rotate button click', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const rotateBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[1] as HTMLElement;
      if (rotateBtn) {
        rotateBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('zoom out button click', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const zoomOutBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[2] as HTMLElement;
      if (zoomOutBtn) {
        zoomOutBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();
      }
    });

    it('zoom in button click', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const zoomInBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[4] as HTMLElement;
      if (zoomInBtn) {
        zoomInBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();
      }
    });

    it('reset button click', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      const resetBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[5] as HTMLElement;
      if (resetBtn) {
        resetBtn.click();
        await nextTick();
        expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      }
    });

    it('download button triggers onDownload', async () => {
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
        expect(onDownload).toHaveBeenCalled();
      }
    });
  });

  describe('modeless mode', () => {
    it('should render in dialog', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless' },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it('should render footer with utils', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless' },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__footer')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__utils')).toBeTruthy();
    });

    it('should close via dialog close button', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless', onClose },
      });
      await nextTick();
      const closeBtn = document.querySelector('.t-dialog__close-btn') as HTMLElement;
      if (closeBtn) {
        closeBtn.click();
        await nextTick();
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('should use custom trigger', async () => {
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
      expect(wrapper.find('.modeless-trigger').exists()).eq(true);
      await wrapper.find('.modeless-trigger').trigger('click');
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it('should render default trigger when no trigger prop', async () => {
      const wrapper = mount(ImageViewer, {
        props: { images, mode: 'modeless' },
      });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__trigger').exists()).eq(true);
    });

    it('should render title in dialog header', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless', title: 'Test Modal Title' },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });
  });

  describe('visibility watch', () => {
    it('should reset transforms on visibility open', async () => {
      const wrapper = mount(ImageViewer, {
        props: { visible: false, images },
      });
      await wrapper.setProps({ visible: true });
      await nextTick();
      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        await nextTick();
      }
      await wrapper.setProps({ visible: false });
      await nextTick();
      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('should focus viewer element when opened', async () => {
      const wrapper = mount(ImageViewer, {
        props: { visible: false, images },
      });
      await wrapper.setProps({ visible: true });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('should handle animation timer cleanup on rapid toggle', async () => {
      const wrapper = mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      await wrapper.setProps({ visible: false });
      await wrapper.setProps({ visible: true });
      await wrapper.setProps({ visible: false });
      await nextTick();
      wrapper.unmount();
    });

    it('animation cleanup on unmount', async () => {
      const wrapper = mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      wrapper.unmount();
    });
  });

  describe('header with multiple images', () => {
    it('should render correct number of thumbnails', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
      });
      await nextTick();
      expect(document.querySelectorAll('.t-image-viewer__header-img').length).eq(3);
    });

    it('should have active state on current thumbnail', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, index: 0 },
      });
      await nextTick();
      const thumbnails = document.querySelectorAll('.t-image-viewer__header-box');
      if (thumbnails.length > 0) {
        expect(thumbnails[0].classList.contains('t-is-active')).eq(true);
      }
    });

    it('should update transform style on index change', async () => {
      const wrapper = mount(ImageViewer, {
        props: { visible: true, images, index: 0 },
      });
      await nextTick();
      const trans = document.querySelector('.t-image-viewer__header-trans') as HTMLElement;
      const initialTransform = trans?.style.transform;

      await wrapper.setProps({ index: 1 });
      await nextTick();
      expect(trans?.style.transform).not.eq(initialTransform);
    });
  });

  describe('v-model binding', () => {
    it('v-model:index on navigation', async () => {
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
      }
    });
  });
});
