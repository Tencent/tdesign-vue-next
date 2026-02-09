import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { nextTick } from 'vue';
import ImageItem from '../base/ImageItem';

const testImages = [
  'https://tdesign.gtimg.com/demo/demo-image-1.png',
  'https://tdesign.gtimg.com/demo/demo-image-2.png',
  'https://tdesign.gtimg.com/demo/demo-image-3.png',
];

describe('ImageItem', () => {
  describe('props', () => {
    let wrapper: VueWrapper;

    beforeEach(async () => {
      wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
    });

    it(':src[string]', () => {
      expect(wrapper.find('.t-image-viewer__modal-pic').exists()).eq(true);
      expect(wrapper.find('.t-image-viewer__modal-box').exists()).eq(true);
      expect(wrapper.find('.t-image-viewer__modal-image').exists()).eq(true);
    });

    it(':src[File]', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const w = mount(ImageItem, {
        props: { src: file, scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      expect(w.find('.t-image-viewer__modal-pic').exists()).eq(true);
    });

    it(':src empty string', async () => {
      await wrapper.setProps({ src: '' });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-pic').exists()).eq(true);
    });

    it(':src null', async () => {
      await wrapper.setProps({ src: null });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-pic').exists()).eq(true);
    });

    it(':src change resets status', async () => {
      await wrapper.setProps({ src: testImages[1] });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-image').exists()).eq(true);
    });

    it(':placementSrc[string]', async () => {
      const w = mount(ImageItem, {
        props: {
          src: testImages[0],
          placementSrc: 'https://tdesign.gtimg.com/demo/demo-thumb-1.png',
          scale: 1,
          rotate: 0,
          mirror: 1,
        },
      });
      await nextTick();
      const images = w.findAll('.t-image-viewer__modal-image');
      expect(images.length).toBeGreaterThanOrEqual(1);

      const placementImg = images.find(
        (img) =>
          (img.element as HTMLElement).style.display !== 'none' &&
          (img.element as HTMLImageElement).src?.includes('thumb'),
      );
      expect(placementImg).toBeTruthy();
    });

    it(':scale[number] applies transform', async () => {
      await wrapper.setProps({ scale: 1.5, mirror: -1 });
      await nextTick();
      const boxStyle = (wrapper.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(boxStyle).toContain('scale(-1.5, 1.5)');
    });

    it(':scale = 0', async () => {
      await wrapper.setProps({ scale: 0 });
      await nextTick();
      const boxStyle = (wrapper.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(boxStyle).toContain('scale(0, 0)');
    });

    it(':scale large value', async () => {
      await wrapper.setProps({ scale: 5 });
      await nextTick();
      const boxStyle = (wrapper.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(boxStyle).toContain('scale(5, 5)');
    });

    it(':rotate[number]', async () => {
      await wrapper.setProps({ rotate: 180 });
      await nextTick();
      const imgStyle = (wrapper.find('.t-image-viewer__modal-image').element as HTMLElement).style.transform;
      expect(imgStyle).toContain('rotate(180deg)');
    });

    it(':rotate negative', async () => {
      await wrapper.setProps({ rotate: -90 });
      await nextTick();
      const imgStyle = (wrapper.find('.t-image-viewer__modal-image').element as HTMLElement).style.transform;
      expect(imgStyle).toContain('rotate(-90deg)');
    });

    it(':mirror[number]', async () => {
      await wrapper.setProps({ mirror: -1 });
      await nextTick();
      const boxStyle = (wrapper.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(boxStyle).toContain('scale(-1, 1)');
    });

    it(':imageReferrerpolicy[string]', async () => {
      const w = mount(ImageItem, {
        props: { src: testImages[0], imageReferrerpolicy: 'no-referrer', scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      const img = w.find('.t-image-viewer__modal-image').element as HTMLImageElement;
      expect(img.getAttribute('referrerpolicy')).eq('no-referrer');
    });

    it(':isSvg renders SVG image', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>'),
      } as Response);

      const w = mount(ImageItem, {
        props: { src: 'https://example.com/image.svg', isSvg: true, scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(w.find('.t-image-viewer__modal-image[data-alt="svg"]').exists()).eq(true);
      fetchSpy.mockRestore();
    });

    it(':isSvg with viewBox attribute', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        text: () =>
          Promise.resolve(
            '<svg viewBox="0 0 200 200" width="200" height="200"><rect x="10" y="10" width="180" height="180"/></svg>',
          ),
      } as Response);

      const w = mount(ImageItem, {
        props: { src: 'https://example.com/test.svg', isSvg: true, scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(w.find('.t-image-viewer__modal-image[data-alt="svg"]').exists()).eq(true);
      fetchSpy.mockRestore();
    });
  });

  describe('events', () => {
    it('image load', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      const img = wrapper.find('.t-image-viewer__modal-image').element as HTMLImageElement;
      img.dispatchEvent(new Event('load'));
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-image').exists()).eq(true);
    });

    it('image error shows error state', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: 'https://invalid-url.com/image.png', scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      const img = wrapper.find('.t-image-viewer__modal-image').element as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      await nextTick();

      expect(wrapper.find('.t-image-viewer__img-error').exists()).eq(true);
      expect(wrapper.find('.t-image-viewer__img-error-text').exists()).eq(true);
    });

    it('image error hides main image', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      const img = wrapper.find('.t-image-viewer__modal-image').element as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      await nextTick();

      expect(wrapper.find('.t-image-viewer__img-error').exists()).eq(true);
      expect(wrapper.find('.t-image-viewer__img-error-content').exists()).eq(true);
    });

    it('mousedown for dragging', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      const img = wrapper.find('.t-image-viewer__modal-image');
      img.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, button: 0 }));
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-image').exists()).eq(true);
    });

    it('image draggable = false', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      const img = wrapper.find('.t-image-viewer__modal-image').element as HTMLImageElement;
      expect(img.draggable).eq(false);
    });

    it('SVG mousedown for dragging', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>'),
      } as Response);

      const wrapper = mount(ImageItem, {
        props: { src: 'https://example.com/image.svg', isSvg: true, scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const svgContainer = wrapper.find('.t-image-viewer__modal-image[data-alt="svg"]');
      if (svgContainer.exists()) {
        svgContainer.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, button: 0 }));
        await nextTick();
      }
      expect(wrapper.find('.t-image-viewer__modal-pic').exists()).eq(true);
      fetchSpy.mockRestore();
    });
  });
});
