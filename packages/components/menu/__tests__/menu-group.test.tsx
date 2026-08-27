import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { MenuGroup } from '..';

describe('MenuGroup', () => {
  describe('props', () => {
    it(':title[string] + :default[slot]', () => {
      const wrapper = mount(MenuGroup, {
        props: { title: 'Administration' },
        slots: { default: () => <div class="group-content">Users</div> },
      });

      expect(wrapper.classes()).toEqual(['t-menu-group']);
      expect(wrapper.get('.t-menu-group__title').text()).toBe('Administration');
      expect(wrapper.get('.group-content').text()).toBe('Users');
    });

    it(':title[function]', () => {
      const wrapper = mount(MenuGroup, {
        props: { title: () => <strong data-testid="title">Grouped title</strong> },
      });

      expect(wrapper.get('[data-testid="title"]').text()).toBe('Grouped title');
    });

    it(':title[string] takes priority over :title[slot]', () => {
      const wrapper = mount(MenuGroup, {
        props: { title: 'Title prop' },
        slots: { title: () => <span data-testid="slot-title">Slot title</span> },
      });

      expect(wrapper.get('.t-menu-group__title').text()).toBe('Title prop');
      expect(wrapper.find('[data-testid="slot-title"]').exists()).toBe(false);
    });

    it(':title[slot]', () => {
      const wrapper = mount(MenuGroup, {
        slots: { title: () => <span data-testid="slot-title">Slot title</span> },
      });

      expect(wrapper.get('.t-menu-group__title').text()).toBe('Slot title');
      expect(wrapper.find('[data-testid="slot-title"]').exists()).toBe(true);
    });
  });
});
