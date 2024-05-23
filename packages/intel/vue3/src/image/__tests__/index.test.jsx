import { mount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';
import { nextTick } from '@td/adapter-vue';
import { Image } from 'tdesign-vue-next';

const src = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
const errorSrc = 'https://tdesign.gtimg.com/demo/demo-image-123123123.png';

describe('image', () => {
  describe('props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Image src={src} />;
        },
      });
      expect(wrapper.find('.t-image__wrapper').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__wrapper img').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__wrapper img').element.getAttribute('src')).toBe(src);
    });

    it(':alt', () => {
      const wrapper = mount({
        render() {
          return <Image src={src} alt="图片描述" />;
        },
      });
      const img = wrapper.find('.t-image__wrapper img');
      expect(img.element.getAttribute('alt')).toBe('图片描述');
    });

    it(':error', async () => {
      const wrapper = mount(() => <Image src={errorSrc} error="error" />);
      wrapper.setProps({
        src,
      });
      const img = wrapper.find('.t-image__wrapper img');
      await nextTick();
      await nextTick();
      expect(wrapper.emitted('error')).toBeUndefined();
      expect(img.exists()).toBeTruthy();
      expect(wrapper.find('.t-image__error').exists()).toBeFalsy();
    });

    it(':fit', () => {
      const fitList = ['contain', 'cover', 'fill', 'none', 'scale-down'];
      fitList.forEach((fit) => {
        const wrapper = mount(() => <Image src={src} fit={fit} />);
        const img = wrapper.find('.t-image__wrapper img');
        expect(img.classes()).toContain(`t-image--fit-${fit}`);
      });
    });

    it(':gallery', () => {
      const wrapper = mount(() => <Image src={src} gallery />);
      expect(wrapper.classes()).toContain('t-image__wrapper--gallery');
    });

    it(':placeholder', () => {
      const wrapper = mount(() => <Image src={src} placeholder="加载中..." />);
      expect(wrapper.find('.t-image__placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__placeholder').text()).toBe('加载中...');
    });

    it(':overlayContent', () => {
      const wrapper = mount(() => <Image src={src} overlayContent="悬浮内容" />);
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').text()).toBe('悬浮内容');
    });

    it(':overlayTrigger', async () => {
      const wrapper = mount(() => <Image src={src} overlayContent="悬浮内容" overlayTrigger="hover" />);
      await wrapper.trigger('mouseenter');
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').text()).toBe('悬浮内容');
      await wrapper.trigger('mouseleave');
      expect(wrapper.find('.t-image__overlay-content').classes()).toContain('t-image__overlay-content--hidden');
    });

    it(':position', () => {
      const positionList = ['top', 'right', 'bottom', 'left', 'center'];
      positionList.forEach((position) => {
        const wrapper = mount(() => <Image src={src} position={position} />);
        const img = wrapper.find('.t-image__wrapper img');
        expect(img.classes()).toContain(`t-image--position-${position}`);
      });
    });

    it(':shape', () => {
      const shapeList = ['circle', 'round', 'square'];
      shapeList.forEach((shape) => {
        const wrapper = mount(() => <Image src={src} shape={shape} />);
        expect(wrapper.classes()).toContain(`t-image__wrapper--shape-${shape}`);
      });
    });

    it(':onError', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Image src={errorSrc} onError={fn} />);
      const img = wrapper.find('.t-image__wrapper img');
      await nextTick();
      await img.trigger('error');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onLoad', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Image src={src} onLoad={fn} />);
      const img = wrapper.find('.t-image__wrapper img');
      await nextTick();
      await img.trigger('load');
      await nextTick();
      expect(fn).toBeCalled();
    });
  });
});
