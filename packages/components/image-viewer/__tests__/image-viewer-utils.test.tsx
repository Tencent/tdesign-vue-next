import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
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
    it(':scale[number] renders utils container and icons', async () => {
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, zIndex: 3000 },
      });
      await nextTick();

      expect(wrapper.find('.t-image-viewer__utils').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__utils-content').exists()).toBeTruthy();

      // toolbar icons
      const icons = wrapper.findAll('.t-image-viewer__modal-icon');
      expect(icons.length).toBeGreaterThanOrEqual(5);
      expect(wrapper.findComponent(MirrorIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(RotationIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(ZoomOutIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(ImageIcon).exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':scale[number] display percentage', async () => {
      const testCases = [
        { scale: 0.5, expected: '50%' },
        { scale: 1, expected: '100%' },
        { scale: 1.25, expected: '125%' },
        { scale: 1.5, expected: '150%' },
        { scale: 2, expected: '200%' },
        { scale: 3.33, expected: '333%' },
      ];

      for (const testCase of testCases) {
        const wrapper = mount(ImageViewerUtils, {
          props: { scale: testCase.scale, currentImage: mockImageInfo, zIndex: 3000 },
        });
        await nextTick();
        expect(wrapper.find('.t-image-viewer__utils-scale').text()).toBe(testCase.expected);
        wrapper.unmount();
      }
    });

    it(':scale extreme values', async () => {
      // very small
      const wrapper1 = mount(ImageViewerUtils, {
        props: { scale: 0.01, currentImage: mockImageInfo, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper1.find('.t-image-viewer__utils-scale').text()).toBe('1%');

      // very large
      const wrapper2 = mount(ImageViewerUtils, {
        props: { scale: 10, currentImage: mockImageInfo, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper2.find('.t-image-viewer__utils-scale').text()).toBe('1000%');

      // zero
      const wrapper3 = mount(ImageViewerUtils, {
        props: { scale: 0, currentImage: mockImageInfo, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper3.find('.t-image-viewer__utils-scale').text()).toBe('0%');

      // negative
      const wrapper4 = mount(ImageViewerUtils, {
        props: { scale: -1, currentImage: mockImageInfo, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper4.find('.t-image-viewer__utils-scale').text()).toBe('-100%');
    });

    it(':currentImage download[boolean]', async () => {
      // download disabled
      const wrapper1 = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper1.findComponent(DownloadIcon).exists()).toBeFalsy();

      // download enabled
      const wrapper2 = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: { ...mockImageInfo, download: true }, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper2.findComponent(DownloadIcon).exists()).toBeTruthy();
    });

    it(':currentImage[File]', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const onDownload = vi.fn();
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: { mainImage: file, download: true }, onDownload, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper.findComponent(DownloadIcon).exists()).toBeTruthy();

      await wrapper.findComponent(DownloadIcon).trigger('click');
      expect(onDownload).toHaveBeenCalledWith(expect.any(String));
    });

    it(':currentImage empty/null', async () => {
      // empty object
      const wrapper1 = mount(ImageViewerUtils, {
        // @ts-expect-error testing empty currentImage
        props: { scale: 1, currentImage: {}, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper1.find('.t-image-viewer__utils').exists()).toBeTruthy();
      expect(wrapper1.findComponent(DownloadIcon).exists()).toBeFalsy();

      // null mainImage
      const wrapper2 = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: { mainImage: null }, zIndex: 3000 },
      });
      await nextTick();
      expect(wrapper2.find('.t-image-viewer__utils').exists()).toBeTruthy();
    });

    it(':zIndex[number]', async () => {
      // with zIndex
      const wrapper1 = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, zIndex: 5000 },
      });
      await nextTick();
      expect(wrapper1.find('.t-image-viewer__utils').exists()).toBeTruthy();

      // without zIndex
      const wrapper2 = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo },
      });
      await nextTick();
      expect(wrapper2.find('.t-image-viewer__utils').exists()).toBeTruthy();
    });

    it('tooltip configuration', () => {
      const wrapper = mount(ImageViewerUtils, {
        props: { scale: 1, currentImage: mockImageInfo, zIndex: 3000 },
      });
      const tooltips = wrapper.findAllComponents({ name: 'TToolTip' });
      tooltips.forEach((tooltip) => {
        expect(tooltip.props('showArrow')).toBeTruthy();
        expect(tooltip.props('theme')).toBe('default');
        expect(tooltip.props('destroyOnClose')).toBeTruthy();
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
  });
});
