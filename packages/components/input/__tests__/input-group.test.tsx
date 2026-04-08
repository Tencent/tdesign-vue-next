import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Input, InputGroup } from '@tdesign/components/input';

function getInputGroupDefaultMount(props = {}) {
  return mount(InputGroup, {
    props,
    slots: {
      default: () => [<Input />, <Input />],
    },
  }) as VueWrapper<InstanceType<typeof InputGroup>>;
}

describe('InputGroup', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof InputGroup>> | null = null;

    beforeEach(() => {
      wrapper = getInputGroupDefaultMount();
    });

    it(':separate[boolean]', async () => {
      // default: false
      expect(wrapper.classes('t-input-group--separate')).eq(false);

      await wrapper.setProps({ separate: true });
      expect(wrapper.classes('t-input-group--separate')).eq(true);

      await wrapper.setProps({ separate: false });
      expect(wrapper.classes('t-input-group--separate')).eq(false);
    });

    it(':separate not provided', () => {
      const wrapper = getInputGroupDefaultMount();
      expect(wrapper.classes('t-input-group--separate')).eq(false);
    });
  });

  describe('basic rendering', () => {
    it('should render InputGroup with correct class', () => {
      const wrapper = getInputGroupDefaultMount();
      expect(wrapper.classes('t-input-group')).eq(true);
    });

    it('should render multiple inputs inside InputGroup', () => {
      const wrapper = getInputGroupDefaultMount();
      const inputs = wrapper.findAll('.t-input');
      expect(inputs.length).eq(2);
    });

    it('should render with custom content', () => {
      const wrapper = mount(InputGroup, {
        slots: {
          default: () => [
            <Input placeholder="First input" />,
            <span class="separator">-</span>,
            <Input placeholder="Second input" />,
          ],
        },
      });
      expect(wrapper.findAll('.t-input').length).eq(2);
      expect(wrapper.find('.separator').exists()).eq(true);
    });
  });

  describe('slots', () => {
    it('default slot works fine', () => {
      const wrapper = getInputGroupDefaultMount();
      expect(wrapper.findAll('input').length).eq(2);
    });

    it('should handle empty slot', () => {
      const wrapper = mount(InputGroup, {
        slots: {
          default: () => [],
        },
      });
      expect(wrapper.classes('t-input-group')).eq(true);
      expect(wrapper.findAll('.t-input').length).eq(0);
    });
  });

  describe('edge cases', () => {
    it('should work with single input', () => {
      const wrapper = mount(InputGroup, {
        slots: {
          default: () => <Input />,
        },
      });
      expect(wrapper.classes('t-input-group')).eq(true);
      expect(wrapper.findAll('.t-input').length).eq(1);
    });

    it('should work with many inputs', () => {
      const wrapper = mount(InputGroup, {
        slots: {
          default: () => [<Input />, <Input />, <Input />, <Input />],
        },
      });
      expect(wrapper.findAll('.t-input').length).eq(4);
    });
  });
});
