import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { ImageIcon, ZoomInIcon, ZoomOutIcon, DownloadIcon, MirrorIcon, RotationIcon } from 'tdesign-icons-vue-next';
import ImageViewerUtils from '../base/ImageViewerUtils';

const mockImageInfo = {
  mainImage: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
  thumbnail: 'https://tdesign.gtimg.com/demo/demo-thumb-1.png',
  download: false,
  isSvg: false,
};

describe('ImageViewerUtils', () => {
  describe('props', () => {
    let wrapper: VueWrapper;

    beforeEach(async () => {
      wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, zIndex: 3000 },
      });
      await nextTick();
    });

    it(':scale[number] renders utils container', () => {
      expect(wrapper.find('.t-image-viewer__utils').exists()).eq(true);
      expect(wrapper.find('.t-image-viewer__utils-content').exists()).eq(true);
    });

    it(':scale[number] renders all basic toolbar icons', () => {
      const icons = wrapper.findAll('.t-image-viewer__modal-icon');
      expect(icons.length).toBeGreaterThanOrEqual(5);

      expect(wrapper.findComponent(MirrorIcon).exists()).eq(true);
      expect(wrapper.findComponent(RotationIcon).exists()).eq(true);
      expect(wrapper.findComponent(ZoomOutIcon).exists()).eq(true);
      expect(wrapper.findComponent(ZoomInIcon).exists()).eq(true);
      expect(wrapper.findComponent(ImageIcon).exists()).eq(true);
    });

    it(':scale[number] display percentage', async () => {
      await wrapper.setProps({ scale: 1.5 });
      await nextTick();
      const scaleEl = wrapper.find('.t-image-viewer__utils-scale');
      expect(scaleEl.exists()).eq(true);
      expect(scaleEl.text()).eq('150%');
    });

    it(':scale different values', async () => {
      const testCases = [
        { scale: 0.5, expected: '50%' },
        { scale: 1, expected: '100%' },
        { scale: 1.25, expected: '125%' },
        { scale: 2, expected: '200%' },
        { scale: 3.33, expected: '333%' },
      ];

      for (const testCase of testCases) {
        const w = mount(ImageViewerUtils, {
          props: { scale: testCase.scale, currentImage: mockImageInfo, zIndex: 3000 },
        });
        await nextTick();
        expect(w.find('.t-image-viewer__utils-scale').text()).eq(testCase.expected);
        w.unmount();
      }
    });

    it(':scale prop change', async () => {
      expect(wrapper.find('.t-image-viewer__utils-scale').text()).eq('100%');

      await wrapper.setProps({ scale: 1.5 });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils-scale').text()).eq('150%');

      await wrapper.setProps({ scale: 0.75 });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils-scale').text()).eq('75%');
    });

    it(':scale extreme values', async () => {
      await wrapper.setProps({ scale: 0.01 });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils-scale').text()).eq('1%');

      await wrapper.setProps({ scale: 10 });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils-scale').text()).eq('1000%');

      await wrapper.setProps({ scale: 0 });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils-scale').text()).eq('0%');

      await wrapper.setProps({ scale: -1 });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils-scale').text()).eq('-100%');
    });

    it(':currentImage download enabled', async () => {
      await wrapper.setProps({ currentImage: { ...mockImageInfo, download: true } });
      await nextTick();
      expect(wrapper.findComponent(DownloadIcon).exists()).eq(true);
    });

    it(':currentImage download disabled', () => {
      expect(wrapper.findComponent(DownloadIcon).exists()).eq(false);
    });

    it(':currentImage download toggle', async () => {
      expect(wrapper.findComponent(DownloadIcon).exists()).eq(false);

      await wrapper.setProps({ currentImage: { ...mockImageInfo, download: true } });
      await nextTick();
      expect(wrapper.findComponent(DownloadIcon).exists()).eq(true);

      await wrapper.setProps({ currentImage: mockImageInfo });
      await nextTick();
      expect(wrapper.findComponent(DownloadIcon).exists()).eq(false);
    });

    it(':currentImage[File]', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const onDownload = vi.fn();
      await wrapper.setProps({ currentImage: { mainImage: file, download: true }, onDownload });
      await nextTick();
      expect(wrapper.findComponent(DownloadIcon).exists()).eq(true);

      await wrapper.findComponent(DownloadIcon).trigger('click');
      expect(onDownload).toHaveBeenCalledWith(expect.any(String));
    });

    it(':currentImage empty object', async () => {
      await wrapper.setProps({ currentImage: {} });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils').exists()).eq(true);
      expect(wrapper.findComponent(DownloadIcon).exists()).eq(false);
    });

    it(':currentImage null mainImage', async () => {
      await wrapper.setProps({ currentImage: { mainImage: null } });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils').exists()).eq(true);
    });

    it(':zIndex[number]', async () => {
      await wrapper.setProps({ zIndex: 5000 });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__utils').exists()).eq(true);
    });

    it(':zIndex undefined', async () => {
      const w = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo },
      });
      await nextTick();
      expect(w.find('.t-image-viewer__utils').exists()).eq(true);
    });

    it('icon arrangement order', () => {
      const utils = wrapper.find('.t-image-viewer__utils-content');
      const children = utils.element.children;
      expect(children.length).toBeGreaterThanOrEqual(5);
    });

    it('download button at end when enabled', async () => {
      await wrapper.setProps({ currentImage: { ...mockImageInfo, download: true } });
      await nextTick();
      expect(wrapper.findComponent(DownloadIcon).exists()).eq(true);
    });

    it('tooltip configuration', () => {
      const tooltips = wrapper.findAllComponents({ name: 'TToolTip' });
      tooltips.forEach((tooltip) => {
        expect(tooltip.props('showArrow')).eq(true);
        expect(tooltip.props('theme')).eq('default');
        expect(tooltip.props('destroyOnClose')).eq(true);
      });
    });
  });

  describe('events', () => {
    it('mirror', async () => {
      const onMirror = vi.fn();
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, onMirror, zIndex: 3000 },
      });
      await nextTick();

      await wrapper.findComponent(MirrorIcon).trigger('click');
      expect(onMirror).toHaveBeenCalledTimes(1);
    });

    it('rotate', async () => {
      const onRotate = vi.fn();
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, onRotate, zIndex: 3000 },
      });
      await nextTick();

      await wrapper.findComponent(RotationIcon).trigger('click');
      expect(onRotate).toHaveBeenCalledTimes(1);
    });

    it('zoomOut', async () => {
      const onZoomOut = vi.fn();
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, onZoomOut, zIndex: 3000 },
      });
      await nextTick();

      await wrapper.findComponent(ZoomOutIcon).trigger('click');
      expect(onZoomOut).toHaveBeenCalledTimes(1);
    });

    it('zoomIn', async () => {
      const onZoomIn = vi.fn();
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, onZoomIn, zIndex: 3000 },
      });
      await nextTick();

      await wrapper.findComponent(ZoomInIcon).trigger('click');
      expect(onZoomIn).toHaveBeenCalledTimes(1);
    });

    it('reset', async () => {
      const onReset = vi.fn();
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, onReset, zIndex: 3000 },
      });
      await nextTick();

      await wrapper.findComponent(ImageIcon).trigger('click');
      expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('download', async () => {
      const onDownload = vi.fn();
      const downloadableImage = { ...mockImageInfo, download: true };
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: downloadableImage, onDownload, zIndex: 3000 },
      });
      await nextTick();

      await wrapper.findComponent(DownloadIcon).trigger('click');
      expect(onDownload).toHaveBeenCalledTimes(1);
      expect(onDownload).toHaveBeenCalledWith(downloadableImage.mainImage);
    });

    it('rapid clicks', async () => {
      const onZoomIn = vi.fn();
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, onZoomIn, zIndex: 3000 },
      });
      await nextTick();

      const zoomInIcon = wrapper.findComponent(ZoomInIcon);
      await zoomInIcon.trigger('click');
      await zoomInIcon.trigger('click');
      await zoomInIcon.trigger('click');
      expect(onZoomIn).toHaveBeenCalledTimes(3);
    });

    it('different mainImage types', async () => {
      const imageTypes = [
        { mainImage: 'https://example.com/image.jpg' },
        {
          mainImage:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        },
        { mainImage: new File(['test'], 'test.jpg', { type: 'image/jpeg' }) },
      ];

      for (const imageInfo of imageTypes) {
        const wrapper = mount(ImageViewerUtils, {
          props: { scale: 1, currentImage: imageInfo, zIndex: 3000 },
        });
        await nextTick();
        expect(wrapper.find('.t-image-viewer__utils').exists()).eq(true);
        wrapper.unmount();
      }
    });
  });
});
