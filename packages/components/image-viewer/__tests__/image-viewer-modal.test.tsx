import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
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
    let wrapper: VueWrapper;

    beforeEach(async () => {
      wrapper = mount(ImageViewerModal, { props: { ...defaultProps } });
      await nextTick();
    });

    it(':visible = true', () => {
      expect(document.querySelector('.t-dialog')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__dialog')).toBeTruthy();
    });

    it(':visible = false', async () => {
      document.body.innerHTML = '';
      const w = mount(ImageViewerModal, {
        props: { ...defaultProps, visible: false },
      });
      await nextTick();
      const dialog = document.querySelector('.t-image-viewer__dialog') as HTMLElement;
      if (dialog) {
        expect(dialog.style.display).eq('none');
      }
      w.unmount();
    });

    it(':zIndex[number]', async () => {
      await wrapper.setProps({ zIndex: 5000 });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':currentImage renders ImageItem', () => {
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__modal-pic')).toBeTruthy();
    });

    it(':currentImage renders ImageViewerUtils in footer', () => {
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
      await wrapper.setProps({
        index: 1,
        scale: 1.5,
        rotate: 90,
        mirror: -1,
        currentImage: customImageInfo,
        imageReferrerpolicy: 'no-referrer',
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });

    it(':title[string]', async () => {
      await wrapper.setProps({ title: 'Custom Modal Title' });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':title[function]', async () => {
      const titleFn = () => <span class="custom-title">Function Title</span>;
      await wrapper.setProps({ title: titleFn });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':viewerScale custom minWidth and minHeight', async () => {
      await wrapper.setProps({ viewerScale: { minWidth: 800, minHeight: 600 } });
      await nextTick();
      const content = document.querySelector('.t-image-viewer-mini__content') as HTMLElement;
      expect(content).toBeTruthy();
      expect(content.style.minWidth).eq('800');
      expect(content.style.minHeight).eq('600');
    });

    it(':viewerScale empty object', async () => {
      await wrapper.setProps({ viewerScale: {} });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });

    it(':draggable = false', async () => {
      await wrapper.setProps({ draggable: false });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':showOverlay = false', async () => {
      await wrapper.setProps({ showOverlay: false });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':closeBtn[function]', async () => {
      const customCloseBtn = () => <span class="custom-close">×</span>;
      await wrapper.setProps({ closeBtn: customCloseBtn });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':closeBtn = false', async () => {
      await wrapper.setProps({ closeBtn: false });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':scale display percentage', async () => {
      await wrapper.setProps({ scale: 1.5 });
      await nextTick();
      const scaleEl = document.querySelector('.t-image-viewer__utils-scale');
      expect(scaleEl).toBeTruthy();
      expect(scaleEl?.textContent).toContain('150%');
    });

    it(':scale display updates on change', async () => {
      let scaleEl = document.querySelector('.t-image-viewer__utils-scale');
      expect(scaleEl?.textContent).toContain('100%');

      await wrapper.setProps({ scale: 2 });
      await nextTick();
      scaleEl = document.querySelector('.t-image-viewer__utils-scale');
      expect(scaleEl?.textContent).toContain('200%');
    });

    it(':imageReferrerpolicy[string]', async () => {
      await wrapper.setProps({ imageReferrerpolicy: 'no-referrer' });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });

    it('dialog class', () => {
      expect(document.querySelector('.t-image-viewer__dialog')).toBeTruthy();
    });
  });

  describe('events', () => {
    it('close', async () => {
      const onClose = vi.fn();
      mount(ImageViewerModal, {
        props: { ...defaultProps, onClose },
      });
      await nextTick();

      const closeBtn = document.querySelector('.t-dialog__close') as HTMLElement;
      expect(closeBtn).toBeTruthy();
      closeBtn.click();
      await nextTick();
      expect(onClose).toHaveBeenCalled();
    });

    it('rotate', async () => {
      const onRotate = vi.fn();
      mount(ImageViewerModal, {
        props: { ...defaultProps, onRotate },
      });
      await nextTick();

      const rotateBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[1] as HTMLElement;
      expect(rotateBtn).toBeTruthy();
      rotateBtn.click();
      await nextTick();
      expect(onRotate).toHaveBeenCalled();
    });

    it('zoomIn', async () => {
      const onZoomIn = vi.fn();
      mount(ImageViewerModal, {
        props: { ...defaultProps, onZoomIn },
      });
      await nextTick();

      const zoomInBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[4] as HTMLElement;
      expect(zoomInBtn).toBeTruthy();
      zoomInBtn.click();
      await nextTick();
      expect(onZoomIn).toHaveBeenCalled();
    });

    it('zoomOut', async () => {
      const onZoomOut = vi.fn();
      mount(ImageViewerModal, {
        props: { ...defaultProps, onZoomOut },
      });
      await nextTick();

      const zoomOutBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[2] as HTMLElement;
      expect(zoomOutBtn).toBeTruthy();
      zoomOutBtn.click();
      await nextTick();
      expect(onZoomOut).toHaveBeenCalled();
    });

    it('mirror', async () => {
      const onMirror = vi.fn();
      mount(ImageViewerModal, {
        props: { ...defaultProps, onMirror },
      });
      await nextTick();

      const mirrorBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[0] as HTMLElement;
      expect(mirrorBtn).toBeTruthy();
      mirrorBtn.click();
      await nextTick();
      expect(onMirror).toHaveBeenCalled();
    });

    it('reset', async () => {
      const onReset = vi.fn();
      mount(ImageViewerModal, {
        props: { ...defaultProps, onReset },
      });
      await nextTick();

      const resetBtns = document.querySelectorAll('.t-image-viewer__modal-icon');
      const resetBtn = resetBtns[resetBtns.length - 1] as HTMLElement;
      expect(resetBtn).toBeTruthy();
      resetBtn.click();
      await nextTick();
      expect(document.querySelector('.t-image-viewer-mini__footer')).toBeTruthy();
    });

    it('download', async () => {
      const onDownload = vi.fn();
      const downloadableImage = { ...mockImageInfo, download: true };
      mount(ImageViewerModal, {
        props: { ...defaultProps, currentImage: downloadableImage, onDownload },
      });
      await nextTick();

      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const downloadBtn = icons[icons.length - 1] as HTMLElement;
      expect(downloadBtn).toBeTruthy();
      downloadBtn.click();
      await nextTick();
      expect(onDownload).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('empty currentImage object', async () => {
      mount(ImageViewerModal, {
        props: { ...defaultProps, currentImage: {} },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it('visibility toggle', async () => {
      const wrapper = mount(ImageViewerModal, {
        props: { ...defaultProps, visible: false },
      });
      await nextTick();

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it('rapid prop changes', async () => {
      const wrapper = mount(ImageViewerModal, {
        props: { ...defaultProps },
      });
      await nextTick();

      await wrapper.setProps({ scale: 1.5 });
      await wrapper.setProps({ rotate: 90 });
      await wrapper.setProps({ mirror: -1 });
      await wrapper.setProps({ scale: 2 });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });
  });
});
