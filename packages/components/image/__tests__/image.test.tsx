import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';
import Image from '@tdesign/components/image';
import imageProps from '@tdesign/components/image/props';
import { simulateImageEvent } from '@tdesign/internal-tests/utils';
import { sleep } from '@tdesign/internal-utils';
import type { TdImageProps } from '@tdesign/components/image';
import { DEFAULT_SRC, mountImage, mountImageWithoutSrc, mountOverlayImage, mountImageWithConfig } from './mount';

const ERROR_SRC = 'https://tdesign.gtimg.com/demo/demo-image-error-404.png';

// IntersectionObserver mock
// todo: 考虑通用？
function createMockIO() {
  const observeSpy = vi.fn();
  const unobserveSpy = vi.fn();
  const callbacks: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];

  class MockIO {
    observe = observeSpy;
    unobserve = unobserveSpy;
    disconnect = vi.fn();
    takeRecords = vi.fn();
    root: Element | Document | null = null;
    rootMargin = '';
    thresholds: number[] = [];
    constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
      callbacks.push(cb);
    }
  }

  const original = window.IntersectionObserver;
  window.IntersectionObserver = MockIO as unknown as typeof IntersectionObserver;

  return {
    observeSpy,
    unobserveSpy,
    triggerEnter: () => callbacks.forEach((cb) => cb([{ isIntersecting: true }])),
    restore: () => {
      window.IntersectionObserver = original;
    },
  };
}

