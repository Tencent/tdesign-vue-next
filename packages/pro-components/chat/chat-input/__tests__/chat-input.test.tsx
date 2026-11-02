import { describe, expect, it, vi } from 'vitest';
import ChatInput from '..';
import { flush, mountChat } from '../../test/helpers';

describe('ChatInput', () => {
  describe('props', () => {
    it('displays controlled values and updates from the parent', async () => {
      const wrapper = mountChat(ChatInput, { props: { modelValue: 'first' } });
      expect(wrapper.find('textarea').element.value).toBe('first');
      await wrapper.setProps({ modelValue: 'second' });
      expect(wrapper.find('textarea').element.value).toBe('second');
    });

    it('disables the input through disabled', () => {
      const wrapper = mountChat(ChatInput, { props: { disabled: true } });
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    });
  });

  describe('events', () => {
    it('reports input changes through update:modelValue and onChange', async () => {
      const onChange = vi.fn();
      const wrapper = mountChat(ChatInput, { props: { modelValue: '', onChange } });
      await wrapper.find('textarea').setValue('question');
      await flush();
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('question');
      expect(onChange).toHaveBeenCalledWith('question', expect.objectContaining({ e: expect.anything() }));
    });

    it('sends the current value on Enter', async () => {
      const onSend = vi.fn();
      const wrapper = mountChat(ChatInput, { props: { defaultValue: 'question', onSend } });
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter' });
      expect(onSend).toHaveBeenCalledTimes(1);
      expect(onSend).toHaveBeenCalledWith('question', expect.objectContaining({ e: expect.anything() }));
    });
  });

  describe('slots', () => {
    it('renders the custom suffixIcon', () => {
      const wrapper = mountChat(ChatInput, { slots: { suffixIcon: '<span>custom send</span>' } });
      expect(wrapper.text()).toContain('custom send');
    });
  });
});
