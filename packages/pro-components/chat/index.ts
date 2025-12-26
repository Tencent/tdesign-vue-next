import { App } from 'vue';

import _ChatList from './chat-list';
import _ChatItem from './chat-item';
import _ChatInput from './chat-input';
import _ChatContent from './chat-content';
import _ChatReasoning from './chat-reasoning';
import _ChatLoading from './chat-loading';

import _ChatActionbar from './chat-actionbar';
import _ChatSender from './chat-sender';
import _Attachments from './attachments';
import _ChatThinking from './chat-thinking';
import _ChatBot from './chatbot';
import _ChatMarkdown from './chat-markdown';
import { ChatSearchContentComponent, ChatSuggestionContentComponent } from './chatbot';

import _ChatMessage from './chat-message';
import { withInstall } from '@tdesign/shared-utils';
import { ToolCallRenderer } from './chat-engine/components/toolcall';
export * from './chat-engine';

import {
  TdChatProps,
  TdChatItemProps,
  TdChatContentProps,
  TdChatActionProps,
  TdChatInputProps,
  TdChatSenderProps,
  TdChatReasoningProps,
  TdChatLoadingProps,
} from './type';

import './style';
import 'tdesign-web-components/lib/style/index.css';
import 'tdesign-web-components/lib/chat-message/content/search-content';
import 'tdesign-web-components/lib/chat-message/content/suggestion-content';
import { TdMarkdownEngine } from 'tdesign-web-components/lib/chat-message';

export * from './type';

export type ChatProps = TdChatProps;
export type ChatItemProps = TdChatItemProps;
export type ChatContentProps = TdChatContentProps;
export type ChatActionProps = TdChatActionProps;
export type ChatInputProps = TdChatInputProps;
export type ChatSenderProps = TdChatSenderProps;
export type ChatReasoningProps = TdChatReasoningProps;
export type ChatLoadingProps = TdChatLoadingProps;

export const ChatList = withInstall(_ChatList);
export const ChatSender = withInstall(_ChatSender);
export const ChatActionbar = withInstall(_ChatActionbar);
export const ChatLoading = withInstall(_ChatLoading);
export const Attachments = withInstall(_Attachments);
export const ChatThinking = withInstall(_ChatThinking, 't-chat-thinking');
export const ChatBot = withInstall(_ChatBot, 't-chatbot');
export const ChatMessage = withInstall(_ChatMessage, 't-chat-message');
export const ChatContent = withInstall(_ChatContent);
export const ChatSearchContent = withInstall(ChatSearchContentComponent, 't-chat-search-content');

export const ChatSuggestionContent = withInstall(ChatSuggestionContentComponent, 't-chat-suggestion-content');

export const ChatMarkdown = withInstall(_ChatMarkdown, 't-chat-markdown');

// TODO：待下线的组件
export const Chat = withInstall(_ChatList); // 兼容历史版本，分别导出ChatList，Chat
export const ChatAction = withInstall(_ChatActionbar); // 兼容历史版本，分别导出ChatActionbar，ChatAction
export const ChatInput = withInstall(_ChatInput);
export const ChatReasoning = withInstall(_ChatReasoning);
export const ChatItem = withInstall(_ChatItem);

// 导出 MarkdownEngine
export { TdMarkdownEngine as MarkdownEngine };

// 导出 ToolCallRenderer
export { ToolCallRenderer };

export default {
  install(app: App, config?: Record<string, unknown>) {
    app.use(ChatBot, config);
    app.use(ChatList, config);
    app.use(ChatContent, config);
    app.use(ChatMarkdown, config);
    app.use(ChatActionbar, config);
    app.use(ChatLoading, config);
    app.use(ChatSender, config);
    app.use(ChatThinking, config);
    app.use(ChatMessage, config);
    app.use(Attachments, config);
    app.use(ChatSearchContent, config);
    app.use(ChatSuggestionContent, config);
    app.use(ChatInput, config);
    app.use(ChatItem, config);
    app.use(ChatReasoning, config);
    app.component('TChat', Chat);
    app.component('TChatAction', ChatAction);
  },
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION,
};

export {
  AGUIAdapter,
  getMessageContentForCopy,
  isAIMessage,
  isToolCallContent,
} from 'tdesign-web-components/lib/chat-engine';

export type {
  SSEChunkData,
  AIMessageContent,
  ChatRequestParams,
  ChatMessagesData,
  ChatServiceConfig,
} from 'tdesign-web-components/lib/chat-engine';
