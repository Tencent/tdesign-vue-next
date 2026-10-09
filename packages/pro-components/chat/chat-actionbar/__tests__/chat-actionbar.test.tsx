import { expectEmitsContract, expectPropsContract, mountChat } from '../../test/helpers';

/**
 * L2 - ChatActionbar 基础 API / 事件（含历史 API 向后兼容）
 *
 * Actionbar 为纯 Vue 实现：按钮集合、点赞点踩高亮、禁用态、
 * 以及 actions / operation 双事件的历史兼容行为都需要被锁定。
 */
import { describe, expect, it, vi } from 'vitest';
import ChatActionbar from '..';

const ALL_ACTIONS = ['replay', 'copy', 'good', 'bad', 'share'];

describe('ChatActionbar', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatActionbar', ChatActionbar));

    it('默认渲染全部内置操作按钮', () => {
      const wrapper = mountChat(ChatActionbar);
      expect(wrapper.find('.t-chat__actions').exists()).toBe(true);
      expect(wrapper.findAll('button')).toHaveLength(ALL_ACTIONS.length);
    });

    it(':actionBar 控制按钮集合与顺序', async () => {
      const onActions = vi.fn();
      const wrapper = mountChat(ChatActionbar, { props: { actionBar: ['good', 'replay'], onActions } });
      const buttons = wrapper.findAll('button');
      expect(buttons).toHaveLength(2);
      await buttons[0].trigger('click');
      await buttons[1].trigger('click');
      expect(onActions.mock.calls.map(([action]) => action)).toEqual(['good', 'replay']);
    });

    it(':actionBar 为空时不渲染按钮', () => {
      const wrapper = mountChat(ChatActionbar, { props: { actionBar: [] } });
      expect(wrapper.findAll('button')).toHaveLength(0);
      expect(wrapper.find('.t-chat__actions').exists()).toBe(true);
    });

    it(':disabled 禁用所有按钮', () => {
      const wrapper = mountChat(ChatActionbar, { props: { actionBar: ['copy', 'good'], disabled: true } });
      wrapper.findAll('button').forEach((button) => {
        expect(button.attributes('disabled')).toBeDefined();
      });
    });

    it(':comment=good 高亮点赞', () => {
      const wrapper = mountChat(ChatActionbar, { props: { actionBar: ['good', 'bad'], comment: 'good' } });
      expect(wrapper.findAll('.t-chat-button--active')).toHaveLength(1);
    });

    it(':comment=bad 高亮点踩', () => {
      const wrapper = mountChat(ChatActionbar, { props: { actionBar: ['good', 'bad'], comment: 'bad' } });
      expect(wrapper.findAll('.t-chat-button--active')).toHaveLength(1);
    });

    it('复制按钮带 data-clipboard-text 供剪贴板使用', () => {
      const wrapper = mountChat(ChatActionbar, { props: { actionBar: ['copy'], content: '要复制的内容' } });
      expect(wrapper.find('.copy-btn').attributes('data-clipboard-text')).toBe('要复制的内容');
    });
  });

  describe('legacy props', () => {
    it('isGood / isBad 等价 comment', () => {
      const good = mountChat(ChatActionbar, { props: { actionBar: ['good', 'bad'], isGood: true } });
      expect(good.findAll('.t-chat-button--active')).toHaveLength(1);

      const bad = mountChat(ChatActionbar, { props: { actionBar: ['good', 'bad'], isBad: true } });
      expect(bad.findAll('.t-chat-button--active')).toHaveLength(1);
    });
  });

  describe('events', () => {
    it('保留公开 emits 契约', () => expectEmitsContract('ChatActionbar', ChatActionbar));

    it('点击按钮同时触发 actions 与 operation（历史兼容）', async () => {
      const onActions = vi.fn();
      const onOperation = vi.fn();
      const wrapper = mountChat(ChatActionbar, {
        props: { actionBar: ['good'], onActions, onOperation },
      });
      await wrapper.find('button').trigger('click');
      expect(onActions).toHaveBeenCalledWith('good', expect.objectContaining({ e: expect.anything() }));
      expect(onOperation).toHaveBeenCalledWith('good', expect.objectContaining({ e: expect.anything() }));
    });

    it.each(ALL_ACTIONS)('点击 %s 回传操作类型', async (action) => {
      const onActions = vi.fn();
      const wrapper = mountChat(ChatActionbar, { props: { actionBar: [action], onActions } });
      await wrapper.find('button').trigger('click');
      expect(onActions.mock.calls[0][0]).toBe(action);
    });

    it('disabled 时点击不触发事件', async () => {
      const onActions = vi.fn();
      const wrapper = mountChat(ChatActionbar, { props: { actionBar: ['copy'], disabled: true, onActions } });
      await wrapper.find('button').trigger('click');
      expect(onActions).not.toHaveBeenCalled();
    });
  });
});
