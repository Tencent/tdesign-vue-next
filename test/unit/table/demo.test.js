import { mount } from '@vue/test-utils';
import base from '@/examples/table/demos/base.vue';
import fixedHeader from '@/examples/table/demos/fixedHeader.vue';
import fixedColumn from '@/examples/table/demos/fixedColumn.vue';
import customCell from '@/examples/table/demos/customCell.vue';
import empty from '@/examples/table/demos/empty.vue';
import multiHeader from '@/examples/table/demos/multiHeader.vue';
import expandable from '@/examples/table/demos/expandable.vue';
import draggable from '@/examples/table/demos/draggable.vue';
import selectSingle from '@/examples/table/demos/selectSingle.vue';
import selectMultiple from '@/examples/table/demos/selectMultiple.vue';
import ajax from '@/examples/table/demos/ajax.vue';

// unit test for component in examples.
describe('Table', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('base demo works fine', () => {
    const wraper = mount(base);
    expect(wraper.element).toMatchSnapshot();
  });
  it('fixedHeader demo works fine', () => {
    const wraper = mount(fixedHeader);
    expect(wraper.element).toMatchSnapshot();
  });
  it('fixedColumn demo works fine', () => {
    const wraper = mount(fixedColumn);
    expect(wraper.element).toMatchSnapshot();
  });
  it('customCell demo works fine', () => {
    const wraper = mount(customCell);
    expect(wraper.element).toMatchSnapshot();
  });
  it('empty demo works fine', () => {
    const wraper = mount(empty);
    expect(wraper.element).toMatchSnapshot();
  });
  it('multiHeader demo works fine', () => {
    const wraper = mount(multiHeader);
    expect(wraper.element).toMatchSnapshot();
  });
  it('expandable demo works fine', () => {
    const wraper = mount(expandable);
    expect(wraper.element).toMatchSnapshot();
  });
  it('draggable demo works fine', () => {
    const wraper = mount(draggable);
    expect(wraper.element).toMatchSnapshot();
  });
  it('selectSingle demo works fine', () => {
    const wraper = mount(selectSingle);
    expect(wraper.element).toMatchSnapshot();
  });
  it('selectMultiple demo works fine', () => {
    const wraper = mount(selectMultiple);
    expect(wraper.element).toMatchSnapshot();
  });
  it('ajax demo works fine', () => {
    const wraper = mount(ajax);
    expect(wraper.element).toMatchSnapshot();
  });
});
