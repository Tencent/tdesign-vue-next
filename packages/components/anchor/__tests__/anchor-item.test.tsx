import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { AnchorItem } from '@tdesign/components/anchor';
import { AnchorInjectionKey } from '../constants';

const mockAnchor = {
  registerLink: vi.fn(),
  unregisterLink: vi.fn(),
  handleScrollTo: vi.fn(),
  handleLinkClick: vi.fn(),
  active: '',
};

describe('AnchorItem', () => {
  describe('props', () => {
    it(':href[string]', () => {
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

    it(':target[string]', () => {
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

    it(':title[string]', () => {
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

    it(':title[function]', () => {
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

    it(':customScroll[boolean]', async () => {
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

    it(':href change triggers unregister and register', async () => {
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

    it(':href[empty string]', () => {
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

  describe('slots', () => {
    it('title', () => {
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
  });

  describe('events', () => {
    it('click', async () => {
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
  });
});
