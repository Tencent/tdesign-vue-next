// @ts-nocheck
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Image from '@tdesign/components/image';
import ConfigProvider from '@tdesign/components/config-provider';
import imageProps from '@tdesign/components/image/props';
import { getOverlayImageMount } from './mount';
import { simulateImageEvent } from '@tdesign/internal-tests/utils';
import { sleep } from '@tdesign/internal-utils';

const src = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
const errorSrc = 'https://tdesign.gtimg.com/demo/demo-image-123123123.png';

describe('Image', () => {
  describe(':props', () => {
    it(':alt[string]', () => {
      // legacy: existing coverage
      const wrapper1 = mount(<Image alt={'text image load failed'} src={'https://www.error.img.com'}></Image>).find(
        'img',
      );
      expect(wrapper1.attributes('alt')).toBe('text image load failed');

      // modern format
      const wrapper2 = mount(() => <Image src={src} alt="图片描述" />);
      const img = wrapper2.find('.t-image__wrapper img');
      expect(img.element.getAttribute('alt')).toBe('图片描述');
    });

    it(':error[function] renders custom error node on load failure', async () => {
      const wrapper = mount(
        <Image error={() => <span class="custom-node">TNode</span>} src={'https://this.is.an.error.img.com'}></Image>,
      );
      const imgDom = wrapper.find('img').element;
      simulateImageEvent(imgDom, 'error');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':error[string] renders string text on load failure', async () => {
      const wrapper = mount(() => <Image src={errorSrc} error="加载失败" />);
      const imgDom = wrapper.find('img').element;
      simulateImageEvent(imgDom, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__error').text()).toContain('加载失败');
    });

    it(':error[default] with no src change keeps ui clean', async () => {
      const wrapper = mount(() => <Image src={errorSrc} error="error" />);
      wrapper.setProps({ src });
      const img = wrapper.find('.t-image__wrapper img');
      await nextTick();
      await nextTick();
      expect(wrapper.emitted('error')).toBeUndefined();
      expect(img.exists()).toBeTruthy();
      expect(wrapper.find('.t-image__error').exists()).toBeFalsy();
    });

    it(':fallback[string] switches src to fallback on error', async () => {
      const fallbackUrl = 'https://tdesign.gtimg.com/demo/demo-image-fallback.png';
      const wrapper = mount(() => <Image src={errorSrc} fallback={fallbackUrl} />);
      await nextTick();
      const img = wrapper.find('img');
      simulateImageEvent(img.element, 'error');
      await nextTick();
      // fallback 命中后 hasError 会被重置为 false，不展示 error 区块
      expect(wrapper.find('.t-image__error').exists()).toBeFalsy();
      // src 切换到 fallback
      expect(wrapper.find('img').attributes('src')).toBe(fallbackUrl);
    });

    it(':fallback[empty] keeps error ui when fallback not provided', async () => {
      const wrapper = mount(() => <Image src={errorSrc} />);
      await nextTick();
      const img = wrapper.find('img');
      simulateImageEvent(img.element, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
    });

    it(':fit[string] applies class for each enum value', () => {
      const fitList = ['contain', 'cover', 'fill', 'none', 'scale-down'];
      fitList.forEach((fit) => {
        const wrapper = mount(() => <Image src={src} fit={fit} />);
        const img = wrapper.find('.t-image__wrapper img');
        expect(img.classes()).toContain(`t-image--fit-${fit}`);
      });
    });

    it(':fit[string] snapshot per enum value', () => {
      ['contain', 'cover', 'fill', 'none', 'scale-down'].forEach((item) => {
        const wrapper = mount(<Image fit={item}></Image>).find('.t-image');
        expect(wrapper.classes(`t-image--fit-${item}`)).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it(':fit validator covers undefined/valid/invalid', () => {
      const v = imageProps.fit.validator;
      expect(v(undefined)).toBe(true);
      expect(v('cover')).toBe(true);
      // @ts-expect-error
      expect(v('invalid')).toBe(false);
    });

    it(':gallery[boolean] toggles gallery wrapper class', () => {
      // default (false)
      const wrapper1 = mount(<Image></Image>);
      expect(wrapper1.classes('t-image__wrapper--gallery')).toBeFalsy();
      // true
      const wrapper2 = mount(<Image gallery={true}></Image>);
      expect(wrapper2.classes('t-image__wrapper--gallery')).toBeTruthy();
      // false
      const wrapper3 = mount(<Image gallery={false}></Image>);
      expect(wrapper3.classes('t-image__wrapper--gallery')).toBeFalsy();
      // modern format
      const wrapper4 = mount(() => <Image src={src} gallery />);
      expect(wrapper4.classes()).toContain('t-image__wrapper--gallery');
    });

    it(':gallery[boolean] renders gallery shadow node', () => {
      const wrapper = mount(<Image gallery={true}></Image>);
      expect(wrapper.find('.t-image__gallery-shadow').exists()).toBeTruthy();
    });

    it(':lazy[false] renders img immediately', async () => {
      const wrapper = mount(() => <Image src={src} lazy={false} />);
      await nextTick();
      expect(wrapper.find('img').exists()).toBeTruthy();
    });

    it(':lazy[true] observes intersection and renders after entering viewport', async () => {
      // mock IntersectionObserver before mount
      const observeSpy = vi.fn();
      const unobserveSpy = vi.fn();
      const intersectCallbacks: Array<(entries: any[]) => void> = [];
      class MockIO {
        public observe = observeSpy;
        public unobserve = unobserveSpy;
        public disconnect = vi.fn();
        public takeRecords = vi.fn();
        public root = null;
        public rootMargin = '';
        public thresholds: number[] = [];
        constructor(cb: (entries: any[]) => void) {
          intersectCallbacks.push(cb);
        }
      }
      const originalIO = window.IntersectionObserver;
      // @ts-ignore
      window.IntersectionObserver = MockIO as any;

      try {
        const wrapper = mount(() => <Image src={src} lazy />);
        await nextTick();
        // 初始未进入视口：img 不渲染
        expect(wrapper.find('img').exists()).toBeFalsy();
        expect(observeSpy).toHaveBeenCalled();

        // 触发进入视口：shouldLoad 变 true
        intersectCallbacks.forEach((cb) => cb([{ isIntersecting: true }]));
        await nextTick();
        expect(wrapper.find('img').exists()).toBeTruthy();

        wrapper.unmount();
        // unmount 时 io.unobserve 被触发
        // 注：observe 工具内部会在 isIntersecting 时也 unobserve 一次
        expect(unobserveSpy).toHaveBeenCalled();
      } finally {
        // @ts-ignore
        window.IntersectionObserver = originalIO;
      }
    });

    it(':lazy[true] falls back to immediate load when IO unavailable', async () => {
      // jsdom 默认无 IntersectionObserver → observe 会直接调用 callback
      const originalIO = window.IntersectionObserver;
      // @ts-ignore
      delete window.IntersectionObserver;
      try {
        const wrapper = mount(() => <Image src={src} lazy />);
        await nextTick();
        expect(wrapper.find('img').exists()).toBeTruthy();
      } finally {
        // @ts-ignore
        window.IntersectionObserver = originalIO;
      }
    });

    it(':loading[function] renders custom loading node', () => {
      const wrapper = mount(<Image loading={() => <span class="custom-node">TNode</span>}></Image>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':loading[string] renders string text in loading area', () => {
      const wrapper = mount(() => <Image src={src} loading="加载中..." />);
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__loading').text()).toContain('加载中...');
    });

    it(':overlayContent[function]', () => {
      const wrapper = mount(<Image overlayContent={() => <span class="custom-node">TNode</span>}></Image>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':overlayContent[string]', () => {
      const wrapper = mount(() => <Image src={src} overlayContent="悬浮内容" />);
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').text()).toBe('悬浮内容');
    });

    it(':overlayTrigger[always] shows overlay by default', () => {
      const wrapper = mount(() => <Image src={src} overlayContent="悬浮内容" />);
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeFalsy();
    });

    it(':overlayTrigger[hover] toggles overlay on mouse events', async () => {
      const wrapper = getOverlayImageMount({ overlayTrigger: 'hover', src });
      wrapper.find('.t-image__wrapper').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeFalsy();
      wrapper.find('.t-image__wrapper').trigger('mouseleave');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeTruthy();
    });

    it(':overlayTrigger[hover] applies need-hover wrapper class', async () => {
      const wrapper = mount(() => <Image src={src} overlayContent="悬浮内容" overlayTrigger="hover" />);
      expect(wrapper.classes()).toContain('t-image__wrapper--need-hover');
      await wrapper.trigger('mouseenter');
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').text()).toBe('悬浮内容');
      await wrapper.trigger('mouseleave');
      expect(wrapper.find('.t-image__overlay-content').classes()).toContain('t-image__overlay-content--hidden');
    });

    it(':overlayTrigger validator covers undefined/valid/invalid', () => {
      const v = imageProps.overlayTrigger.validator;
      expect(v(undefined)).toBe(true);
      expect(v('always')).toBe(true);
      expect(v('hover')).toBe(true);
      // @ts-expect-error
      expect(v('invalid')).toBe(false);
    });

    it(':placeholder[function]', () => {
      const wrapper = mount(<Image placeholder={() => <span class="custom-node">TNode</span>}></Image>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':placeholder[string]', () => {
      const wrapper = mount(() => <Image src={src} placeholder="加载中..." />);
      expect(wrapper.find('.t-image__placeholder').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__placeholder').text()).toBe('加载中...');
    });

    it(':position[string] applies class for each enum value', () => {
      const positionList = ['top', 'right', 'bottom', 'left', 'center'];
      positionList.forEach((position) => {
        const wrapper = mount(() => <Image src={src} position={position} />);
        const img = wrapper.find('.t-image__wrapper img');
        expect(img.classes()).toContain(`t-image--position-${position}`);
      });
    });

    it(':position[string] class mapping matches expected', () => {
      const positionClassNameMap = {
        top: 't-image--position-top',
        bottom: 't-image--position-bottom',
        left: 't-image--position-left',
        right: 't-image--position-right',
        center: 't-image--position-center',
      };
      Object.entries(positionClassNameMap).forEach(([enumValue, expectedClassName]) => {
        const wrapper = mount(<Image position={enumValue}></Image>).find('.t-image');
        expect(wrapper.classes(expectedClassName)).toBeTruthy();
      });
    });

    it(':referrerpolicy[string] applies attribute for each enum value', () => {
      const policies = [
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
        const wrapper = mount(() => <Image src={src} referrerpolicy={policy} />);
        expect(wrapper.find('img').attributes('referrerpolicy')).toBe(policy);
      });
    });

    it(':referrerpolicy validator covers undefined/valid/invalid', () => {
      const v = imageProps.referrerpolicy.validator;
      expect(v(undefined)).toBe(true);
      expect(v('no-referrer')).toBe(true);
      // @ts-expect-error
      expect(v('invalid')).toBe(false);
    });

    it(':shape[string] applies wrapper class for each enum value', () => {
      ['circle', 'round', 'square'].forEach((item) => {
        const wrapper = mount(<Image shape={item}></Image>).find('.t-image__wrapper');
        expect(wrapper.classes(`t-image__wrapper--shape-${item}`)).toBeTruthy();
      });
      const shapeList = ['circle', 'round', 'square'];
      shapeList.forEach((shape) => {
        const wrapper = mount(() => <Image src={src} shape={shape} />);
        expect(wrapper.classes()).toContain(`t-image__wrapper--shape-${shape}`);
      });
    });

    it(':shape validator covers undefined/valid/invalid', () => {
      const v = imageProps.shape.validator;
      expect(v(undefined)).toBe(true);
      expect(v('circle')).toBe(true);
      // @ts-expect-error
      expect(v('invalid')).toBe(false);
    });

    it(':src[string] renders as img src attribute', () => {
      const wrapper = mount({
        render() {
          return <Image src={src} />;
        },
      });
      expect(wrapper.find('.t-image__wrapper').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__wrapper img').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__wrapper img').element.getAttribute('src')).toBe(src);
    });

    it(':src[File] renders blob preview url via useImagePreviewUrl', async () => {
      const originalCreateObjectURL = global.URL.createObjectURL;
      global.URL.createObjectURL = vi.fn(() => 'blob:fake-preview-url');
      try {
        const file = new File(['mock'], 'test.png', { type: 'image/png' });
        const wrapper = mount(() => <Image src={file} />);
        // 等待 useImagePreviewUrl 内部 Promise 解析
        await sleep(20);
        await nextTick();
        expect(wrapper.find('img').exists()).toBeTruthy();
      } finally {
        global.URL.createObjectURL = originalCreateObjectURL;
      }
    });

    it(':src change resets hasError and isLoaded states', async () => {
      // 挂载 error src → 触发 error → hasError=true
      const wrapper = mount(Image, { props: { src: errorSrc } });
      simulateImageEvent(wrapper.find('img').element, 'error');
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      // 切换到正常 src → previewUrl 变化 → watch 触发重置
      await wrapper.setProps({ src });
      await sleep(30);
      await nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeFalsy();
    });

    it(':srcset[object] renders picture with source tags', () => {
      const wrapper = mount(
        <Image
          srcset={{
            'image/avif': 'https://tdesign.gtimg.com/img/tdesign-image.avif',
            'image/webp': 'https://tdesign.gtimg.com/img/tdesign-image.webp',
          }}
        ></Image>,
      );
      const domWrapper = wrapper.find('picture > source');
      expect(domWrapper.attributes('srcset')).toBe('https://tdesign.gtimg.com/img/tdesign-image.avif');
      const domWrapper1 = wrapper.find('picture > source:nth-child(2)');
      expect(domWrapper1.attributes('srcset')).toBe('https://tdesign.gtimg.com/img/tdesign-image.webp');
    });

    it(':srcset[empty object] falls back to plain img render', () => {
      const wrapper = mount(() => <Image src={src} srcset={{}} />);
      expect(wrapper.find('picture').exists()).toBeFalsy();
      expect(wrapper.find('img').exists()).toBeTruthy();
      expect(wrapper.find('img').attributes('src')).toBe(src);
    });
  });

  describe('@events', () => {
    it(':onError callback invoked with event context', async () => {
      const onErrorFn = vi.fn();
      const wrapper = mount(<Image src={'https://load-failed-img.png'} onError={onErrorFn}></Image>);
      const imgDom = wrapper.find('img').element;
      simulateImageEvent(imgDom, 'error');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('.t-icon-image-error').exists()).toBeTruthy();
      expect(onErrorFn).toHaveBeenCalled();
      expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
    });

    it(':onError triggered via DOM event dispatch', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Image src={errorSrc} onError={fn} />);
      const img = wrapper.find('.t-image__wrapper img');
      await nextTick();
      await img.trigger('error');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onLoad callback invoked with event context', async () => {
      const onLoadFn = vi.fn();
      const wrapper = mount(<Image src={src} onLoad={onLoadFn}></Image>);
      await wrapper.vm.$nextTick();
      const imgDom = wrapper.find('img').element;
      simulateImageEvent(imgDom, 'load');
      await wrapper.vm.$nextTick();
      expect(onLoadFn).toHaveBeenCalled();
      expect(onLoadFn.mock.calls[0][0].e.type).toBe('load');
    });

    it(':onLoad triggered via DOM event dispatch', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Image src={src} onLoad={fn} />);
      const img = wrapper.find('.t-image__wrapper img');
      await nextTick();
      await img.trigger('load');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onClick triggers on wrapper click with event context', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Image src={src} onClick={fn} />);
      await wrapper.find('.t-image__wrapper').trigger('click');
      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0][0].e.type).toBe('click');
    });

    it(':onClick not required (safe when undefined)', async () => {
      const wrapper = mount(() => <Image src={src} />);
      // 不应抛错
      await expect(wrapper.find('.t-image__wrapper').trigger('click')).resolves.not.toThrow();
    });
  });

  describe('#slots', () => {
    it('#error slot renders custom error node', async () => {
      const wrapper = mount(
        <Image
          v-slots={{ error: () => <span class="custom-node">TNode</span> }}
          src={'https://this.is.an.error.img.com'}
        ></Image>,
      );
      const imgDom = wrapper.find('img').element;
      simulateImageEvent(imgDom, 'error');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it('#loading slot renders custom loading node', () => {
      const wrapper = mount(<Image v-slots={{ loading: () => <span class="custom-node">TNode</span> }}></Image>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#overlayContent slot (camelCase)', () => {
      const wrapper = mount(<Image v-slots={{ overlayContent: () => <span class="custom-node">TNode</span> }}></Image>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#overlay-content slot (kebab-case)', () => {
      const wrapper = mount(
        <Image v-slots={{ 'overlay-content': () => <span class="custom-node">TNode</span> }}></Image>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#placeholder slot renders custom placeholder node', () => {
      const wrapper = mount(<Image v-slots={{ placeholder: () => <span class="custom-node">TNode</span> }}></Image>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('interaction', () => {
    it('wrapper renders shape wrapper and image classes', () => {
      const wrapper = mount(() => <Image src={src} />);
      expect(wrapper.find('.t-image__wrapper').exists()).toBeTruthy();
      expect(wrapper.find('.t-image__wrapper--shape-square').exists()).toBeTruthy();
      expect(wrapper.find('.t-image').exists()).toBeTruthy();
    });

    it('hasError renders empty image placeholder block (no picture/img)', async () => {
      const wrapper = mount(() => <Image src={errorSrc} />);
      simulateImageEvent(wrapper.find('img').element, 'error');
      await nextTick();
      // 出错后：img 不再渲染，只保留 .t-image 占位 + .t-image__error
      expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
      expect(wrapper.find('img').exists()).toBeFalsy();
    });

    it('loading block hidden after load event', async () => {
      const wrapper = mount(() => <Image src={src} />);
      await nextTick();
      expect(wrapper.find('.t-image__loading').exists()).toBeTruthy();
      await wrapper.find('img').trigger('load');
      await nextTick();
      expect(wrapper.find('.t-image__loading').exists()).toBeFalsy();
    });

    it('globalConfig.replaceImageSrc transforms src via ConfigProvider', async () => {
      const replaced = 'https://tdesign.gtimg.com/demo/replaced-image.png';
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ image: { replaceImageSrc: () => replaced } }}>
          <Image src={src} />
        </ConfigProvider>
      ));
      await nextTick();
      expect(wrapper.find('img').attributes('src')).toBe(replaced);
    });

    it('globalConfig.replaceImageSrc not a function falls back to original src', async () => {
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ image: { replaceImageSrc: 'not-a-function' as any } }}>
          <Image src={src} />
        </ConfigProvider>
      ));
      await nextTick();
      expect(wrapper.find('img').attributes('src')).toBe(src);
    });

    it('globalConfig.loadingText / errorText fallback when loading/error prop not provided', async () => {
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ image: { loadingText: '全局加载中', errorText: '全局失败' } as any }}>
          <Image src={errorSrc} />
        </ConfigProvider>
      ));
      // loading 区 — 使用 globalConfig.loadingText
      expect(wrapper.find('.t-image__loading').text()).toContain('全局加载中');
      simulateImageEvent(wrapper.find('img').element, 'error');
      await nextTick();
      // error 区 — 使用 globalConfig.errorText
      expect(wrapper.find('.t-image__error').text()).toContain('全局失败');
    });

    it('img.complete=true on mount triggers auto load (covers nuxt3 workaround)', async () => {
      // 预先 stub imgRef.complete 为 true
      const originalComplete = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete');
      Object.defineProperty(HTMLImageElement.prototype, 'complete', {
        configurable: true,
        get() {
          return true;
        },
      });
      try {
        const onLoad = vi.fn();
        const wrapper = mount(() => <Image src={src} onLoad={onLoad} />);
        await nextTick();
        expect(onLoad).toHaveBeenCalled();
        expect(onLoad.mock.calls[0][0].e.type).toBe('load');
        // 自动 load 后 loading 区块消失
        expect(wrapper.find('.t-image__loading').exists()).toBeFalsy();
      } finally {
        if (originalComplete) {
          Object.defineProperty(HTMLImageElement.prototype, 'complete', originalComplete);
        } else {
          // @ts-ignore
          delete (HTMLImageElement.prototype as any).complete;
        }
      }
    });

    it('lazy + divRef missing short-circuits without observer setup', async () => {
      // 即 lazy=true 但 divRef 返回 null 时的分支：实际 mount 下 divRef 不会为 null,
      // 用 window.IntersectionObserver = undefined 触发 observe 工具回调 fallback
      const originalIO = window.IntersectionObserver;
      // @ts-ignore
      window.IntersectionObserver = undefined;
      try {
        const wrapper = mount(() => <Image src={src} lazy />);
        await nextTick();
        // observe 工具在无 IO 时直接 callback → shouldLoad=true → img 渲染
        expect(wrapper.find('img').exists()).toBeTruthy();
      } finally {
        // @ts-ignore
        window.IntersectionObserver = originalIO;
      }
    });
  });
});
