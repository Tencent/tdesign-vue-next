import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { nextTick } from 'vue';
import ImageItem from '../base/ImageItem';

const testImages = [
  'https://tdesign.gtimg.com/demo/demo-image-1.png',
  'https://tdesign.gtimg.com/demo/demo-image-2.png',
  'https://tdesign.gtimg.com/demo/demo-image-3.png',
];

describe('ImageItem', () => {
  describe('props', () => {
    it(':src[string]', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-pic').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__modal-box').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__modal-image').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':src[File]', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const wrapper = mount(ImageItem, {
        props: { src: file, scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-pic').exists()).toBeTruthy();
    });

    it(':src empty/null', async () => {
      // empty string
      const wrapper1 = mount(ImageItem, {
        props: { src: '', scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      expect(wrapper1.find('.t-image-viewer__modal-pic').exists()).toBeTruthy();

      // null
      const wrapper2 = mount(ImageItem, {
        props: { src: null, scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      expect(wrapper2.find('.t-image-viewer__modal-pic').exists()).toBeTruthy();
    });

    it(':src change resets status', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      await wrapper.setProps({ src: testImages[1] });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-image').exists()).toBeTruthy();
    });

    it(':placementSrc[string]', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: testImages[0],
          placementSrc: 'https://tdesign.gtimg.com/demo/demo-thumb-1.png',
          scale: 1,
          rotate: 0,
          mirror: 1,
        },
      });
      await nextTick();
      const images = wrapper.findAll('.t-image-viewer__modal-image');
      expect(images.length).toBeGreaterThanOrEqual(1);

      const placementImg = images.find(
        (img) =>
          (img.element as HTMLElement).style.display !== 'none' &&
          (img.element as HTMLImageElement).src?.includes('thumb'),
      );
      expect(placementImg).toBeTruthy();
    });

    it(':scale[number]', async () => {
      // default scale
      const wrapper1 = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      const box1 = (wrapper1.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(box1).toContain('scale(1, 1)');

      // scale with mirror
      const wrapper2 = mount(ImageItem, {
        props: { src: testImages[0], scale: 1.5, rotate: 0, mirror: -1 },
      });
      await nextTick();
      const box2 = (wrapper2.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(box2).toContain('scale(-1.5, 1.5)');

      // scale = 0
      const wrapper3 = mount(ImageItem, {
        props: { src: testImages[0], scale: 0, rotate: 0, mirror: 1 },
      });
      await nextTick();
      const box3 = (wrapper3.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(box3).toContain('scale(0, 0)');

      // large scale
      const wrapper4 = mount(ImageItem, {
        props: { src: testImages[0], scale: 5, rotate: 0, mirror: 1 },
      });
      await nextTick();
      const box4 = (wrapper4.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(box4).toContain('scale(5, 5)');
    });

    it(':rotate[number]', async () => {
      // positive
      const wrapper1 = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 180, mirror: 1 },
      });
      await nextTick();
      const img1 = (wrapper1.find('.t-image-viewer__modal-image').element as HTMLElement).style.transform;
      expect(img1).toContain('rotate(180deg)');

      // negative
      const wrapper2 = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: -90, mirror: 1 },
      });
      await nextTick();
      const img2 = (wrapper2.find('.t-image-viewer__modal-image').element as HTMLElement).style.transform;
      expect(img2).toContain('rotate(-90deg)');
    });

    it(':mirror[number]', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: -1 },
      });
      await nextTick();
      const boxStyle = (wrapper.find('.t-image-viewer__modal-box').element as HTMLElement).style.transform;
      expect(boxStyle).toContain('scale(-1, 1)');
    });

    it(':imageReferrerpolicy[string]', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], imageReferrerpolicy: 'no-referrer', scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      const img = wrapper.find('.t-image-viewer__modal-image').element as HTMLImageElement;
      expect(img.getAttribute('referrerpolicy')).toBe('no-referrer');
    });

    it(':isSvg[boolean]', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>'),
      } as Response);

      const wrapper = mount(ImageItem, {
        props: { src: 'https://example.com/image.svg', isSvg: true, scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(wrapper.find('.t-image-viewer__modal-image[data-alt="svg"]').exists()).toBeTruthy();
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

      const wrapper = mount(ImageItem, {
        props: { src: 'https://example.com/test.svg', isSvg: true, scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(wrapper.find('.t-image-viewer__modal-image[data-alt="svg"]').exists()).toBeTruthy();
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
      expect(wrapper.find('.t-image-viewer__modal-image').exists()).toBeTruthy();
    });

    it('image error', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: 'https://invalid-url.com/image.png', scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      const img = wrapper.find('.t-image-viewer__modal-image').element as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      await nextTick();

      expect(wrapper.find('.t-image-viewer__img-error').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__img-error-text').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__img-error-content').exists()).toBeTruthy();
    });

    it('mousedown for dragging', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      const img = wrapper.find('.t-image-viewer__modal-image');
      img.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, button: 0 }));
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-image').exists()).toBeTruthy();
    });

    it('image draggable = false', async () => {
      const wrapper = mount(ImageItem, {
        props: { src: testImages[0], scale: 1, rotate: 0, mirror: 1 },
      });
      await nextTick();

      const img = wrapper.find('.t-image-viewer__modal-image').element as HTMLImageElement;
      expect(img.draggable).toBeFalsy();
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
      expect(wrapper.find('.t-image-viewer__modal-pic').exists()).toBeTruthy();
      fetchSpy.mockRestore();
    });
  });
});
