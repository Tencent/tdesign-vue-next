import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Divider } from '@tdesign/components/divider';
import props from '@tdesign/components/divider/props';

describe('Divider', () => {
  describe('props', () => {
    it(':align[left/right/center]', () => {
      const { validator } = props.align;
      expect(validator('left')).toBeTruthy();
      expect(validator('right')).toBeTruthy();
      expect(validator('center')).toBeTruthy();
      // @ts-expect-error
      expect(validator('top')).toBeFalsy();
      // @ts-expect-error
      expect(validator('')).toBeTruthy();
      expect(validator(undefined)).toBeTruthy();

      // horizontal
      (['left', 'right', 'center'] as const).forEach((align) => {
        const wrapper = mount(<Divider align={align}>Text</Divider>);
        expect(wrapper.classes(`t-divider--with-text-${align}`)).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });

      // vertical left
      const wrapper = mount(
        <Divider layout="vertical" align="left">
          text
        </Divider>,
      );
      expect(wrapper.classes('t-divider--with-text-left')).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot('align-vertical-left');
    });

    it(':dashed[true/false]', () => {
      // default
      const wrapper1 = mount(<Divider></Divider>);
      expect(wrapper1.classes('t-divider--dashed')).toBeFalsy();
      expect(wrapper1.element).toMatchSnapshot('dashed-false-default');

      // true
      const wrapper2 = mount(<Divider dashed={true}></Divider>);
      expect(wrapper2.classes('t-divider--dashed')).toBeTruthy();
      expect(wrapper2.element).toMatchSnapshot('dashed-true');

      // false
      const wrapper3 = mount(<Divider dashed={false}></Divider>);
      expect(wrapper3.classes('t-divider--dashed')).toBeFalsy();
      expect(wrapper3.element).toMatchSnapshot('dashed-false-explicit');

      // vertical dashed
      const wrapper4 = mount(<Divider layout="vertical" dashed={true} />);
      expect(wrapper4.classes('t-divider--dashed')).toBeTruthy();
      expect(wrapper4.element).toMatchSnapshot('dashed-vertical-true');
    });

    it(':layout[horizontal/vertical]', () => {
      const { validator } = props.layout;
      expect(validator('horizontal')).toBeTruthy();
      expect(validator('vertical')).toBeTruthy();
      // @ts-expect-error
      expect(validator('other')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();
      (['horizontal', 'vertical'] as const).forEach((layout) => {
        const wrapper = mount(<Divider layout={layout}></Divider>);
        expect(wrapper.classes(`t-divider--${layout}`)).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it(':theme[horizontal/vertical]', () => {
      const { validator } = props.theme;
      expect(validator('horizontal')).toBeTruthy();
      expect(validator('vertical')).toBeTruthy();
      // @ts-expect-error types error
      expect(validator('other')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();
    });

    it(':content[string/function]', () => {
      // string
      const wrapperString = mount(<Divider content="TDesign" />);
      expect(wrapperString.text()).toBe('TDesign');
      expect(wrapperString.element).toMatchSnapshot('content-string');

      // function
      const wrapperTNode = mount(<Divider content={() => <span class="custom-node">TNode</span>} />);
      expect(wrapperTNode.find('.custom-node').exists()).toBeTruthy();
      expect(wrapperTNode.text()).toBe('TNode');
      expect(wrapperTNode.element).toMatchSnapshot('content-TNode');
    });

    it(':content[slot]', () => {
      const wrapperString = mount(<Divider v-slots={{ content: () => 'TDesign' }} />);
      expect(wrapperString.text()).toBe('TDesign');
      expect(wrapperString.element).toMatchSnapshot('content-string');
    });

    it(':default[string/function]', () => {
      // string
      const wrapperString = mount(<Divider default="TDesign" />);
      expect(wrapperString.text()).toBe('TDesign');
      expect(wrapperString.element).toMatchSnapshot('default-string');

      // function
      const wrapperFunction = mount(<Divider v-slots={{ default: () => <span class="custom-node">TNode</span> }} />);
      expect(wrapperFunction.find('.custom-node').exists()).toBeTruthy();
      expect(wrapperFunction.text()).toBe('TNode');
      expect(wrapperFunction.element).toMatchSnapshot();
    });

    it(':default[slot]:should be priority to content', () => {
      const wrapper = mount(<Divider content="prop content" v-slots={{ default: () => 'TDesign' }} />);
      expect(wrapper.text()).toBe('TDesign');
      expect(wrapper.element).toMatchSnapshot('default-priority');
    });
  });
});
