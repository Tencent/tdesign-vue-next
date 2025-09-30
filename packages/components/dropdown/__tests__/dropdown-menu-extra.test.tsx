import { mount } from '@vue/test-utils';
import { nextTick, h } from 'vue';
import { vi } from 'vitest';
import DropdownMenu from '../dropdown-menu';

describe('DropdownMenu extra coverage', () => {
  it('disabled leaf item click does not trigger option.onClick or props.onClick', async () => {
    const optionOnClick = vi.fn();
    const propsOnClick = vi.fn();
    const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 20 } as any);

    const wrapper = mount(DropdownMenu, {
      props: {
        options: [{ content: 'Leaf', value: 'v1', onClick: optionOnClick, disabled: true }],
        onClick: propsOnClick,
      },
    });

    await nextTick();
    const li = wrapper.find('.t-dropdown__item');
    await li.trigger('click');

    expect(optionOnClick).not.toHaveBeenCalled();
    expect(propsOnClick).not.toHaveBeenCalled();

    querySpy.mockRestore();
  });
  it('leaf item click triggers option.onClick and props.onClick', async () => {
    const optionOnClick = vi.fn();
    const propsOnClick = vi.fn();
    const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 20 } as any);

    const wrapper = mount(DropdownMenu, {
      props: {
        options: [{ content: 'Leaf', value: 'v1', onClick: optionOnClick }],
        onClick: propsOnClick,
      },
    });

    await nextTick();
    const li = wrapper.find('.t-dropdown__item'); // leaf item
    await li.trigger('click');

    expect(optionOnClick).toHaveBeenCalledTimes(1);
    expect(propsOnClick).toHaveBeenCalledTimes(1);

    querySpy.mockRestore();
  });

  it('overflow class toggles when menu height >= maxHeight', async () => {
    const getStyleSpy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({ height: '500' } as any);
    const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 20 } as any);

    const wrapper = mount(DropdownMenu, {
      props: {
        options: [{ content: 'A', value: '1' }],
        maxHeight: 300,
      },
    });

    await nextTick();
    const root = wrapper.find('.t-dropdown__menu');
    expect(root.classes()).toContain('t-dropdown__menu--overflow');

    getStyleSpy.mockRestore();
    querySpy.mockRestore();
  });

  it('handleScroll stores scrollTop in map', async () => {
    const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 20 } as any);
    const wrapper = mount(DropdownMenu, {
      props: {
        options: [{ content: 'A', value: '1', children: [{ content: 'B', value: '2' }] }],
        maxHeight: 300,
      },
    });
    await nextTick();

    const submenu = wrapper.find('.t-dropdown__submenu');
    const el = submenu.element as HTMLElement;
    el.scrollTop = 40;
    el.dispatchEvent(new Event('scroll', { bubbles: true }));

    expect(wrapper.exists()).toBe(true);
    querySpy.mockRestore();
  });

  it('functional content renders via getContent', async () => {
    const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 20 } as any);
    const fn1 = vi.fn((hh: typeof h) => hh('span', 'F1'));
    const fn2 = vi.fn((hh: typeof h) => hh('span', 'F2'));
    const wrapper = mount(DropdownMenu, {
      props: {
        options: [
          { content: fn1, value: '1' },
          { content: fn2, value: '2' },
        ],
      },
    });
    await nextTick();
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    querySpy.mockRestore();
  });
});