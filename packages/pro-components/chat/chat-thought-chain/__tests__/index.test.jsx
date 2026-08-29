import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ChatThoughtChain from '@tdesign/pro-components-chat/chat-thought-chain/index';

const items = [
  { key: 'a', title: '分析问题', content: '分析中的详细内容', status: 'success' },
  { key: 'b', title: '检索资料', content: '检索的详细内容', status: 'processing' },
  { key: 'c', title: '输出回答', status: 'pending' },
];

describe('ChatThoughtChain', () => {
  describe(':props', () => {
    it(':items - array', () => {
      const wrapper = mount(ChatThoughtChain, {
        props: { items },
      });
      const nodes = wrapper.findAll('.t-chat__thought-chain-item');
      expect(nodes.length).toBe(3);
      expect(nodes[0].classes()).toContain('t-chat__thought-chain-item--success');
      expect(nodes[1].classes()).toContain('t-chat__thought-chain-item--processing');
      expect(nodes[2].classes()).toContain('t-chat__thought-chain-item--pending');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':defaultExpandedValue - array', () => {
      const wrapper = mount(ChatThoughtChain, {
        props: { items, defaultExpandedValue: ['a'] },
      });
      const contents = wrapper.findAll('.t-chat__thought-chain-item__content');
      expect(contents.length).toBe(1);
      expect(contents[0].text()).toBe('分析中的详细内容');
    });

    it(':collapsible - false', async () => {
      const wrapper = mount(ChatThoughtChain, {
        props: { items, collapsible: false },
      });
      await wrapper.findAll('.t-chat__thought-chain-item__header')[0].trigger('click');
      expect(wrapper.findAll('.t-chat__thought-chain-item__content').length).toBe(0);
      expect(wrapper.findAll('.t-chat__thought-chain-item__arrow').length).toBe(0);
    });

    it(':icon - custom slot', () => {
      const wrapper = mount(ChatThoughtChain, {
        props: { items },
        slots: {
          icon: ({ item }) => <span class="custom-icon">{item.key}</span>,
        },
      });
      expect(wrapper.findAll('.custom-icon').length).toBe(3);
    });
  });

  describe('@event', () => {
    it('onExpandChange', async () => {
      const onExpandChange = vi.fn();
      const wrapper = mount(ChatThoughtChain, {
        props: { items, onExpandChange },
      });
      await wrapper.findAll('.t-chat__thought-chain-item__header')[0].trigger('click');
      expect(onExpandChange).toHaveBeenCalledWith(['a'], expect.objectContaining({ index: 0, expanded: true }));
      expect(wrapper.findAll('.t-chat__thought-chain-item__content').length).toBe(1);

      await wrapper.findAll('.t-chat__thought-chain-item__header')[0].trigger('click');
      expect(onExpandChange).toHaveBeenCalledWith([], expect.objectContaining({ index: 0, expanded: false }));
    });

    it('expandedValue - controlled', async () => {
      const wrapper = mount(ChatThoughtChain, {
        props: { items, expandedValue: ['b'] },
      });
      expect(wrapper.findAll('.t-chat__thought-chain-item__content').length).toBe(1);
      // 受控模式下点击不直接改变展开状态
      await wrapper.findAll('.t-chat__thought-chain-item__header')[0].trigger('click');
      expect(wrapper.findAll('.t-chat__thought-chain-item__content').length).toBe(1);
    });
  });
});
