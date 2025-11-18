// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Button } from '@tdesign/components/button';
import props from '@tdesign/components/button/props';

describe('Button', () => {
  describe('props', () => {
    it(':block[true/false]', () => {
      // default
      const wrapper1 = mount(<Button>Text</Button>);
      expect(wrapper1.classes('t-size-full-width')).toBeFalsy();

      // true
      const wrapper2 = mount(<Button block={true}>Text</Button>);
      expect(wrapper2.classes('t-size-full-width')).toBeTruthy();
      expect(wrapper2.element).toMatchSnapshot();

      // false
      const wrapper3 = mount(<Button block={false}>Text</Button>);
      expect(wrapper3.classes('t-size-full-width')).toBeFalsy();
      expect(wrapper3.element).toMatchSnapshot();
    });

    it(':content[string/function]', () => {
      // string
      const wrapperString = mount(<Button content="Button Text" />);
      expect(wrapperString.text()).toBe('Button Text');
      expect(wrapperString.element).toMatchSnapshot('content-string');

      // function
      const wrapperFunction = mount(<Button content={() => <span class="custom-node">TNode</span>}></Button>);
      expect(wrapperFunction.find('.custom-node').exists()).toBeTruthy();
      expect(wrapperFunction.element).toMatchSnapshot('content-function');
    });

    it(':default[string/function]', () => {
      // string
      const wrapperString = mount(<Button default="Button Text" />);
      expect(wrapperString.text()).toBe('Button Text');
      expect(wrapperString.element).toMatchSnapshot('default-string');

      // function
      const wrapperFunction = mount(<Button default={() => <span class="custom-node">TNode</span>}></Button>);
      expect(wrapperFunction.find('.custom-node').exists()).toBeTruthy();
      expect(wrapperFunction.element).toMatchSnapshot('default-function');
    });

    it(':disabled[true/false]', () => {
      // default
      const wrapper1 = mount(<Button>Text</Button>);
      expect(wrapper1.classes('t-is-disabled')).toBeFalsy();

      // true
      const wrapper2 = mount(<Button disabled={true}>Text</Button>);
      expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
      expect(wrapper2.element).toMatchSnapshot();

      // false
      const wrapper3 = mount(<Button disabled={false}>Text</Button>);
      expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
      expect(wrapper3.element).toMatchSnapshot();
    });

    it(':ghost[true/false]', () => {
      // default
      const wrapper1 = mount(<Button>Text</Button>);
      expect(wrapper1.classes('t-button--ghost')).toBeFalsy();

      // true
      const wrapper2 = mount(<Button ghost={true}>Text</Button>);
      expect(wrapper2.classes('t-button--ghost')).toBeTruthy();
      expect(wrapper2.element).toMatchSnapshot();

      // false
      const wrapper3 = mount(<Button ghost={false}>Text</Button>);
      expect(wrapper3.classes('t-button--ghost')).toBeFalsy();
      expect(wrapper3.element).toMatchSnapshot();
    });

    it(':form[string]', () => {
      const wrapper = mount(<Button form="test-form">Text</Button>);
      expect(wrapper.attributes('form')).toBe('test-form');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':href[string]', () => {
      const wrapper = mount(<Button href={'https://tdesign.tencent.com/'}>Text</Button>);
      expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com/');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':icon[function]', () => {
      const wrapper = mount(<Button icon={() => <span class="custom-node">TNode</span>}>Text</Button>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':loading[true/false]', () => {
      // default
      const wrapper1 = mount(<Button>Text</Button>);
      expect(wrapper1.classes('t-is-loading')).toBeFalsy();

      // true
      const wrapper2 = mount(<Button loading={true}>Text</Button>);
      expect(wrapper2.classes('t-is-loading')).toBeTruthy();
      expect(wrapper2.element).toMatchSnapshot();

      // false
      const wrapper3 = mount(<Button loading={false}>Text</Button>);
      expect(wrapper3.classes('t-is-loading')).toBeFalsy();
      expect(wrapper3.element).toMatchSnapshot();
    });

    it(':loading[Button contains element `.t-loading`]', () => {
      // default
      const wrapper = mount(<Button>Text</Button>);
      expect(wrapper.find('.t-loading').exists()).toBeFalsy();

      // false
      const wrapper1 = mount(<Button loading={false}>Text</Button>);
      expect(wrapper1.find('.t-loading').exists()).toBeFalsy();

      // true
      const wrapper2 = mount(<Button loading={true}>Text</Button>);
      expect(wrapper2.find('.t-loading').exists()).toBeTruthy();
      expect(wrapper2.element).toMatchSnapshot();
    });

    it(':loadingProps[object]', () => {
      const loadingProps = { size: 'small', text: 'Loading...' };
      const wrapper = mount(
        <Button loading={true} loadingProps={loadingProps}>
          Text
        </Button>,
      );
      expect(wrapper.find('.t-loading').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':shape[rectangle/square/round/circle]', () => {
      const { validator } = props.shape;
      expect(validator('rectangle')).toBeTruthy();
      expect(validator('square')).toBeTruthy();
      expect(validator('round')).toBeTruthy();
      expect(validator('circle')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      const shapeClassNameList = [
        't-button--shape-rectangle',
        't-button--shape-square',
        't-button--shape-round',
        't-button--shape-circle',
      ];
      (['rectangle', 'square', 'round', 'circle'] as const).forEach((item, index) => {
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

    it(':size[extra-small/small/medium/large]', () => {
      const { validator } = props.size;
      expect(validator('extra-small')).toBeTruthy();
      expect(validator('small')).toBeTruthy();
      expect(validator('medium')).toBeTruthy();
      expect(validator('large')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      // extra-small: SIZE object doesn't have 'extra-small' key, so no size class is added
      const wrapperExtraSmall = mount(<Button size="extra-small">Text</Button>);
      expect(wrapperExtraSmall.classes('t-size-xs')).toBeFalsy();
      expect(wrapperExtraSmall.classes('t-size-s')).toBeFalsy();
      expect(wrapperExtraSmall.element).toMatchSnapshot();

      // small
      const wrapperSmall = mount(<Button size="small">Text</Button>);
      expect(wrapperSmall.classes('t-size-s')).toBeTruthy();
      expect(wrapperSmall.element).toMatchSnapshot();

      // medium: default size, no size class is added
      const wrapperMedium = mount(<Button size="medium">Text</Button>);
      expect(wrapperMedium.classes('t-size-m')).toBeFalsy();
      expect(wrapperMedium.element).toMatchSnapshot();

      // large
      const wrapperLarge = mount(<Button size="large">Text</Button>);
      expect(wrapperLarge.classes('t-size-l')).toBeTruthy();
      expect(wrapperLarge.element).toMatchSnapshot();
    });

    it(':suffix[function]', () => {
      const wrapper = mount(<Button suffix={() => <span class="custom-node">TNode</span>}>Text</Button>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':tag[button/a/div]', () => {
      const { validator } = props.tag;
      expect(validator('button')).toBeTruthy();
      expect(validator('a')).toBeTruthy();
      expect(validator('div')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      const tagExpectedDom = ['button', 'a', 'div'];
      (['button', 'a', 'div'] as const).forEach((item, index) => {
        const wrapper = mount(<Button tag={item}>Text</Button>);
        expect(wrapper.find(tagExpectedDom[index]).exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it(':theme[default/primary/danger/warning/success]', () => {
      const { validator } = props.theme;
      expect(validator('default')).toBeTruthy();
      expect(validator('primary')).toBeTruthy();
      expect(validator('danger')).toBeTruthy();
      expect(validator('warning')).toBeTruthy();
      expect(validator('success')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      (['default', 'primary', 'danger', 'warning', 'success'] as const).forEach((item) => {
        const wrapper = mount(<Button theme={item}>Text</Button>);
        expect(wrapper.classes(`t-button--theme-${item}`)).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it(':type[submit/reset/button]', () => {
      const { validator } = props.type;
      expect(validator('submit')).toBeTruthy();
      expect(validator('reset')).toBeTruthy();
      expect(validator('button')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      const attributeValues = ['submit', 'reset', 'button'];
      (['submit', 'reset', 'button'] as const).forEach((item, index) => {
        const wrapper = mount(<Button type={item}></Button>);
        expect(wrapper.attributes('type')).toBe(attributeValues[index]);
      });
    });

    it(':variant[base/outline/dashed/text]', () => {
      const { validator } = props.variant;
      expect(validator('base')).toBeTruthy();
      expect(validator('outline')).toBeTruthy();
      expect(validator('dashed')).toBeTruthy();
      expect(validator('text')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      (['base', 'outline', 'dashed', 'text'] as const).forEach((item) => {
        const wrapper = mount(<Button variant={item}>Text</Button>);
        expect(wrapper.classes(`t-button--variant-${item}`)).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('slots', () => {
    it('content slot', () => {
      const wrapper = mount(<Button v-slots={{ content: () => <span class="custom-node">TNode</span> }}></Button>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('default slot', () => {
      const wrapper = mount(<Button v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Button>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('icon slot', () => {
      const wrapper = mount(<Button v-slots={{ icon: () => <span class="custom-node">TNode</span> }}>Text</Button>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it('suffix slot', () => {
      const wrapper = mount(<Button v-slots={{ suffix: () => <span class="custom-node">TNode</span> }}>Text</Button>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('@click', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Button onClick={fn}></Button>);
      wrapper.findComponent(Button).trigger('click');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0][0].stopPropagation).toBeTruthy();
      expect(fn.mock.calls[0][0].type).toBe('click');
    });
  });
});
