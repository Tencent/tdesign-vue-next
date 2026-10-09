import { expectPropsContract, mountChat } from '../../test/helpers';

/**
 * L2 - ChatItem 基础 API / 插槽
 *
 * ChatItem 的 DOM 完全由 Vue 层渲染，是 UI 层回归的重点。
 * 这里只断言「角色/变体/头像/昵称/时间/内容」对外语义，不依赖底层气泡实现。
 */
import { describe, expect, it } from 'vitest';
import ChatItem from '..';
import ChatLoading from '../../chat-loading';
import ChatReasoning from '../../chat-reasoning';

describe('ChatItem', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatItem', ChatItem));

    it(':role 输出到根节点', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'user' } });
      expect(wrapper.classes()).toContain('t-chat__inner');
      expect(wrapper.classes()).toContain('user');
    });

    it.each(['user', 'assistant', 'error', 'model-change', 'system'])(':role=%s 均输出对应样式标记', (role) => {
      const wrapper = mountChat(ChatItem, { props: { role } });
      expect(wrapper.classes()).toContain(role);
    });

    it.each(['base', 'outline', 'text'])(':variant=%s 输出变体样式', (variant) => {
      const wrapper = mountChat(ChatItem, { props: { variant } });
      expect(wrapper.classes()).toContain(`t-chat__text--variant--${variant}`);
    });

    it(':name 与 :datetime 渲染，并切换内容区边距样式', () => {
      const withoutMeta = mountChat(ChatItem, { props: { role: 'user' } });
      expect(withoutMeta.find('.t-chat__base').exists()).toBe(false);
      expect(withoutMeta.find('.t-chat__content--base').exists()).toBe(true);

      const withMeta = mountChat(ChatItem, { props: { role: 'user', name: '张三', datetime: '2024-01-01' } });
      expect(withMeta.find('.t-chat__base').exists()).toBe(true);
      expect(withMeta.find('.t-chat__name').text()).toBe('张三');
      expect(withMeta.find('.t-chat__time').text()).toBe('2024-01-01');
      expect(withMeta.find('.t-chat__content--base').exists()).toBe(false);
    });

    it(':avatar 字符串渲染图片', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'user', avatar: 'https://example.com/a.png' } });
      const img = wrapper.find('.t-chat__avatar-image');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('https://example.com/a.png');
    });

    it(':content 文本内容渲染到内容区', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'user', content: '你好 TDesign' } });
      expect(wrapper.find('.t-chat__detail').text()).toContain('你好 TDesign');
    });

    it(':textLoading 渲染加载态', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'assistant', textLoading: true } });
      expect(wrapper.findComponent(ChatLoading).exists() || wrapper.find('.t-skeleton').exists()).toBe(true);
    });

    it(':textLoading=false 不渲染加载态', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'assistant', textLoading: false, content: 'hi' } });
      expect(wrapper.find('.t-chat__detail').exists()).toBe(true);
    });

    it(':reasoningLoading 与字符串 reasoning 组合时渲染思考中加载态', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'assistant', reasoning: '思考过程', reasoningLoading: true },
      });
      expect(wrapper.findComponent(ChatLoading).exists()).toBe(true);
    });

    it(':reasoning 为对象时渲染思维链', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'assistant', reasoning: { expandIconPlacement: 'right' } },
      });
      expect(wrapper.findComponent(ChatReasoning).exists()).toBe(true);
    });

    it(':reasoning 为字符串时渲染思维链', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'assistant', reasoning: '思考过程' } });
      expect(wrapper.findComponent(ChatReasoning).exists()).toBe(true);
    });

    it(':reasoning=false 不渲染思维链', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'assistant', reasoning: false, content: 'hi' } });
      expect(wrapper.findComponent(ChatReasoning).exists()).toBe(false);
    });

    it('role=model-change 时不渲染头像与昵称', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'model-change', avatar: 'a.png', name: '模型' } });
      expect(wrapper.find('.t-chat__avatar').exists()).toBe(false);
      expect(wrapper.find('.t-chat__base').exists()).toBe(false);
    });
  });

  describe('slots', () => {
    it('未传入 content 时内容区仍存在（空态不报错）', () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'user' } });
      expect(wrapper.find('.t-chat__content').exists()).toBe(true);
    });

    it('content 插槽优先于 props.content', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'user', content: 'props content' },
        slots: { content: '<div class="slot-content">slot content</div>' },
      });
      expect(wrapper.find('.slot-content').exists()).toBe(true);
      expect(wrapper.text()).not.toContain('props content');
    });

    it('avatar 插槽渲染', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'user' },
        slots: { avatar: '<div class="slot-avatar">A</div>' },
      });
      expect(wrapper.find('.slot-avatar').exists()).toBe(true);
    });

    it('name / datetime 插槽渲染', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'user' },
        slots: { name: '<div class="slot-name">昵称</div>', datetime: '<div class="slot-time">时间</div>' },
      });
      expect(wrapper.find('.slot-name').exists()).toBe(true);
      expect(wrapper.find('.slot-time').exists()).toBe(true);
    });

    it('assistant 角色下 actionbar 插槽渲染在内容下方', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'assistant', content: 'hi' },
        slots: { actionbar: '<div class="slot-actionbar">actions</div>' },
      });
      expect(wrapper.find('.t-chat__actions-margin .slot-actionbar').exists()).toBe(true);
    });

    it('向后兼容：actions 插槽同样渲染', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'assistant', content: 'hi' },
        slots: { actions: '<div class="slot-actions">actions</div>' },
      });
      expect(wrapper.find('.t-chat__actions-margin .slot-actions').exists()).toBe(true);
    });
  });
});
