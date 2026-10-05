/**
 * L1 - 基础 API 契约
 *
 * 目标：锁定 chat 组件对外暴露的组件清单、组件名、props（名称/类型/默认值/必填）、emits。
 * 这一层**完全不依赖渲染结果**，只读取组件定义，因此：
 * - 迁移前（webc 桥接）与迁移后（纯 Vue）既有契约应当保持一致，新增能力允许通过；
 * - 任何 prop 改名、删除、默认值变化、事件变化都会被这里拦截；
 * - 不会因 DOM 结构变化而失败，不会阻塞重构。
 */
import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';

import * as ChatEntry from '../index';
import ChatList from '../chat-list';
import ChatItem from '../chat-item';
import ChatSender from '../chat-sender';
import ChatActionbar from '../chat-actionbar';
import ChatReasoning from '../chat-reasoning';
import ChatThinking from '../chat-thinking';
import ChatInput from '../chat-input';
import ChatMessage from '../chat-message';
import ChatContent from '../chat-content';
import ChatLoading from '../chat-loading';
import ChatMarkdown from '../chat-markdown';
import Attachments from '../attachments';
import Chatbot from '../chatbot';

import { acceptsExistingPropTypes, contractOf, propNamesOf } from '../test/helpers';
import baseline from '../test/api-baseline.json';

/**
 * 将组件注册名归一为模板标签名（TChatList -> t-chat-list）。
 * 归一化后，实现由 webc 桥接改为 Vue 组件、注册名大小写调整都不会造成误报，
 * 但「标签名变化 / 组件被移除」会被准确拦截。
 */
const toKebabTagName = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

/** 由 Vue 层实现、props 定义在仓库内的组件 */
const vueLayerComponents: Array<[keyof typeof baseline.props, any]> = [
  ['ChatList', ChatList],
  ['ChatItem', ChatItem],
  ['ChatSender', ChatSender],
  ['ChatActionbar', ChatActionbar],
  ['ChatReasoning', ChatReasoning],
  ['ChatThinking', ChatThinking],
  ['ChatInput', ChatInput],
  ['ChatMessage', ChatMessage],
  ['ChatContent', ChatContent],
];

/** 当前由 webc 桥接、迁移后改为 Vue 实现的组件（此处只校验「存在且可注册」） */
const bridgedComponents: Array<[string, any]> = [
  ['Chatbot', Chatbot],
  ['ChatLoading', ChatLoading],
  ['ChatMarkdown', ChatMarkdown],
  ['Attachments', Attachments],
];

describe('chat :api', () => {
  describe(':exports', () => {
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
        // chat-engine 组合类能力
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
  });

  describe(':props', () => {
    it.each(vueLayerComponents)('%s props 契约', (name, component) => {
      const actual = contractOf(component).props;
      Object.entries(baseline.props[name]).forEach(([prop, expected]: [string, any]) => {
        const message = `${name}.${prop} 既有契约发生变化`;
        expect(actual[prop], message).toBeDefined();
        expect(acceptsExistingPropTypes(actual[prop].type, expected.type), message).toBe(true);
        expect(actual[prop].default, message).toEqual(expected.default);
        expect(actual[prop].required && !expected.required, message).toBe(false);
      });
    });

    it('类型扩展不误报，旧类型缩窄或 Boolean 转换变化仍被拦截', () => {
      expect(acceptsExistingPropTypes('[String, Number]', 'String')).toBe(true);
      expect(acceptsExistingPropTypes('[Number, String]', '[String, Number]')).toBe(true);
      expect(acceptsExistingPropTypes('String', '[String, Number]')).toBe(false);
      expect(acceptsExistingPropTypes('[String, Boolean]', '[Boolean, String]')).toBe(false);
    });

    it.each(vueLayerComponents)('%s emits 契约', (name, component) => {
      expect(contractOf(component).emits).toEqual(expect.arrayContaining(baseline.emits[name]));
    });

    it('全局注册名（模板中使用的标签名）保持稳定', () => {
      const app = createApp({ render: (): null => null });
      app.use((ChatEntry as any).default);
      // eslint-disable-next-line no-underscore-dangle
      const registered = Object.keys((app as any)._context.components || {})
        .map(toKebabTagName)
        .sort();
      expect(registered).toEqual(expect.arrayContaining(baseline.globalComponents));
    });

    it.each(bridgedComponents)('%s 为可挂载组件', (name, component) => {
      expect(component, `${name} 未导出`).toBeTruthy();
      expect(typeof component === 'object' || typeof component === 'function').toBe(true);
    });
  });

  describe(':backward-compat', () => {
    it('Chat 与 ChatList 指向同一实现，ChatAction 与 ChatActionbar 指向同一实现', () => {
      expect(ChatEntry.Chat).toBe(ChatEntry.ChatList);
      expect(ChatEntry.ChatAction).toBe(ChatEntry.ChatActionbar);
    });

    it('ChatList 保留历史 props（clearHistory / reverse / layout / autoScroll）', () => {
      const names = propNamesOf(ChatList);
      ['clearHistory', 'reverse', 'layout', 'autoScroll', 'data', 'textLoading'].forEach((prop) => {
        expect(names, `缺少 prop: ${prop}`).toContain(prop);
      });
    });

    it('ChatActionbar 保留历史 props（operationBtn / isGood / isBad）', () => {
      const names = propNamesOf(ChatActionbar);
      ['actionBar', 'operationBtn', 'isGood', 'isBad', 'comment', 'disabled'].forEach((prop) => {
        expect(names, `缺少 prop: ${prop}`).toContain(prop);
      });
    });

    it('ChatSender 保留 v-model 能力（value / modelValue / defaultValue）', () => {
      const names = propNamesOf(ChatSender);
      ['value', 'modelValue', 'defaultValue'].forEach((prop) => {
        expect(names, `缺少 prop: ${prop}`).toContain(prop);
      });
    });
  });
});
