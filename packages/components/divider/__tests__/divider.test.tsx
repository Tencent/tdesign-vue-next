import { mount } from '@vue/test-utils';
import { Divider } from '@tdesign/components/divider';

describe('Divider Component', () => {
  ['left', 'right', 'center'].forEach((item) => {
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
    // dashed default value is false
    const wrapper1 = mount(<Divider></Divider>);
    expect(wrapper1.classes('t-divider--dashed')).toBeFalsy();
    // dashed = true
    const wrapper2 = mount(<Divider dashed={true}></Divider>);
    expect(wrapper2.classes('t-divider--dashed')).toBeTruthy();
    // dashed = false
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

  ['horizontal', 'vertical'].forEach((item) => {
    it(`props.layout is equal to ${item}`, () => {
      const wrapper = mount(<Divider layout={item}></Divider>);
      expect(wrapper.classes(`t-divider--${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test props api
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
});
