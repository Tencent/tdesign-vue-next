// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Image from '@tdesign/components/image';
import { getOverlayImageMount } from './mount';
import { simulateImageEvent } from '@tdesign/internal-tests/utils';
import { nextTick } from 'vue';

const src = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
const errorSrc = 'https://tdesign.gtimg.com/demo/demo-image-123123123.png';

describe('Image Component', () => {
  it('props.alt works fine', () => {
    const wrapper = mount(<Image alt={'text image load failed'} src={'https://www.error.img.com'}></Image>).find('img');
    expect(wrapper.attributes('alt')).toBe('text image load failed');
  });

  it('props.error works fine', async () => {
    const wrapper = mount(
      <Image error={() => <span class="custom-node">TNode</span>} src={'https://this.is.an.error.img.com'}></Image>,
    );
    const imgDom = wrapper.find('img').element;
    simulateImageEvent(imgDom, 'error');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.error works fine', async () => {
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

  ['contain', 'cover', 'fill', 'none', 'scale-down'].forEach((item) => {
    it(`props.fit is equal to ${item}`, () => {
      const wrapper = mount(<Image fit={item}></Image>).find('.t-image');
      expect(wrapper.classes(`t-image--fit-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.gallery works fine', () => {
    // gallery default value is false
    const wrapper1 = mount(<Image></Image>);
    expect(wrapper1.classes('t-image__wrapper--gallery')).toBeFalsy();
    // gallery = true
    const wrapper2 = mount(<Image gallery={true}></Image>);
    expect(wrapper2.classes('t-image__wrapper--gallery')).toBeTruthy();
    // gallery = false
    const wrapper3 = mount(<Image gallery={false}></Image>);
    expect(wrapper3.classes('t-image__wrapper--gallery')).toBeFalsy();
  });

  it('props.gallery works fine. `".t-image__gallery-shadow"` should exist', () => {
    const wrapper = mount(<Image gallery={true}></Image>);
    expect(wrapper.find('.t-image__gallery-shadow').exists()).toBeTruthy();
  });

  it('props.loading works fine', () => {
    const wrapper = mount(<Image loading={() => <span class="custom-node">TNode</span>}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.loading works fine', () => {
    const wrapper = mount(<Image v-slots={{ loading: () => <span class="custom-node">TNode</span> }}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.overlayContent works fine', () => {
    const wrapper = mount(<Image overlayContent={() => <span class="custom-node">TNode</span>}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.overlayContent works fine', () => {
    const wrapper = mount(<Image v-slots={{ overlayContent: () => <span class="custom-node">TNode</span> }}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('slots.overlay-content works fine', () => {
    const wrapper = mount(
      <Image v-slots={{ 'overlay-content': () => <span class="custom-node">TNode</span> }}></Image>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.overlayTrigger: show overlay content on hover', async () => {
    const wrapper = getOverlayImageMount({
      overlayTrigger: 'hover',
      src: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    });
    wrapper.find('.t-image__wrapper').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
    expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeFalsy();
    wrapper.find('.t-image__wrapper').trigger('mouseleave');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeTruthy();
  });

  it('props.placeholder works fine', () => {
    const wrapper = mount(<Image placeholder={() => <span class="custom-node">TNode</span>}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.placeholder works fine', () => {
    const wrapper = mount(<Image v-slots={{ placeholder: () => <span class="custom-node">TNode</span> }}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  const positionClassNameMap = {
    top: 't-image--position-top',
    bottom: 't-image--position-bottom',
    left: 't-image--position-left',
    right: 't-image--position-right',
    center: 't-image--position-center',
  };
  Object.entries(positionClassNameMap).forEach(([enumValue, expectedClassName]) => {
    it(`props.position is equal to ${enumValue}`, () => {
      let propValue = { true: true, false: false }[enumValue];
      propValue = propValue === undefined ? enumValue : propValue;
      const wrapper = mount(<Image position={propValue}></Image>).find('.t-image');
      expect(wrapper.classes(expectedClassName)).toBeTruthy();
    });
  });

  ['circle', 'round', 'square'].forEach((item) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = mount(<Image shape={item}></Image>).find('.t-image__wrapper');
      expect(wrapper.classes(`t-image__wrapper--shape-${item}`)).toBeTruthy();
    });
  });

  it(`props.srcset is equal to {'image/avif': 'https://tdesign.gtimg.com/img/tdesign-image.avif','image/webp': 'https://tdesign.gtimg.com/img/tdesign-image.webp'}`, () => {
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

  it('events.error works fine', async () => {
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

  it('events.load works fine', async () => {
    const onLoadFn1 = vi.fn();
    const wrapper = mount(<Image src={'https://tdesign.gtimg.com/demo/demo-image-1.png'} onLoad={onLoadFn1}></Image>);
    await wrapper.vm.$nextTick();
    const imgDom1 = wrapper.find('img').element;
    simulateImageEvent(imgDom1, 'load');
    await wrapper.vm.$nextTick();
    expect(onLoadFn1).toHaveBeenCalled();
    expect(onLoadFn1.mock.calls[0][0].e.type).toBe('load');
  });

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
