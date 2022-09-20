import { mount, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { expect, vi } from 'vitest';
import { Dropdown, DropdownMenu, DropdownItem } from '../index';
import { Button } from '@/src/button/index';

// every component needs four parts: props/events/slots/functions.
describe('Dropdown', () => {
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

  it('slots', () => {
    const handleClick = vi.fn();
    const wrapper = shallowMount({
      render() {
        return (
          <Dropdown trigger="click" popupProps={{ zIndex: 5000 }} onClick={handleClick}>
            <Button variant="text">下拉菜单</Button>
            <template>
              <DropdownMenu>
                <DropdownItem class="op1" value={1} onClick={handleClick}>
                  操作一
                </DropdownItem>
                <DropdownItem value={2}>操作二</DropdownItem>
                <DropdownItem value={3}>操作三</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        );
      },
    }).findComponent(Dropdown);
    wrapper.trigger('click');
    expect(handleClick).toBeCalled();
    expect(wrapper.props().popupProps).toEqual({ zIndex: 5000 });
  });
});
