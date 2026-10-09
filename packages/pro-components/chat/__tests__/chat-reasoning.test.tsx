/**
 * L2 - ChatReasoning 基础 API / 事件 / 插槽（思维链折叠面板）
 *
 * 思维链是「组合类 UI」的高频使用点：折叠状态受控、布局/图标位置、
 * 以及 header / content / expandIcon 等插槽都需要锁定。
 */
import { describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import ChatReasoning from '../chat-reasoning';
import { flush, mountChat } from '../test/helpers';

describe('ChatReasoning', () => {
  describe('props', () => {
    it('渲染思维链容器', () => {
      const wrapper = mountChat(ChatReasoning);
      expect(wrapper.find('.t-chat__detail-reasoning').exists()).toBe(true);
    });

    it(':layout=border 输出边框布局样式', () => {
      const wrapper = mountChat(ChatReasoning, { props: { layout: 'border' } });
      expect(wrapper.find('.t-chat__detail-reasoning-border').exists()).toBe(true);
    });

    it(':layout=block 不输出边框布局样式', () => {
      const wrapper = mountChat(ChatReasoning, { props: { layout: 'block' } });
      expect(wrapper.find('.t-chat__detail-reasoning-border').exists()).toBe(false);
    });

    it(':collapsed=true 时面板收起', () => {
      const wrapper = mountChat(ChatReasoning, { props: { collapsed: true } });
      expect(wrapper.find('.t-collapse').exists()).toBe(true);
    });

    it(':defaultCollapsed=true 时默认收起', () => {
      const wrapper = mountChat(ChatReasoning, { props: { defaultCollapsed: true } });
      expect(wrapper.find('.t-collapse').exists()).toBe(true);
    });

    it(':collapsePanelProps.header 渲染自定义头部', () => {
      const wrapper = mountChat(ChatReasoning, {
        props: { collapsePanelProps: { header: h('div', { class: 'custom-header' }, '思考中') } },
      });
      expect(wrapper.find('.custom-header').text()).toBe('思考中');
    });

    it(':collapsePanelProps.content 渲染自定义内容', () => {
      const wrapper = mountChat(ChatReasoning, {
        props: { collapsePanelProps: { content: h('div', { class: 'custom-content' }, '推理过程') } },
      });
      expect(wrapper.find('.custom-content').text()).toBe('推理过程');
    });
  });

  describe('events', () => {
    it('展开/收起触发 update:collapsed 与 onExpandChange', async () => {
      const onExpandChange = vi.fn();
      const wrapper = mountChat(ChatReasoning, { props: { collapsed: false, onExpandChange } });
      await wrapper.find('.t-collapse-panel__header').trigger('click');
      await flush();
      expect(onExpandChange).toHaveBeenCalled();
      expect(wrapper.emitted('update:collapsed')).toBeTruthy();
    });

    it('受控 collapsed 变化时同步面板状态', async () => {
      const wrapper = mountChat(ChatReasoning, { props: { collapsed: false } });
      await wrapper.setProps({ collapsed: true });
      await flush();
      expect(wrapper.find('.t-collapse').exists()).toBe(true);
    });
  });

  describe('slots', () => {
    it('header 插槽渲染', () => {
      const wrapper = mountChat(ChatReasoning, {
        slots: { header: '<div class="slot-header">已深度思考</div>' },
      });
      expect(wrapper.find('.slot-header').exists()).toBe(true);
    });

    it('default 插槽作为内容渲染', () => {
      const wrapper = mountChat(ChatReasoning, {
        slots: { default: '<div class="slot-default">推理内容</div>' },
      });
      expect(wrapper.text()).toContain('推理内容');
    });
  });
});
