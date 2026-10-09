import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';

import * as ChatEntry from '../index';
import { acceptsExistingPropTypes } from '../test/helpers';
import baseline from '../test/api-baseline.json';

const toKebabTagName = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

describe('Chat public API', () => {
  describe('exports', () => {
    it('对外导出清单保持稳定', () => {
      const exported = Object.keys(ChatEntry)
        .filter((key) => key !== 'default')
        .sort();
      expect(exported).toEqual(expect.arrayContaining(baseline.exports));
    });

    it('核心组件与工具均被导出', () => {
      const requiredExports = [
        'Chatbot',
        'ChatList',
        'Chat',
        'ChatItem',
        'ChatSender',
        'ChatActionbar',
        'ChatAction',
        'ChatLoading',
        'ChatThinking',
        'ChatMessage',
        'ChatContent',
        'ChatMarkdown',
        'ChatReasoning',
        'ChatInput',
        'Attachments',
        'ChatSearchContent',
        'ChatSuggestionContent',
        'MarkdownEngine',
        'ToolCallRenderer',
        'useChat',
        'useAgentState',
        'useAgentToolcall',
        'useAgentActivity',
        'AGUIAdapter',
        'getMessageContentForCopy',
        'isAIMessage',
        'isToolCallContent',
      ];
      requiredExports.forEach((name) => {
        expect(ChatEntry, `缺少导出: ${name}`).toHaveProperty(name);
      });
    });

    it('所有组件导出均可通过 app.use 注册（withInstall）', () => {
      [
        'Chatbot',
        'ChatList',
        'ChatItem',
        'ChatSender',
        'ChatActionbar',
        'ChatLoading',
        'ChatThinking',
        'ChatMessage',
        'ChatContent',
        'ChatMarkdown',
        'Attachments',
      ].forEach((name) => {
        const component = (ChatEntry as any)[name];
        expect(['object', 'function'], `${name} 不是组件`).toContain(typeof component);
        expect(typeof component.install, `${name} 缺少 install`).toBe('function');
      });
    });

    it('默认导出提供 install 与 version', () => {
      const entry = (ChatEntry as any).default;
      expect(typeof entry.install).toBe('function');
      expect(entry).toHaveProperty('version');
    });

    it('兼容 Chat 与 ChatAction 别名', () => {
      expect(ChatEntry.Chat).toBe(ChatEntry.ChatList);
      expect(ChatEntry.ChatAction).toBe(ChatEntry.ChatActionbar);
    });
  });

  describe('registration', () => {
    it('全局注册名保持稳定', () => {
      const app = createApp({ render: (): null => null });
      app.use((ChatEntry as any).default);
      // eslint-disable-next-line no-underscore-dangle
      const registered = Object.keys((app as any)._context.components || {})
        .map(toKebabTagName)
        .sort();
      expect(registered).toEqual(expect.arrayContaining(baseline.globalComponents));
    });
  });

  describe('props', () => {
    it('类型扩展不误报，旧类型缩窄或 Boolean 转换变化仍被拦截', () => {
      expect(acceptsExistingPropTypes('[String, Number]', 'String')).toBe(true);
      expect(acceptsExistingPropTypes('[Number, String]', '[String, Number]')).toBe(true);
      expect(acceptsExistingPropTypes('String', '[String, Number]')).toBe(false);
      expect(acceptsExistingPropTypes('[String, Boolean]', '[Boolean, String]')).toBe(false);
    });
  });
});
