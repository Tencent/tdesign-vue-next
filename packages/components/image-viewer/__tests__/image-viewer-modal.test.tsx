import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { nextTick } from 'vue';
import ImageViewerModal from '../base/ImageViewerModal';

const testImages = [
  'https://tdesign.gtimg.com/demo/demo-image-1.png',
  'https://tdesign.gtimg.com/demo/demo-image-2.png',
  'https://tdesign.gtimg.com/demo/demo-image-3.png',
];

const mockImageInfo = {
  mainImage: testImages[0],
  thumbnail: 'https://tdesign.gtimg.com/demo/demo-thumb-1.png',
  download: false,
  isSvg: false,
};

const defaultProps = {
  visible: true,
  images: testImages,
  index: 0,
  scale: 1,
  rotate: 0,
  mirror: 1,
  currentImage: mockImageInfo,
  zIndex: 3000,
  showOverlay: true,
};

describe('ImageViewerModal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it(':visible[boolean]', async () => {
      // true
      mount(ImageViewerModal, { props: { ...defaultProps } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__dialog')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__dialog')).toMatchSnapshot();

      document.body.innerHTML = '';

      // false
      mount(ImageViewerModal, { props: { ...defaultProps, visible: false } });
      await nextTick();
      const dialog = document.querySelector('.t-image-viewer__dialog') as HTMLElement;
      if (dialog) {
        expect(dialog.style.display).toBe('none');
      }
    });

    it(':zIndex[number]', async () => {
      mount(ImageViewerModal, { props: { ...defaultProps, zIndex: 5000 } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':currentImage renders content', async () => {
      mount(ImageViewerModal, { props: { ...defaultProps } });
      await nextTick();

      // ImageItem
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__modal-pic')).toBeTruthy();

      // ImageViewerUtils in footer
      expect(document.querySelector('.t-image-viewer-mini__footer')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__utils')).toBeTruthy();
    });

    it(':currentImage with custom props', async () => {
      const customImageInfo = {
        mainImage: testImages[1],
        thumbnail: 'https://tdesign.gtimg.com/demo/demo-thumb-2.png',
        download: true,
        isSvg: true,
      };
      mount(ImageViewerModal, {
        props: {
          ...defaultProps,
          index: 1,
          scale: 1.5,
          rotate: 90,
          mirror: -1,
          currentImage: customImageInfo,
          imageReferrerpolicy: 'no-referrer',
        },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });

    it(':title[string/function]', async () => {
      // string
      mount(ImageViewerModal, { props: { ...defaultProps, title: 'Custom Modal Title' } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();

      document.body.innerHTML = '';

      // function
      const titleFn = () => <span class="custom-title">Function Title</span>;
      mount(ImageViewerModal, { props: { ...defaultProps, title: titleFn } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':viewerScale[object]', async () => {
      // custom minWidth and minHeight
      mount(ImageViewerModal, {
        props: { ...defaultProps, viewerScale: { minWidth: 800, minHeight: 600 } },
      });
      await nextTick();
      const content = document.querySelector('.t-image-viewer-mini__content') as HTMLElement;
      expect(content).toBeTruthy();
      expect(content.style.minWidth).toBe('800');
      expect(content.style.minHeight).toBe('600');

      document.body.innerHTML = '';

      // empty object
      // @ts-expect-error testing empty viewerScale
      mount(ImageViewerModal, { props: { ...defaultProps, viewerScale: {} } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });

    it(':draggable[boolean]', async () => {
      mount(ImageViewerModal, { props: { ...defaultProps, draggable: false } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':showOverlay[boolean]', async () => {
      mount(ImageViewerModal, { props: { ...defaultProps, showOverlay: false } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':closeBtn[boolean/function]', async () => {
      // function
      const customCloseBtn = () => <span class="custom-close">x</span>;
      mount(ImageViewerModal, { props: { ...defaultProps, closeBtn: customCloseBtn } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();

      document.body.innerHTML = '';

      // false
      mount(ImageViewerModal, { props: { ...defaultProps, closeBtn: false } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':scale display percentage', async () => {
      // 100%
      mount(ImageViewerModal, { props: { ...defaultProps, scale: 1 } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils-scale')?.textContent).toContain('100%');

      document.body.innerHTML = '';

      // 150%
      mount(ImageViewerModal, { props: { ...defaultProps, scale: 1.5 } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils-scale')?.textContent).toContain('150%');

      document.body.innerHTML = '';

      // 200%
      mount(ImageViewerModal, { props: { ...defaultProps, scale: 2 } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils-scale')?.textContent).toContain('200%');
    });

    it(':imageReferrerpolicy[string]', async () => {
      mount(ImageViewerModal, { props: { ...defaultProps, imageReferrerpolicy: 'no-referrer' } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });
  });

  describe('events', () => {
    it('close', async () => {
      const onClose = vi.fn();
      mount(ImageViewerModal, { props: { ...defaultProps, onClose } });
      await nextTick();

      const closeBtn = document.querySelector('.t-dialog__close') as HTMLElement;
      expect(closeBtn).toBeTruthy();
      closeBtn.click();
      await nextTick();
      expect(onClose).toHaveBeenCalled();
    });

    it('rotate', async () => {
      const onRotate = vi.fn();
      mount(ImageViewerModal, { props: { ...defaultProps, onRotate } });
      await nextTick();

      const rotateBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[1] as HTMLElement;
      expect(rotateBtn).toBeTruthy();
      rotateBtn.click();
      await nextTick();
      expect(onRotate).toHaveBeenCalled();
    });

    it('zoomIn', async () => {
      const onZoomIn = vi.fn();
      mount(ImageViewerModal, { props: { ...defaultProps, onZoomIn } });
      await nextTick();

      const zoomInBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[4] as HTMLElement;
      expect(zoomInBtn).toBeTruthy();
      zoomInBtn.click();
      await nextTick();
      expect(onZoomIn).toHaveBeenCalled();
    });

    it('zoomOut', async () => {
      const onZoomOut = vi.fn();
      mount(ImageViewerModal, { props: { ...defaultProps, onZoomOut } });
      await nextTick();

      const zoomOutBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[2] as HTMLElement;
      expect(zoomOutBtn).toBeTruthy();
      zoomOutBtn.click();
      await nextTick();
      expect(onZoomOut).toHaveBeenCalled();
    });

    it('mirror', async () => {
      const onMirror = vi.fn();
      mount(ImageViewerModal, { props: { ...defaultProps, onMirror } });
      await nextTick();

      const mirrorBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[0] as HTMLElement;
      expect(mirrorBtn).toBeTruthy();
      mirrorBtn.click();
      await nextTick();
      expect(onMirror).toHaveBeenCalled();
    });

    it('download', async () => {
      const onDownload = vi.fn();
      const downloadableImage = { ...mockImageInfo, download: true };
      mount(ImageViewerModal, { props: { ...defaultProps, currentImage: downloadableImage, onDownload } });
      await nextTick();

      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const downloadBtn = icons[icons.length - 1] as HTMLElement;
      expect(downloadBtn).toBeTruthy();
      downloadBtn.click();
      await nextTick();
      expect(onDownload).toHaveBeenCalled();
    });
  });
});
