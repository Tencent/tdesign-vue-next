import { mount } from '@vue/test-utils';
import { Dropdown, DropdownMenu, DropdownItem } from '../index';

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

  it('equals disable to true', () => {
    const wrapper = mount(Dropdown, {
      propsData: {
        disabled: true,
      },
    });

    expect(wrapper.props().disabled).toEqual(true);
  });

  it('should emit click event', async () => {
    const onClick = vi.fn();
    const wrapper = mount({
      render() {
        return <DropdownMenu options={props.options} onClick={onClick}></DropdownMenu>;
      },
    });
    wrapper.find('.t-dropdown__item').trigger('click');
    expect(onClick).toBeCalled();
  });

  it('should exits divider', async () => {
    const options = [
      {
        content: '操作一',
        value: 1,
      },
      {
        content: '操作二',
        value: 2,
        divider: true,
      },
      {
        content: '操作三',
        value: 3,
      },
    ];
    const wrapper = mount({
      render() {
        return <DropdownMenu options={options}></DropdownMenu>;
      },
    });

    expect(wrapper.find('.t-divider').element.parentElement.textContent).toBe(options[1].content);
  });

  it('should equals custom height', async () => {
    const options = Array.from({ length: 20 }).map((v, k) => ({
      content: `操作${k + 1}`,
      value: k + 1,
    }));
    const maxHeight = 400;
    const minColumnWidth = 88;
    const wrapper = mount({
      render() {
        return <DropdownMenu options={options} maxHeight={maxHeight} minColumnWidth={minColumnWidth}></DropdownMenu>;
      },
    });

    expect(wrapper.find('.t-dropdown__menu').exists()).toBe(true);
    expect(wrapper.find('.t-dropdown__item').exists()).toBe(true);
    expect(wrapper.find('.t-dropdown__menu').element.style.maxHeight).toBe(`${maxHeight}px`);
    expect(wrapper.find('.t-dropdown__item').element.style.minWidth).toBe(`${minColumnWidth}px`);
  });

  it('should handle each option of click event', async () => {
    const options = [
      {
        content: '操作一',
        value: 1,
        onClick: vi.fn(),
      },
      {
        content: '操作二',
        value: 2,
        onClick: vi.fn(),
      },
      {
        content: '操作三',
        value: 3,
        onClick: vi.fn(),
      },
    ];
    const wrapper = mount({
      render() {
        return (
          <DropdownMenu options={options}>
            <div>menu</div>
          </DropdownMenu>
        );
      },
    });
    wrapper.findAll('.t-dropdown__item').trigger('click');
    options.forEach((value) => {
      expect(value.onClick).toBeCalled();
    });
  });

  it('use dropdown by slots', async () => {
    const wrapper = mount({
      render() {
        return (
          <Dropdown trigger="click">
            <div>menu</div>
            <DropdownMenu>
              <DropdownItem class="op1" value={1}>
                操作一
              </DropdownItem>
              <DropdownItem value={2}>操作二</DropdownItem>
              <DropdownItem value={3}>操作三</DropdownItem>
              <DropdownItem value={4}>操作四</DropdownItem>
              <DropdownItem value={5}>操作五</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      },
    });
    await wrapper.trigger('click');
    expect(document.querySelector('.t-dropdown__item')).not.toBe(null);
  });
});
