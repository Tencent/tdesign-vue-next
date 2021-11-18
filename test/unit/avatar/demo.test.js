import { mount } from '@vue/test-utils';
import base from '@/examples/avatar/demos/base.vue';
import shape from '@/examples/avatar/demos/shape.vue';
import size from '@/examples/avatar/demos/size.vue';
import adjust from '@/examples/avatar/demos/adjust.vue';
import group from '@/examples/avatar/demos/group.vue';
import groupMax from '@/examples/avatar/demos/group-max.vue';
import groupCascading from '@/examples/avatar/demos/group-cascading.vue';

// unit test for component in examples.
describe('Avatar', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('Avatar', () => {
  it('shape demo works fine', () => {
    const wrapper = mount(shape);
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('Avatar', () => {
  it('size demo works fine', () => {
    const wrapper = mount(size);
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('Avatar', () => {
  it('size demo works fine', () => {
    const wrapper = mount(adjust);
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('Avatar', () => {
  it('group demo works fine', () => {
    const wrapper = mount(group);
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('Avatar', () => {
  it('groupMax demo works fine', () => {
    const wrapper = mount(groupMax);
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('Avatar', () => {
  it('groupCascading demo works fine', () => {
    const wrapper = mount(groupCascading);
    expect(wrapper.element).toMatchSnapshot();
  });
});
