import { mount } from '@vue/test-utils';
import { AnchorItem } from '@tdesign/components/anchor';
import { AnchorInjectionKey } from '../consts';
import { vi } from 'vitest';

const mockAnchor = {
  registerLink: vi.fn(),
  unregisterLink: vi.fn(),
  handleScrollTo: vi.fn(),
  handleLinkClick: vi.fn(),
  active: '',
};

describe('AnchorItem', () => {
  it('props: href', () => {
    const wrapper = mount(AnchorItem, {
      props: {
        href: '#test',
      },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: mockAnchor,
        },
      },
    });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('#test');
  });

  it('props: target', () => {
    const wrapper = mount(AnchorItem, {
      props: {
        href: '#test',
        target: '_blank',
      },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: mockAnchor,
        },
      },
    });
    const link = wrapper.find('a');
    expect(link.attributes('target')).toBe('_blank');
  });

  it('props: title as string', () => {
    const wrapper = mount(AnchorItem, {
      props: {
        href: '#test',
        title: 'Test Title',
      },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: mockAnchor,
        },
      },
    });
    const link = wrapper.find('a');
    expect(link.attributes('title')).toBe('Test Title');
    expect(wrapper.text()).toBe('Test Title');
  });

  it('props: title as function', () => {
    const wrapper = mount(AnchorItem, {
      props: {
        href: '#test',
        title: () => 'Function Title',
      },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: mockAnchor,
        },
      },
    });
    expect(wrapper.text()).toBe('Function Title');
  });

  it('slots: title', () => {
    const wrapper = mount(AnchorItem, {
      props: { href: '#test' },
      slots: {
        title: 'Slot Title',
      },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: mockAnchor,
        },
      },
    });
    expect(wrapper.text()).toBe('Slot Title');
  });

  it('props: customScroll', async () => {
    const mockHandleScrollTo = vi.fn();
    const wrapper = mount(AnchorItem, {
      props: { href: '#item-1', title: 'Item 1', customScroll: true },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: {
            ...mockAnchor,
            handleScrollTo: mockHandleScrollTo,
          },
        },
      },
    });
    await wrapper.find('a').trigger('click');
    expect(mockHandleScrollTo).not.toHaveBeenCalled();
  });

  it('events: click', async () => {
    const mockHandleLinkClick = vi.fn();
    const wrapper = mount(AnchorItem, {
      props: { href: '#item-1', title: 'Item 1' },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: {
            ...mockAnchor,
            handleLinkClick: mockHandleLinkClick,
          },
        },
      },
    });
    await wrapper.find('a').trigger('click');
    expect(mockHandleLinkClick).toHaveBeenCalled();
  });

  it('unregister link when href changes', async () => {
    const wrapper = mount(AnchorItem, {
      props: { href: '#test1' },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: mockAnchor,
        },
      },
    });

    await wrapper.setProps({ href: '#test2' });
    expect(mockAnchor.unregisterLink).toHaveBeenCalledWith('#test1');
    expect(mockAnchor.registerLink).toHaveBeenCalledWith('#test2');
  });

  it('handles empty href gracefully', () => {
    const wrapper = mount(AnchorItem, {
      props: { href: '' },
      global: {
        provide: {
          [AnchorInjectionKey as symbol]: mockAnchor,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
