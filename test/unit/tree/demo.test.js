import { mount } from '@vue/test-utils';
import base from '@/examples/tree/demos/base.vue';
import expandAll from '@/examples/tree/demos/expand-all.vue';
import expandLevel from '@/examples/tree/demos/expand-level.vue';
import expandMutex from '@/examples/tree/demos/expand-mutex.vue';
import activable from '@/examples/tree/demos/activable.vue';
import checkable from '@/examples/tree/demos/checkable.vue';
import disabled from '@/examples/tree/demos/disabled.vue';
import load from '@/examples/tree/demos/load.vue';
import lazy from '@/examples/tree/demos/lazy.vue';
import controlled from '@/examples/tree/demos/controlled.vue';
import sync from '@/examples/tree/demos/sync.vue';
import filter from '@/examples/tree/demos/filter.vue';
import empty from '@/examples/tree/demos/empty.vue';
import label from '@/examples/tree/demos/label.vue';
import icon from '@/examples/tree/demos/icon.vue';
import line from '@/examples/tree/demos/line.vue';
import operations from '@/examples/tree/demos/operations.vue';

// unit test for component in examples.
describe('Tree:demo', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('expand-all demo works fine', () => {
    const wrapper = mount(expandAll);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('expand-level demo works fine', () => {
    const wrapper = mount(expandLevel);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('expand-mutex demo works fine', () => {
    const wrapper = mount(expandMutex);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('activable demo works fine', () => {
    const wrapper = mount(activable);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('checkable demo works fine', () => {
    const wrapper = mount(checkable);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('disabled demo works fine', () => {
    const wrapper = mount(disabled);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('load demo works fine', () => {
    const wrapper = mount(load);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('lazy demo works fine', () => {
    const wrapper = mount(lazy);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('controlled demo works fine', () => {
    const wrapper = mount(controlled);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('sync demo works fine', () => {
    const wrapper = mount(sync);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('filter demo works fine', () => {
    const wrapper = mount(filter);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('empty demo works fine', () => {
    const wrapper = mount(empty);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('label demo works fine', () => {
    const wrapper = mount(label);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('icon demo works fine', () => {
    const wrapper = mount(icon);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('line demo works fine', () => {
    const wrapper = mount(line);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('operations demo works fine', () => {
    const wrapper = mount(operations);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('state demo works fine', () => {
    const wrapper = mount(operations);
    expect(wrapper.element).toMatchSnapshot();
  });
});
