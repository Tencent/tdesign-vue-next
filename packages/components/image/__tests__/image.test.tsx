import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Image from '@tdesign/components/image';
import imageProps from '@tdesign/components/image/props';
import { simulateImageEvent } from '@tdesign/internal-tests/utils';
import { sleep } from '@tdesign/internal-utils';
import { DEFAULT_SRC, mountImage, mountImageWithoutSrc, mountOverlayImage, mountImageWithConfig } from './mount';

const ERROR_SRC = 'https://tdesign.gtimg.com/demo/demo-image-error-404.png';

describe('Image', () => {
  describe('props', () => {
    it(':alt[string]', () => {
      // 默认 alt 为空
      const wrapper1 = mountImage();
      expect(wrapper1.find('img').attributes('alt')).toBe('');
      wrapper1.unmount();

      // 自定义 alt 文本
      const wrapper2 = mountImage({ alt: '图片描述' });
      expect(wrapper2.find('img').attributes('alt')).toBe('图片描述');
      wrapper2.unmount();
    });

    it(':error[function] renders custom error node on load failure', async () => {
      const wrapper = mountImage({ error: () => <span class="custom-error">加载失败</span>, src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('.custom-error').exists()).toBeTruthy();
      expect(wrapper.find('.custom-error').text()).toBe('加载失败');
      wrapper.unmount();
    });

    it(':error[string] renders string text on load failure', async () => {
      const wrapper = mountImage({ error: '加载失败了', src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__error').text()).toContain('加载失败了');
      wrapper.unmount();
    });

    it(':error[default] renders default error icon when no error prop', async () => {
      const wrapper = mountImage({ src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      // 默认渲染 ImageErrorIcon
      expect(wrapper.find('.t-icon-image-error').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it(':fallback[string] switches src to fallback on error', async () => {
      const fallbackUrl = 'https://tdesign.gtimg.com/demo/demo-image-fallback.png';
      const wrapper = mountImage({ src: ERROR_SRC, fallback: fallbackUrl });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      // fallback 命中后 hasError 重置，不展示 error 区块
      expect(wrapper.find('.t-image__error').exists()).toBeFalsy();
      // src 切换到 fallback
      expect(wrapper.find('img').attributes('src')).toBe(fallbackUrl);
      wrapper.unmount();
    });

    it(':fallback[empty] keeps error ui when fallback not provided', async () => {
      const wrapper = mountImage({ src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it(':fit[string] applies class for each enum value', () => {
      const fitList: Array<TdImageProps['fit']> = ['contain', 'cover', 'fill', 'none', 'scale-down'];
      fitList.forEach((fit) => {
        const wrapper = mountImage({ fit });
        expect(wrapper.find('img').classes()).toContain(`t-image--fit-${fit}`);
        wrapper.unmount();
      });
    });

    it(':fit validator covers undefined/valid/invalid', () => {
      const v = imageProps.fit.validator;
      expect(v(undefined)).toBe(true);
      expect(v(null)).toBe(true);
      expect(v('contain')).toBe(true);
      expect(v('cover')).toBe(true);
      expect(v('fill')).toBe(true);
      expect(v('none')).toBe(true);
      expect(v('scale-down')).toBe(true);
      // @ts-expect-error 测试无效值
      expect(v('invalid')).toBe(false);
    });

    it(':gallery[boolean] toggles gallery wrapper class', () => {
      // 默认无 gallery
      const wrapper1 = mountImage();
      expect(wrapper1.classes()).not.toContain('t-image__wrapper--gallery');
      expect(wrapper1.find('.t-image__gallery-shadow').exists()).toBeFalsy();
      wrapper1.unmount();

      // gallery=true 渲染 gallery class 与 shadow 元素
      const wrapper2 = mountImage({ gallery: true });
      expect(wrapper2.classes()).toContain('t-image__wrapper--gallery');
      expect(wrapper2.find('.t-image__gallery-shadow').exists()).toBeTruthy();
      wrapper2.unmount();

      // gallery=false 不渲染
      const wrapper3 = mountImage({ gallery: false });
      expect(wrapper3.classes()).not.toContain('t-image__wrapper--gallery');
      expect(wrapper3.find('.t-image__gallery-shadow').exists()).toBeFalsy();
      wrapper3.unmount();
    });

    it(':lazy[false] renders img immediately', async () => {
      const wrapper = mountImage({ lazy: false });
      await nextTick();
      expect(wrapper.find('img').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it(':lazy[true] observes intersection and renders after entering viewport', async () => {
      const observeSpy = vi.fn();
      const unobserveSpy = vi.fn();
      const intersectCallbacks: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];

      class MockIO {
        public observe = observeSpy;
        public unobserve = unobserveSpy;
        public disconnect = vi.fn();
        public takeRecords = vi.fn();
        public root = null;
        public rootMargin = '';
        public thresholds: number[] = [];
        constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
          intersectCallbacks.push(cb);
        }
      }

      const originalIO = window.IntersectionObserver;
      window.IntersectionObserver = MockIO as unknown as typeof IntersectionObserver;

      try {
        const wrapper = mountImage({ lazy: true });
        await nextTick();
        // 初始未进入视口：img 不渲染
        expect(wrapper.find('img').exists()).toBeFalsy();
        expect(observeSpy).toHaveBeenCalled();

        // 触发进入视口
        intersectCallbacks.forEach((cb) => cb([{ isIntersecting: true }]));
        await nextTick();
        expect(wrapper.find('img').exists()).toBeTruthy();
        wrapper.unmount();
        expect(unobserveSpy).toHaveBeenCalled();
      } finally {
        window.IntersectionObserver = originalIO;
      }
    });

    it(':lazy[true] falls back to immediate load when IO unavailable', async () => {
      const originalIO = window.IntersectionObserver;
      // @ts-expect-error 模拟无 IntersectionObserver
      delete window.IntersectionObserver;
      try {
        const wrapper = mountImage({ lazy: true });
        await nextTick();
        // 无 IO 时直接 callback → shouldLoad=true → img 渲染
        expect(wrapper.find('img').exists()).toBeTruthy();
        wrapper.unmount();
      } finally {
        window.IntersectionObserver = originalIO;
      }
    });

    it(':loading[function] renders custom loading node', () => {
      const wrapper = mountImage({ loading: () => <span class="custom-loading">自定义加载</span> });
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      expect(wrapper.find('.custom-loading').exists()).toBeTruthy();
      expect(wrapper.find('.custom-loading').text()).toBe('自定义加载');
      wrapper.unmount();
    });

    it(':loading[string] renders string text in loading area', () => {
      const wrapper = mountImage({ loading: '加载中...' });
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__loading').text()).toContain('加载中...');
      wrapper.unmount();
    });

    it(':loading hidden after load event', async () => {
      const wrapper = mountImage();
      await nextTick();
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'load');
      await nextTick();
      expect(wrapper.find('.t-image__loading').exists()).toBeFalsy();
      wrapper.unmount();
    });

    it(':overlayContent[function] renders overlay content', () => {
      const wrapper = mountImage({ overlayContent: () => <span class="overlay-node">浮层</span> });
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.overlay-node').exists()).toBeTruthy();
      expect(wrapper.find('.overlay-node').text()).toBe('浮层');
      wrapper.unmount();
    });

    it(':overlayContent[string] renders string overlay', () => {
      const wrapper = mountImage({ overlayContent: '悬浮内容' });
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').text()).toBe('悬浮内容');
      wrapper.unmount();
    });

    it(':overlayTrigger[always] shows overlay by default', () => {
      const wrapper = mountOverlayImage({ overlayTrigger: 'always' });
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeFalsy();
      wrapper.unmount();
    });

    it(':overlayTrigger[hover] toggles overlay on mouse events', async () => {
      const wrapper = mountOverlayImage({ overlayTrigger: 'hover' });
      // 需要 need-hover class
      expect(wrapper.classes()).toContain('t-image__wrapper--need-hover');

      // 初始隐藏
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeTruthy();

      // mouseenter 显示
      await wrapper.trigger('mouseenter');
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeFalsy();

      // mouseleave 隐藏
      await wrapper.trigger('mouseleave');
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it(':overlayTrigger validator covers undefined/valid/invalid', () => {
      const v = imageProps.overlayTrigger.validator;
      expect(v(undefined)).toBe(true);
      expect(v(null)).toBe(true);
      expect(v('always')).toBe(true);
      expect(v('hover')).toBe(true);
      // @ts-expect-error 测试无效值
      expect(v('invalid')).toBe(false);
    });

    it(':placeholder[function] renders custom placeholder node', () => {
      const wrapper = mountImage({ placeholder: () => <span class="custom-placeholder">占位</span> });
      expect(wrapper.find('.t-image__placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.custom-placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.custom-placeholder').text()).toBe('占位');
      wrapper.unmount();
    });

    it(':placeholder[string] renders string placeholder', () => {
      const wrapper = mountImage({ placeholder: '加载中...' });
      expect(wrapper.find('.t-image__placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__placeholder').text()).toBe('加载中...');
      wrapper.unmount();
    });

    it(':position[string] applies position class for each value', () => {
      const positionList = ['top', 'right', 'bottom', 'left', 'center'];
      positionList.forEach((position) => {
        const wrapper = mountImage({ position });
        expect(wrapper.find('img').classes()).toContain(`t-image--position-${position}`);
        wrapper.unmount();
      });
    });

    it(':referrerpolicy[string] applies attribute for each enum value', () => {
      const policies: Array<TdImageProps['referrerpolicy']> = [
        'no-referrer',
        'no-referrer-when-downgrade',
        'origin',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url',
      ];
      policies.forEach((policy) => {
        const wrapper = mountImage({ referrerpolicy: policy });
        expect(wrapper.find('img').attributes('referrerpolicy')).toBe(policy);
        wrapper.unmount();
      });
    });

    it(':referrerpolicy validator covers undefined/valid/invalid', () => {
      const v = imageProps.referrerpolicy.validator;
      expect(v(undefined)).toBe(true);
      expect(v(null)).toBe(true);
      expect(v('no-referrer')).toBe(true);
      expect(v('strict-origin-when-cross-origin')).toBe(true);
      // @ts-expect-error 测试无效值
      expect(v('invalid')).toBe(false);
    });

    it(':shape[string] applies wrapper class for each enum value', () => {
      const shapeList: Array<TdImageProps['shape']> = ['circle', 'round', 'square'];
      shapeList.forEach((shape) => {
        const wrapper = mountImage({ shape });
        expect(wrapper.classes()).toContain(`t-image__wrapper--shape-${shape}`);
        wrapper.unmount();
      });
    });

    it(':shape validator covers undefined/valid/invalid', () => {
      const v = imageProps.shape.validator;
      expect(v(undefined)).toBe(true);
      expect(v(null)).toBe(true);
      expect(v('circle')).toBe(true);
      expect(v('round')).toBe(true);
      expect(v('square')).toBe(true);
      // @ts-expect-error 测试无效值
      expect(v('invalid')).toBe(false);
    });

    it(':src[string] renders as img src attribute', () => {
      const wrapper = mountImage({ src: DEFAULT_SRC });
      expect(wrapper.find('.t-image__wrapper').exists()).toBeTruthy();
      expect(wrapper.find('img').exists()).toBeTruthy();
      expect(wrapper.find('img').attributes('src')).toBe(DEFAULT_SRC);
      wrapper.unmount();
    });

    it(':src[File] renders blob preview url via useImagePreviewUrl', async () => {
      const originalCreateObjectURL = global.URL.createObjectURL;
      global.URL.createObjectURL = vi.fn(() => 'blob:fake-preview-url');
      try {
        const file = new File(['mock'], 'test.png', { type: 'image/png' });
        const wrapper = mount(() => <Image src={file} />);
        await sleep(20);
        await nextTick();
        expect(wrapper.find('img').exists()).toBeTruthy();
        wrapper.unmount();
      } finally {
        global.URL.createObjectURL = originalCreateObjectURL;
      }
    });

    it(':src change resets hasError and isLoaded states', async () => {
      const wrapper = mount(Image, { props: { src: ERROR_SRC } });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();

      // 切换到正常 src → watch 触发重置
      await wrapper.setProps({ src: DEFAULT_SRC });
      await sleep(30);
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeFalsy();
      wrapper.unmount();
    });

    it(':srcset[object] renders picture with source tags', () => {
      const wrapper = mountImage({
        srcset: {
          'image/avif': 'https://tdesign.gtimg.com/img/tdesign-image.avif',
          'image/webp': 'https://tdesign.gtimg.com/img/tdesign-image.webp',
        },
      });
      expect(wrapper.find('picture').exists()).toBeTruthy();
      const sources = wrapper.findAll('picture > source');
      expect(sources.length).toBe(2);
      expect(sources[0].attributes('srcset')).toBe('https://tdesign.gtimg.com/img/tdesign-image.avif');
      expect(sources[0].attributes('type')).toBe('image/avif');
      expect(sources[1].attributes('srcset')).toBe('https://tdesign.gtimg.com/img/tdesign-image.webp');
      expect(sources[1].attributes('type')).toBe('image/webp');
      // picture 内仍然包含 img 作为 fallback
      expect(wrapper.find('picture img').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it(':srcset[empty object] falls back to plain img render', () => {
      const wrapper = mountImage({ srcset: {} as TdImageProps['srcset'] });
      expect(wrapper.find('picture').exists()).toBeFalsy();
      expect(wrapper.find('img').exists()).toBeTruthy();
      expect(wrapper.find('img').attributes('src')).toBe(DEFAULT_SRC);
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('onLoad', async () => {
      const onLoadFn = vi.fn();
      const wrapper = mountImage({ onLoad: onLoadFn });
      await nextTick();
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'load');
      await nextTick();
      expect(onLoadFn).toHaveBeenCalled();
      expect(onLoadFn.mock.calls[0][0].e.type).toBe('load');
      wrapper.unmount();
    });

    it('onLoad via DOM trigger', async () => {
      const fn = vi.fn();
      const wrapper = mountImage({ onLoad: fn });
      await nextTick();
      await wrapper.find('img').trigger('load');
      await nextTick();
      expect(fn).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('onError', async () => {
      const onErrorFn = vi.fn();
      const wrapper = mountImage({ src: ERROR_SRC, onError: onErrorFn });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(onErrorFn).toHaveBeenCalled();
      expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('.t-icon-image-error').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it('onError via DOM trigger', async () => {
      const fn = vi.fn();
      const wrapper = mountImage({ src: ERROR_SRC, onError: fn });
      await nextTick();
      await wrapper.find('img').trigger('error');
      await nextTick();
      expect(fn).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('onClick', async () => {
      const fn = vi.fn();
      const wrapper = mountImage({ onClick: fn });
      await wrapper.find('.t-image__wrapper').trigger('click');
      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0][0].e.type).toBe('click');
      wrapper.unmount();
    });

    it('onClick not required (safe when undefined)', async () => {
      const wrapper = mountImage();
      // 不应抛错
      await expect(wrapper.find('.t-image__wrapper').trigger('click')).resolves.not.toThrow();
      wrapper.unmount();
    });
  });

  describe('slots', () => {
    it('#error slot renders custom error node', async () => {
      const wrapper = mountImage({ src: ERROR_SRC }, { error: () => <span class="slot-error">自定义错误</span> });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.slot-error').exists()).toBeTruthy();
      expect(wrapper.find('.slot-error').text()).toBe('自定义错误');
      wrapper.unmount();
    });

    it('#loading slot renders custom loading node', () => {
      const wrapper = mountImage({}, { loading: () => <span class="slot-loading">加载中</span> });
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      expect(wrapper.find('.slot-loading').exists()).toBeTruthy();
      expect(wrapper.find('.slot-loading').text()).toBe('加载中');
      wrapper.unmount();
    });

    it('#overlayContent slot (camelCase)', () => {
      const wrapper = mountImageWithoutSrc({}, { overlayContent: () => <span class="slot-overlay">浮层内容</span> });
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.slot-overlay').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it('#overlay-content slot (kebab-case)', () => {
      const wrapper = mountImageWithoutSrc(
        {},
        { 'overlay-content': () => <span class="slot-overlay-kebab">浮层</span> },
      );
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.slot-overlay-kebab').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it('#placeholder slot renders custom placeholder node', () => {
      const wrapper = mountImage({}, { placeholder: () => <span class="slot-placeholder">占位中</span> });
      expect(wrapper.find('.t-image__placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.slot-placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.slot-placeholder').text()).toBe('占位中');
      wrapper.unmount();
    });
  });

  describe('interaction', () => {
    it('wrapper renders default shape and image classes', () => {
      const wrapper = mountImage();
      expect(wrapper.find('.t-image__wrapper').exists()).toBeTruthy();
      expect(wrapper.classes()).toContain('t-image__wrapper--shape-square');
      expect(wrapper.find('.t-image').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it('hasError hides img and renders error block', async () => {
      const wrapper = mountImage({ src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      // 出错后：img 不再渲染
      expect(wrapper.find('img').exists()).toBeFalsy();
      // 只保留 .t-image 占位 + .t-image__error
      expect(wrapper.find('.t-image').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it('loading block hidden after load event', async () => {
      const wrapper = mountImage();
      await nextTick();
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'load');
      await nextTick();
      expect(wrapper.find('.t-image__loading').exists()).toBeFalsy();
      wrapper.unmount();
    });

    it('globalConfig.replaceImageSrc transforms src', async () => {
      const replaced = 'https://tdesign.gtimg.com/demo/replaced-image.png';
      const wrapper = mountImageWithConfig({ replaceImageSrc: () => replaced });
      await nextTick();
      expect(wrapper.find('img').attributes('src')).toBe(replaced);
      wrapper.unmount();
    });

    it('globalConfig.replaceImageSrc not a function falls back to original src', async () => {
      const wrapper = mountImageWithConfig({ replaceImageSrc: 'not-a-function' });
      await nextTick();
      expect(wrapper.find('img').attributes('src')).toBe(DEFAULT_SRC);
      wrapper.unmount();
    });

    it('globalConfig.loadingText / errorText fallback when loading/error prop not provided', async () => {
      const wrapper = mountImageWithConfig({ loadingText: '全局加载中', errorText: '全局失败' }, { src: ERROR_SRC });
      // loading 区 — 使用 globalConfig.loadingText
      expect(wrapper.find('.t-image__loading').text()).toContain('全局加载中');
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      // error 区 — 使用 globalConfig.errorText
      expect(wrapper.find('.t-image__error').text()).toContain('全局失败');
      wrapper.unmount();
    });

    it('img.complete=true on mount triggers auto load (nuxt3 workaround)', async () => {
      const originalComplete = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete');
      Object.defineProperty(HTMLImageElement.prototype, 'complete', {
        configurable: true,
        get() {
          return true;
        },
      });
      try {
        const onLoad = vi.fn();
        const wrapper = mountImage({ onLoad });
        await nextTick();
        expect(onLoad).toHaveBeenCalled();
        expect(onLoad.mock.calls[0][0].e.type).toBe('load');
        // 自动 load 后 loading 区块消失
        expect(wrapper.find('.t-image__loading').exists()).toBeFalsy();
        wrapper.unmount();
      } finally {
        if (originalComplete) {
          Object.defineProperty(HTMLImageElement.prototype, 'complete', originalComplete);
        }
      }
    });

    it('lazy + IO undefined short-circuits with immediate load', async () => {
      const originalIO = window.IntersectionObserver;
      // @ts-expect-error 模拟 IO 为 undefined
      window.IntersectionObserver = undefined;
      try {
        const wrapper = mountImage({ lazy: true });
        await nextTick();
        // observe 工具在无 IO 时直接 callback → shouldLoad=true → img 渲染
        expect(wrapper.find('img').exists()).toBeTruthy();
        wrapper.unmount();
      } finally {
        window.IntersectionObserver = originalIO;
      }
    });

    it('overlayTrigger=always does not add need-hover class', () => {
      const wrapper = mountOverlayImage({ overlayTrigger: 'always' });
      expect(wrapper.classes()).not.toContain('t-image__wrapper--need-hover');
      wrapper.unmount();
    });

    it('no overlayContent renders no overlay node', () => {
      const wrapper = mountImage();
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeFalsy();
      wrapper.unmount();
    });

    it('no placeholder renders no placeholder node', () => {
      const wrapper = mountImage();
      expect(wrapper.find('.t-image__placeholder').exists()).toBeFalsy();
      wrapper.unmount();
    });

    it('fit default applies fill class', () => {
      const wrapper = mountImage();
      expect(wrapper.find('img').classes()).toContain('t-image--fit-fill');
      wrapper.unmount();
    });

    it('position default applies center class', () => {
      const wrapper = mountImage();
      expect(wrapper.find('img').classes()).toContain('t-image--position-center');
      wrapper.unmount();
    });

    it('referrerpolicy default applies strict-origin-when-cross-origin', () => {
      const wrapper = mountImage();
      expect(wrapper.find('img').attributes('referrerpolicy')).toBe('strict-origin-when-cross-origin');
      wrapper.unmount();
    });
  });
});

// 引入 TdImageProps 类型用于泛型标注
import type { TdImageProps } from '@tdesign/components/image';
