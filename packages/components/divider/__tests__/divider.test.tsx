import { mount } from '@vue/test-utils';
import { Divider } from '@tdesign/components/divider';
import props from '@tdesign/components/divider/props';

describe('Divider Component', () => {
  (['left', 'right', 'center'] as const).forEach((item) => {
    it(`props.align is equal to ${item}`, () => {
      const wrapper = mount(<Divider align={item}>Text</Divider>);
      expect(wrapper.classes(`t-divider--with-text-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.content works fine', () => {
    const wrapper = mount(<Divider content={() => <span class="custom-node">TNode</span>}></Divider>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<Divider v-slots={{ content: () => <span class="custom-node">TNode</span> }}></Divider>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.dashed works fine', () => {
    const wrapper1 = mount(<Divider></Divider>);
    expect(wrapper1.classes('t-divider--dashed')).toBeFalsy();
    const wrapper2 = mount(<Divider dashed={true}></Divider>);
    expect(wrapper2.classes('t-divider--dashed')).toBeTruthy();
    const wrapper3 = mount(<Divider dashed={false}></Divider>);
    expect(wrapper3.classes('t-divider--dashed')).toBeFalsy();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<Divider default={() => <span class="custom-node">TNode</span>}></Divider>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<Divider v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Divider>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  (['horizontal', 'vertical'] as const).forEach((item) => {
    it(`props.layout is equal to ${item}`, () => {
      const wrapper = mount(<Divider layout={item}></Divider>);
      expect(wrapper.classes(`t-divider--${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':props', () => {
    it(':layout', () => {
      const wrapper = mount({
        render() {
          return <Divider layout="vertical"></Divider>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':dashed', () => {
      const wrapper = mount({
        render() {
          return <Divider dashed></Divider>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':align', () => {
      const wrapper = mount({
        render() {
          return <Divider align="left">TDesign</Divider>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test slots
  describe('<slot>', () => {
    it('default', () => {
      const wrapper = mount({
        render() {
          return <Divider>TDesign</Divider>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.content is a string', () => {
    const wrapper = mount(<Divider content="TDesign" />);
    expect(wrapper.text()).toBe('TDesign');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.default is a string', () => {
    const wrapper = mount(<Divider default="TDesign" />);
    expect(wrapper.text()).toBe('TDesign');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('content prop and default slot exist meanwhile', () => {
    const wrapper = mount(<Divider content="prop content">TDesign</Divider>);
    expect(wrapper.text()).toBe('TDesign');
  });

  describe('vertical divider', () => {
    it('applies dashed class on vertical divider', () => {
      const wrapper = mount(<Divider layout="vertical" dashed={true} />);
      expect(wrapper.classes('t-divider--dashed')).toBeTruthy();
    });

    it('applies align class on vertical divider', () => {
      const wrapper = mount(
        <Divider layout="vertical" align="left">
          text
        </Divider>,
      );
      expect(wrapper.classes('t-divider--with-text-left')).toBeTruthy();
    });
  });

  describe('props validator', () => {
    it('align', () => {
      const { validator } = props.align;
      expect(validator('left')).toBeTruthy();
      expect(validator('right')).toBeTruthy();
      expect(validator('center')).toBeTruthy();
      // @ts-expect-error error case
      expect(validator('top')).toBeFalsy();
      // @ts-expect-error error case
      expect(validator('')).toBeTruthy();
      expect(validator(undefined)).toBeTruthy();
    });

    it('layout', () => {
      const { validator } = props.layout;
      expect(validator('horizontal')).toBeTruthy();
      expect(validator('vertical')).toBeTruthy();
      // @ts-expect-error error case
      expect(validator('other')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();
    });
  });
});
