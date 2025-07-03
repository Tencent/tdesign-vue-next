import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { BackTop } from '@tdesign/components/back-top';

describe('BackTop Component', () => {
  it('props.content works fine', () => {
    const wrapper = mount(<BackTop content={() => <span class="custom-node">TNode</span>}></BackTop>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<BackTop v-slots={{ content: () => <span class="custom-node">TNode</span> }}></BackTop>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<BackTop default={() => <span class="custom-node">TNode</span>}></BackTop>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<BackTop v-slots={{ default: () => <span class="custom-node">TNode</span> }}></BackTop>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  const shapeList = ['circle', 'square'] as const;
  shapeList.forEach((item) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = mount(<BackTop shape={item}></BackTop>);
      expect(wrapper.classes(`t-back-top--${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  const sizeClassNameList = ['t-size-s', 't-size-m'];
  const sizeList = ['small', 'medium'] as const;
  sizeList.forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount(<BackTop size={item}>BackTop</BackTop>);
      expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  const themeList = ['light', 'primary', 'dark'] as const;
  themeList.forEach((item) => {
    it(`props.theme is equal to ${item}`, () => {
      const wrapper = mount(<BackTop theme={item}>Text</BackTop>);
      expect(wrapper.classes(`t-back-top--theme-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('events.click works fine', async () => {
    const fn = vi.fn();
    const wrapper = mount(<BackTop onClick={fn}></BackTop>);
    wrapper.findComponent(BackTop).trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
  });
});
