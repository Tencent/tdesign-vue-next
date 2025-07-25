// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Link } from '@tdesign/components/link';

describe('Link Component', () => {
  it('props.content works fine', () => {
    const wrapper = mount(<Link content={() => <span class="custom-node">TNode</span>}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<Link v-slots={{ content: () => <span class="custom-node">TNode</span> }}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<Link default={() => <span class="custom-node">TNode</span>}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<Link v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.disabled works fine', () => {
    // disabled default value is
    const wrapper1 = mount(<Link>Text</Link>);
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<Link disabled={true}>Text</Link>);
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // disabled = false
    const wrapper3 = mount(<Link disabled={false}>Text</Link>);
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  ['color', 'underline'].forEach((item) => {
    it(`props.hover is equal to ${item}`, () => {
      const wrapper = mount(<Link hover={item}>Text</Link>);
      expect(wrapper.classes(`t-link--hover-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.href works fine', () => {
    const wrapper = mount(<Link href={'https://tdesign.tencent.com/'}>Text</Link>);
    expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com/');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.prefixIcon works fine', () => {
    const wrapper = mount(<Link prefixIcon={() => <span class="custom-node">TNode</span>}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.prefixIcon works fine', () => {
    const wrapper = mount(<Link v-slots={{ prefixIcon: () => <span class="custom-node">TNode</span> }}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.prefix-icon works fine', () => {
    const wrapper = mount(<Link v-slots={{ 'prefix-icon': () => <span class="custom-node">TNode</span> }}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount(<Link size={item}>Text</Link>);
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.suffixIcon works fine', () => {
    const wrapper = mount(<Link suffixIcon={() => <span class="custom-node">TNode</span>}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffixIcon works fine', () => {
    const wrapper = mount(<Link v-slots={{ suffixIcon: () => <span class="custom-node">TNode</span> }}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.suffix-icon works fine', () => {
    const wrapper = mount(<Link v-slots={{ 'suffix-icon': () => <span class="custom-node">TNode</span> }}></Link>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.target works fine', () => {
    const wrapper = mount(<Link target={'_blank'}>Text</Link>);
    expect(wrapper.attributes('target')).toBe('_blank');
    expect(wrapper.element).toMatchSnapshot();
  });

  ['default', 'primary', 'danger', 'warning', 'success'].forEach((item) => {
    it(`props.theme is equal to ${item}`, () => {
      const wrapper = mount(<Link theme={item}>Text</Link>);
      expect(wrapper.classes(`t-link--theme-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.underline works fine', () => {
    // underline default value is
    const wrapper1 = mount(<Link>Text</Link>);
    expect(wrapper1.classes('t-is-underline')).toBeFalsy();
    // underline = true
    const wrapper2 = mount(<Link underline={true}>Text</Link>);
    expect(wrapper2.classes('t-is-underline')).toBeTruthy();
    // underline = false
    const wrapper3 = mount(<Link underline={false}>Text</Link>);
    expect(wrapper3.classes('t-is-underline')).toBeFalsy();
  });

  it('Link Event: click', async () => {
    const fn = vi.fn();
    const wrapper = mount(<Link onClick={fn}></Link>);
    wrapper.findComponent(Link).trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].stopPropagation).toBeTruthy();
    expect(fn.mock.calls[0][0].type).toBe('click');
  });
});
