import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Link, LinkProps } from '@tdesign/components/link';

describe('Link', () => {
  describe('props', () => {
    it('content[function]', () => {
      const wrapper = mount(<Link content={() => 'content test'}></Link>);
      expect(wrapper.find('.t-link').text()).toBe('content test');
    });

    it('content[slot]', () => {
      const wrapper = mount(<Link v-slots={{ content: () => 'content test' }}></Link>);
      expect(wrapper.find('.t-link').text()).toBe('content test');
    });

    it('default[function]', () => {
      const wrapper = mount(<Link default={() => 'default test'}></Link>);
      expect(wrapper.find('.t-link').text()).toBe('default test');
    });

    it('default[slot]', () => {
      const wrapper = mount(<Link v-slots={{ default: () => 'default test' }}></Link>);
      expect(wrapper.find('.t-link').text()).toBe('default test');
    });

    it('disabled[boolean]', () => {
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

    it('hover[string]', () => {
      const hoverList: Array<LinkProps['hover']> = ['color', 'underline'];
      hoverList.forEach((item) => {
        const wrapper = mount(<Link hover={item}>Text</Link>);
        expect(wrapper.classes(`t-link--hover-${item}`)).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it('href[string]', () => {
      const wrapper = mount(<Link href={'https://tdesign.tencent.com/'}>Text</Link>);
      expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com/');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('prefixIcon[function]', () => {
      const wrapper = mount(<Link prefixIcon={() => 'prefixIcon'}></Link>);
      expect(wrapper.find('.t-link__prefix-icon').text()).toBe('prefixIcon');
    });

    it('prefixIcon[slot]', () => {
      const wrapper = mount(<Link v-slots={{ prefixIcon: () => 'prefixIcon' }}></Link>);
      expect(wrapper.find('.t-link__prefix-icon').text()).toBe('prefixIcon');
    });

    it('prefix-icon[slot]', () => {
      const wrapper = mount(<Link v-slots={{ 'prefix-icon': () => 'prefixIcon' }}></Link>);
      expect(wrapper.find('.t-link__prefix-icon').text()).toBe('prefixIcon');
    });

    it('size[string]', () => {
      const wrapperSmall = mount(<Link size={'small'}>Text</Link>);
      expect(wrapperSmall.classes('t-size-s')).toBeTruthy();

      const wrapperMedium = mount(<Link size={'medium'}>Text</Link>);
      expect(wrapperMedium.classes('t-size-m')).toBeFalsy();

      const wrapperLarge = mount(<Link size={'large'}>Text</Link>);
      expect(wrapperLarge.classes('t-size-l')).toBeTruthy();
    });

    it('suffixIcon[function]', () => {
      const wrapper = mount(<Link suffixIcon={() => 'suffixIcon'}></Link>);
      expect(wrapper.find('.t-link__suffix-icon').text()).toBe('suffixIcon');
    });

    it('suffixIcon[slot]', () => {
      const wrapper = mount(<Link v-slots={{ suffixIcon: () => 'suffixIcon' }}></Link>);
      expect(wrapper.find('.t-link__suffix-icon').text()).toBe('suffixIcon');
    });
    it('suffix-icon[slot]', () => {
      const wrapper = mount(<Link v-slots={{ 'suffix-icon': () => 'suffix-icon' }}></Link>);
      expect(wrapper.find('.t-link__suffix-icon').text()).toBe('suffix-icon');
    });

    it('target[string]', () => {
      const wrapper = mount(<Link target={'_blank'}>Text</Link>);
      expect(wrapper.attributes('target')).toBe('_blank');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('theme[string]', () => {
      const themeList: Array<LinkProps['theme']> = ['default', 'primary', 'danger', 'warning', 'success'];
      themeList.forEach((item) => {
        const wrapper = mount(<Link theme={item}>Text</Link>);
        expect(wrapper.classes(`t-link--theme-${item}`)).toBeTruthy();
      });
    });

    it('underline[boolean]', () => {
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
  });
  describe('event', () => {
    it('onClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Link onClick={fn}></Link>);
      wrapper.findComponent(Link).trigger('click');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0][0].stopPropagation).toBeTruthy();
      expect(fn.mock.calls[0][0].type).toBe('click');
    });
  });
});
