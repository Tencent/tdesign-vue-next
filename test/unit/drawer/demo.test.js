import { mount } from '@vue/test-utils';
import demo from '@/examples/drawer/demos/base.vue';
import CurrentDOMModeUsageExample from '@/examples/drawer/demos/attach-parent.vue';
import destroy from '@/examples/drawer/demos/destroy.vue';
import CustomUsageExample from '@/examples/drawer/demos/custom.vue';
import PopupUsageExample from '@/examples/drawer/demos/popup.vue';
import NoMaskUsageExample from '@/examples/drawer/demos/no-mask.vue';
import operation from '@/examples/drawer/demos/operation.vue';
import PlacementUsageExample from '@/examples/drawer/demos/placement.vue';
import SizeUsageExample from '@/examples/drawer/demos/size.vue';

// unit test for component in examples.
describe('Drawer', () => {
  it('base demo works fine', () => {
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Demo CurrentDOMModeUsageExample wroks fine', () => {
    const wrapper = mount(CurrentDOMModeUsageExample);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Demo destroy wroks fine', () => {
    const wrapper = mount(destroy);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Demo CustomUsageExample wroks fine', () => {
    const wrapper = mount(CustomUsageExample);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Demo PopupUsageExample wroks fine', () => {
    const wrapper = mount(PopupUsageExample);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Demo NoMaskUsageExample wroks fine', () => {
    const wrapper = mount(NoMaskUsageExample);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Demo operation wroks fine', () => {
    const wrapper = mount(operation);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Demo PlacementUsageExample wroks fine', () => {
    const wrapper = mount(PlacementUsageExample);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Demo SizeUsageExample wroks fine', () => {
    const wrapper = mount(SizeUsageExample);
    expect(wrapper.element).toMatchSnapshot();
  });
});
