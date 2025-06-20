// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Button } from '@tdesign/components/button';

describe('Button Component', () => {
  it('props.block works fine', () => {
    // block default value is false
    const wrapper1 = mount(<Button>Text</Button>);
    expect(wrapper1.classes('t-size-full-width')).toBeFalsy();
    // block = true
    const wrapper2 = mount(<Button block={true}>Text</Button>);
    expect(wrapper2.classes('t-size-full-width')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // block = false
    const wrapper3 = mount(<Button block={false}>Text</Button>);
    expect(wrapper3.classes('t-size-full-width')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.content works fine', () => {
    const wrapper = mount(<Button content={() => <span class="custom-node">TNode</span>}></Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<Button v-slots={{ content: () => <span class="custom-node">TNode</span> }}></Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<Button default={() => <span class="custom-node">TNode</span>}></Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<Button v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.disabled works fine', () => {
    // disabled default value is false
    const wrapper1 = mount(<Button>Text</Button>);
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<Button disabled={true}>Text</Button>);
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // disabled = false
    const wrapper3 = mount(<Button disabled={false}>Text</Button>);
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.ghost works fine', () => {
    // ghost default value is false
    const wrapper1 = mount(<Button>Text</Button>);
    expect(wrapper1.classes('t-button--ghost')).toBeFalsy();
    // ghost = true
    const wrapper2 = mount(<Button ghost={true}>Text</Button>);
    expect(wrapper2.classes('t-button--ghost')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // ghost = false
    const wrapper3 = mount(<Button ghost={false}>Text</Button>);
    expect(wrapper3.classes('t-button--ghost')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.href works fine', () => {
    const wrapper = mount(<Button href={'https://tdesign.tencent.com/'}>Text</Button>);
    expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com/');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.icon works fine', () => {
    const wrapper = mount(<Button icon={() => <span class="custom-node">TNode</span>}>Text</Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.icon works fine', () => {
    const wrapper = mount(<Button v-slots={{ icon: () => <span class="custom-node">TNode</span> }}>Text</Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.loading works fine', () => {
    // loading default value is false
    const wrapper1 = mount(<Button>Text</Button>);
    expect(wrapper1.classes('t-is-loading')).toBeFalsy();
    // loading = true
    const wrapper2 = mount(<Button loading={true}>Text</Button>);
    expect(wrapper2.classes('t-is-loading')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // loading = false
    const wrapper3 = mount(<Button loading={false}>Text</Button>);
    expect(wrapper3.classes('t-is-loading')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.loading: Button contains element `.t-loading`', () => {
    // loading default value is false
    const wrapper = mount(<Button>Text</Button>);
    expect(wrapper.find('.t-loading').exists()).toBeFalsy();
    // loading = false
    const wrapper1 = mount(<Button loading={false}>Text</Button>);
    expect(wrapper1.find('.t-loading').exists()).toBeFalsy();
    // loading = true
    const wrapper2 = mount(<Button loading={true}>Text</Button>);
    expect(wrapper2.find('.t-loading').exists()).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
  });

  const shapeClassNameList = [
    't-button--shape-rectangle',
    't-button--shape-square',
    't-button--shape-round',
    't-button--shape-circle',
  ];
  ['rectangle', 'square', 'round', 'circle'].forEach((item, index) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = mount(<Button shape={item}>Text</Button>);
      if (typeof shapeClassNameList[index] === 'string') {
        expect(wrapper.classes(shapeClassNameList[index])).toBeTruthy();
      } else if (typeof shapeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(shapeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount(<Button size={item}>Text</Button>);
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.suffix works fine', () => {
    const wrapper = mount(<Button suffix={() => <span class="custom-node">TNode</span>}>Text</Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffix works fine', () => {
    const wrapper = mount(<Button v-slots={{ suffix: () => <span class="custom-node">TNode</span> }}>Text</Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  const tagExpectedDom = ['button', 'a', 'div'];
  ['button', 'a', 'div'].forEach((item, index) => {
    it(`props.tag is equal to ${item}`, () => {
      const wrapper = mount(<Button tag={item}>Text</Button>);
      expect(wrapper.find(tagExpectedDom[index]).exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  ['default', 'primary', 'danger', 'warning', 'success'].forEach((item) => {
    it(`props.theme is equal to ${item}`, () => {
      const wrapper = mount(<Button theme={item}>Text</Button>);
      expect(wrapper.classes(`t-button--theme-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  const attributeValues = ['submit', 'reset', 'button'];
  ['submit', 'reset', 'button'].forEach((item, index) => {
    it(`props.type is equal to ${item}`, () => {
      const wrapper = mount(<Button type={item}></Button>);
      expect(wrapper.attributes('type')).toBe(attributeValues[index]);
    });
  });

  ['base', 'outline', 'dashed', 'text'].forEach((item) => {
    it(`props.variant is equal to ${item}`, () => {
      const wrapper = mount(<Button variant={item}>Text</Button>);
      expect(wrapper.classes(`t-button--variant-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('Button Event: click', async () => {
    const fn = vi.fn();
    const wrapper = mount(<Button onClick={fn}></Button>);
    wrapper.findComponent(Button).trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].stopPropagation).toBeTruthy();
    expect(fn.mock.calls[0][0].type).toBe('click');
  });
});