describe('Image', () => {
  describe('props', () => {
    let wrapper!: VueWrapper;
    afterEach(() => {
      wrapper?.unmount();
    });

    it(':alt[string]', () => {
      // 默认 alt 为空
      const wrapperDefault = mountImage();
      expect(wrapperDefault.find('img').attributes('alt')).toBe('');
      wrapperDefault.unmount();

      // 自定义 alt 文本
      wrapper = mountImage({ alt: '图片描述' });
      expect(wrapper.find('img').attributes('alt')).toBe('图片描述');
    });

    it(':error[function] renders custom error node on load failure', async () => {
      wrapper = mountImage({ error: () => <span class="custom-error">加载失败</span>, src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('.custom-error').exists()).toBeTruthy();
      expect(wrapper.find('.custom-error').text()).toBe('加载失败');
    });

    it(':error[string] renders string text on load failure', async () => {
      wrapper = mountImage({ error: '加载失败了', src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__error').text()).toContain('加载失败了');
    });

    it(':error[default] renders default error icon when no error prop', async () => {
      wrapper = mountImage({ src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      // 默认渲染 ImageErrorIcon
      expect(wrapper.find('.t-icon-image-error').exists()).toBeTruthy();
    });

    it(':fallback[string] switches src to fallback on error, shows error when not provided', async () => {
      const fallbackUrl = 'https://tdesign.gtimg.com/demo/demo-image-fallback.png';

      // 提供 fallback：hasError 重置，不展示 error 区块，src 切换到 fallback
      const wrapperWithFallback = mountImage({ src: ERROR_SRC, fallback: fallbackUrl });
      simulateImageEvent(wrapperWithFallback.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapperWithFallback.find('.t-image__error').exists()).toBeFalsy();
      expect(wrapperWithFallback.find('img').attributes('src')).toBe(fallbackUrl);
      wrapperWithFallback.unmount();

      // 不提供 fallback：保留 error UI
      wrapper = mountImage({ src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
    });

    it(':fit[string] applies class for each enum value', () => {
      // validator
      const v = imageProps.fit.validator;
      expect(v(undefined)).toBeTruthy();
      expect(v(null)).toBeTruthy();
      expect(v('contain')).toBeTruthy();
      expect(v('cover')).toBeTruthy();
      expect(v('fill')).toBeTruthy();
      expect(v('none')).toBeTruthy();
      expect(v('scale-down')).toBeTruthy();
      // @ts-expect-error 测试无效值
      expect(v('invalid')).toBeFalsy();

      // 默认值为 'fill'
      const wrapperDefault = mountImage();
      expect(wrapperDefault.find('img').classes()).toContain('t-image--fit-fill');
      wrapperDefault.unmount();

      // 每个枚举值
      for (const fit of ['contain', 'cover', 'fill', 'none', 'scale-down'] as Array<TdImageProps['fit']>) {
        const iterWrapper = mountImage({ fit });
        expect(iterWrapper.find('img').classes()).toContain(`t-image--fit-${fit}`);
        iterWrapper.unmount();
      }
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
      wrapper = mountImage({ gallery: false });
      expect(wrapper.classes()).not.toContain('t-image__wrapper--gallery');
      expect(wrapper.find('.t-image__gallery-shadow').exists()).toBeFalsy();
    });

    it(':lazy[boolean] controls deferred image rendering', async () => {
      // lazy=false：立即渲染
      const wrapperEager = mountImage({ lazy: false });
      await nextTick();
      expect(wrapperEager.find('img').exists()).toBeTruthy();
      wrapperEager.unmount();

      // lazy=true 且有 IO：延迟到进入视口后渲染
      const io = createMockIO();
      try {
        const wrapperLazy = mountImage({ lazy: true });
        await nextTick();
        // 初始未进入视口：img 不渲染
        expect(wrapperLazy.find('img').exists()).toBeFalsy();
        expect(io.observeSpy).toHaveBeenCalledTimes(1);

        // 触发进入视口
        io.triggerEnter();
        await nextTick();
        expect(wrapperLazy.find('img').exists()).toBeTruthy();
        wrapperLazy.unmount();
        expect(io.unobserveSpy).toHaveBeenCalledTimes(1);
      } finally {
        io.restore();
      }

      // lazy=true 且无 IO：直接加载
      const originalIO = window.IntersectionObserver;
      delete window.IntersectionObserver;
      try {
        wrapper = mountImage({ lazy: true });
        await nextTick();
        // 无 IO 时直接 callback → shouldLoad=true → img 渲染
        expect(wrapper.find('img').exists()).toBeTruthy();
      } finally {
        window.IntersectionObserver = originalIO;
      }
    });

    it(':loading[function] renders custom loading node', () => {
      wrapper = mountImage({ loading: () => <span class="custom-loading">自定义加载</span> });
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      expect(wrapper.find('.custom-loading').exists()).toBeTruthy();
      expect(wrapper.find('.custom-loading').text()).toBe('自定义加载');
    });

    it(':loading[string] renders string text in loading area', () => {
      wrapper = mountImage({ loading: '加载中...' });
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__loading').text()).toContain('加载中...');
    });

    it(':loading hidden after load event', async () => {
      wrapper = mountImage();
      await nextTick();
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'load');
      await nextTick();
      expect(wrapper.find('.t-image__loading').exists()).toBeFalsy();
    });

    it(':overlayContent[function] renders overlay content', () => {
      wrapper = mountImage({ overlayContent: () => <span class="overlay-node">浮层</span> });
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.overlay-node').exists()).toBeTruthy();
      expect(wrapper.find('.overlay-node').text()).toBe('浮层');
    });

    it(':overlayContent[string] renders string overlay', () => {
      wrapper = mountImage({ overlayContent: '悬浮内容' });
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').text()).toBe('悬浮内容');
    });

    it(':overlayTrigger[always/hover] controls overlay visibility', async () => {
      // validator
      const v = imageProps.overlayTrigger.validator;
      expect(v(undefined)).toBeTruthy();
      expect(v(null)).toBeTruthy();
      expect(v('always')).toBeTruthy();
      expect(v('hover')).toBeTruthy();
      // @ts-expect-error 测试无效值
      expect(v('invalid')).toBeFalsy();

      // always：显示 overlay，不加 need-hover class
      const wrapperAlways = mountOverlayImage({ overlayTrigger: 'always' });
      expect(wrapperAlways.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapperAlways.find('.t-image__overlay-content--hidden').exists()).toBeFalsy();
      expect(wrapperAlways.classes()).not.toContain('t-image__wrapper--need-hover');
      wrapperAlways.unmount();

      // hover：添加 need-hover class，鼠标事件切换显隐
      wrapper = mountOverlayImage({ overlayTrigger: 'hover' });
      expect(wrapper.classes()).toContain('t-image__wrapper--need-hover');
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeTruthy();

      await wrapper.trigger('mouseenter');
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeFalsy();

      await wrapper.trigger('mouseleave');
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeTruthy();
    });

    it(':placeholder[function] renders custom placeholder node', () => {
      wrapper = mountImage({ placeholder: () => <span class="custom-placeholder">占位</span> });
      expect(wrapper.find('.t-image__placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.custom-placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.custom-placeholder').text()).toBe('占位');
    });

    it(':placeholder[string] renders string placeholder', () => {
      wrapper = mountImage({ placeholder: '加载中...' });
      expect(wrapper.find('.t-image__placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__placeholder').text()).toBe('加载中...');
    });

    it(':position[string] applies position class for each value', () => {
      // 默认值为 'center'
      const wrapperDefault = mountImage();
      expect(wrapperDefault.find('img').classes()).toContain('t-image--position-center');
      wrapperDefault.unmount();

      for (const position of ['top', 'right', 'bottom', 'left', 'center'] as const) {
        const iterWrapper = mountImage({ position });
        expect(iterWrapper.find('img').classes()).toContain(`t-image--position-${position}`);
        iterWrapper.unmount();
      }
    });

    it(':referrerpolicy[string] applies attribute for each enum value', () => {
      // validator
      const v = imageProps.referrerpolicy.validator;
      expect(v(undefined)).toBeTruthy();
      expect(v(null)).toBeTruthy();
      expect(v('no-referrer')).toBeTruthy();
      expect(v('strict-origin-when-cross-origin')).toBeTruthy();
      // @ts-expect-error 测试无效值
      expect(v('invalid')).toBeFalsy();

      // 默认值为 'strict-origin-when-cross-origin'
      const wrapperDefault = mountImage();
      expect(wrapperDefault.find('img').attributes('referrerpolicy')).toBe('strict-origin-when-cross-origin');
      wrapperDefault.unmount();

      // 每个枚举值
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
      for (const policy of policies) {
        const iterWrapper = mountImage({ referrerpolicy: policy });
        expect(iterWrapper.find('img').attributes('referrerpolicy')).toBe(policy);
        iterWrapper.unmount();
      }
    });

    it(':shape[string] applies wrapper class for each enum value', () => {
      // validator
      const v = imageProps.shape.validator;
      expect(v(undefined)).toBeTruthy();
      expect(v(null)).toBeTruthy();
      expect(v('circle')).toBeTruthy();
      expect(v('round')).toBeTruthy();
      expect(v('square')).toBeTruthy();
      // @ts-expect-error 测试无效值
      expect(v('invalid')).toBeFalsy();

      for (const shape of ['circle', 'round', 'square'] as Array<TdImageProps['shape']>) {
        const iterWrapper = mountImage({ shape });
        expect(iterWrapper.classes()).toContain(`t-image__wrapper--shape-${shape}`);
        iterWrapper.unmount();
      }
    });

    it(':src[string] renders as img src attribute', () => {
      wrapper = mountImage({ src: DEFAULT_SRC });
      expect(wrapper.find('.t-image__wrapper').exists()).toBeTruthy();
      expect(wrapper.find('img').exists()).toBeTruthy();
      expect(wrapper.find('img').attributes('src')).toBe(DEFAULT_SRC);
    });

    it(':src[File] renders blob preview url via useImagePreviewUrl', async () => {
      const originalCreateObjectURL = global.URL.createObjectURL;
      global.URL.createObjectURL = vi.fn(() => 'blob:fake-preview-url');
      try {
        const file = new File(['mock'], 'test.png', { type: 'image/png' });
        wrapper = mount(() => <Image src={file} />);
        await sleep(20);
        await nextTick();
        expect(wrapper.find('img').exists()).toBeTruthy();
      } finally {
        global.URL.createObjectURL = originalCreateObjectURL;
      }
    });

    it(':src change resets hasError and isLoaded states', async () => {
      wrapper = mount(Image, { props: { src: ERROR_SRC } });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();

      // 切换到正常 src → watch 触发重置
      await wrapper.setProps({ src: DEFAULT_SRC });
      await sleep(30);
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeFalsy();
    });

    it(':srcset[object] renders picture with source tags', () => {
      wrapper = mountImage({
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
    });

    it(':srcset[empty object] falls back to plain img render', () => {
      wrapper = mountImage({ srcset: {} as TdImageProps['srcset'] });
      expect(wrapper.find('picture').exists()).toBeFalsy();
      expect(wrapper.find('img').exists()).toBeTruthy();
      expect(wrapper.find('img').attributes('src')).toBe(DEFAULT_SRC);
    });
  });

  describe('events', () => {
    let wrapper!: VueWrapper;
    afterEach(() => {
      wrapper?.unmount();
    });

    it('onLoad', async () => {
      const onLoadFn = vi.fn();
      wrapper = mountImage({ onLoad: onLoadFn });
      await nextTick();
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'load');
      await nextTick();
      expect(onLoadFn).toHaveBeenCalledTimes(1);
      expect(onLoadFn.mock.calls[0][0].e.type).toBe('load');
    });

    it('onError', async () => {
      const onErrorFn = vi.fn();
      wrapper = mountImage({ src: ERROR_SRC, onError: onErrorFn });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(onErrorFn).toHaveBeenCalledTimes(1);
      expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('.t-icon-image-error').exists()).toBeTruthy();
    });

    it('onClick', async () => {
      const fn = vi.fn();
      wrapper = mountImage({ onClick: fn });
      await wrapper.find('.t-image__wrapper').trigger('click');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn.mock.calls[0][0].e.type).toBe('click');
    });

    it('onClick not required (safe when undefined)', async () => {
      wrapper = mountImage();
      await expect(wrapper.find('.t-image__wrapper').trigger('click')).resolves.not.toThrow();
    });
  });

  describe('slots', () => {
    let wrapper!: VueWrapper;
    afterEach(() => {
      wrapper?.unmount();
    });

    it('#error slot renders custom error node', async () => {
      wrapper = mountImage({ src: ERROR_SRC }, { error: () => <span class="slot-error">自定义错误</span> });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      expect(wrapper.find('.slot-error').exists()).toBeTruthy();
      expect(wrapper.find('.slot-error').text()).toBe('自定义错误');
    });

    it('#loading slot renders custom loading node', () => {
      wrapper = mountImage({}, { loading: () => <span class="slot-loading">加载中</span> });
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      expect(wrapper.find('.slot-loading').exists()).toBeTruthy();
      expect(wrapper.find('.slot-loading').text()).toBe('加载中');
    });

    it('#overlayContent slot renders via camelCase and kebab-case', () => {
      // camelCase
      const wrapperCamel = mountImageWithoutSrc(
        {},
        { overlayContent: () => <span class="slot-overlay">浮层内容</span> },
      );
      expect(wrapperCamel.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapperCamel.find('.slot-overlay').exists()).toBeTruthy();
      wrapperCamel.unmount();

      // kebab-case
      wrapper = mountImageWithoutSrc({}, { 'overlay-content': () => <span class="slot-overlay-kebab">浮层</span> });
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.slot-overlay-kebab').exists()).toBeTruthy();
    });

    it('#placeholder slot renders custom placeholder node', () => {
      wrapper = mountImage({}, { placeholder: () => <span class="slot-placeholder">占位中</span> });
      expect(wrapper.find('.t-image__placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.slot-placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.slot-placeholder').text()).toBe('占位中');
    });
  });

  describe('interaction', () => {
    let wrapper!: VueWrapper;
    afterEach(() => {
      wrapper?.unmount();
    });

    it('wrapper renders default shape and image classes', () => {
      wrapper = mountImage();
      expect(wrapper.find('.t-image__wrapper').exists()).toBeTruthy();
      expect(wrapper.classes()).toContain('t-image__wrapper--shape-square');
      expect(wrapper.find('.t-image').exists()).toBeTruthy();
    });

    it('hasError hides img and renders error block', async () => {
      wrapper = mountImage({ src: ERROR_SRC });
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      // 出错后：img 不再渲染
      expect(wrapper.find('img').exists()).toBeFalsy();
      // 只保留 .t-image 占位 + .t-image__error
      expect(wrapper.find('.t-image').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
    });

    it('globalConfig.replaceImageSrc transforms src or falls back to original', async () => {
      const replaced = 'https://tdesign.gtimg.com/demo/replaced-image.png';

      // replaceImageSrc 为函数：src 被替换
      const wrapperReplaced = mountImageWithConfig({ replaceImageSrc: () => replaced });
      await nextTick();
      expect(wrapperReplaced.find('img').attributes('src')).toBe(replaced);
      wrapperReplaced.unmount();

      // replaceImageSrc 不是函数：回退到原始 src
      wrapper = mountImageWithConfig({ replaceImageSrc: 'not-a-function' });
      await nextTick();
      expect(wrapper.find('img').attributes('src')).toBe(DEFAULT_SRC);
    });

    it('globalConfig.loadingText / errorText fallback when loading/error prop not provided', async () => {
      wrapper = mountImageWithConfig({ loadingText: '全局加载中', errorText: '全局失败' }, { src: ERROR_SRC });
      // loading 区 — 使用 globalConfig.loadingText
      expect(wrapper.find('.t-image__loading').text()).toContain('全局加载中');
      simulateImageEvent(wrapper.find('img').element as HTMLImageElement, 'error');
      await nextTick();
      // error 区 — 使用 globalConfig.errorText
      expect(wrapper.find('.t-image__error').text()).toContain('全局失败');
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
        wrapper = mountImage({ onLoad });
        await nextTick();
        expect(onLoad).toHaveBeenCalledTimes(1);
        expect(onLoad.mock.calls[0][0].e.type).toBe('load');
        // 自动 load 后 loading 区块消失
        expect(wrapper.find('.t-image__loading').exists()).toBeFalsy();
      } finally {
        if (originalComplete) {
          Object.defineProperty(HTMLImageElement.prototype, 'complete', originalComplete);
        }
      }
    });

    it('no overlayContent renders no overlay node', () => {
      wrapper = mountImage();
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeFalsy();
    });

    it('no placeholder renders no placeholder node', () => {
      wrapper = mountImage();
      expect(wrapper.find('.t-image__placeholder').exists()).toBeFalsy();
    });
  });
});
