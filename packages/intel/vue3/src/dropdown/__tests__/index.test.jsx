import { mount } from '@vue/test-utils';
import { nextTick } from '@td/adapter-vue';
import { expect } from 'vitest';
import { Dropdown } from 'tdesign-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('dropdown', () => {
  const props = {
    options: [
      {
        content: '操作一',
        value: 1,
      },
      {
        content: '操作二',
        value: 2,
      },
      {
        content: '操作三',
        value: 3,
      },
    ],
  };

  it('disable', async () => {
    const wrapper = mount(Dropdown, {
      propsData: {
        disabled: true,
      },
    });
    await nextTick();
    expect(wrapper.props().disabled).toEqual(true);
  });

  it('trigger', () => {
    const wrapper = mount(Dropdown, {
      propsData: {
        trigger: 'click',
        options: props.options,
      },
    });
    wrapper.trigger('click');
    expect(wrapper.props().trigger).toEqual('click');
  });

  it('height', async () => {
    const dropdownWrapper = mount(Dropdown, {
      propsData: {
        maxHeight: 400,
        minColumnWidth: 88,
        options: props.options,
      },
    });
    await dropdownWrapper.setProps({
      maxHeight: 500,
      minColumnWidth: 100,
    });
    await nextTick();
    expect(dropdownWrapper.props().maxHeight).toEqual(500);
    expect(dropdownWrapper.props().minColumnWidth).toEqual(100);
  });

  it('direction', async () => {
    const dropdownWrapper = mount(Dropdown, {
      propsData: {
        direction: 'left',
        options: props.options,
      },
    });
    await nextTick();
    expect(dropdownWrapper.props().direction).toEqual('left');
  });

  it('placement', async () => {
    const dropdownWrapper = mount(Dropdown, {
      propsData: {
        placement: 'left',
        options: props.options,
      },
    });
    await dropdownWrapper.setProps({
      placement: 'left-bottom',
    });
    await nextTick();
    expect(dropdownWrapper.props().placement).toEqual('left-bottom');
  });

  it('hideAfterItemClick', async () => {
    const dropdownWrapper = mount(Dropdown, {
      propsData: {
        hideAfterItemClick: false,
        options: props.options,
      },
    });
    await nextTick();
    expect(dropdownWrapper.props().hideAfterItemClick).toEqual(false);
  });
});
