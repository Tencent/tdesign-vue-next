import { App } from 'vue';

import _Chat from './chat';
import _ChatItem from './chat-item';
import _ChatInput from './chat-input';
import _ChatContent from './chat-content';
import _ChatReasoning from './chat-reasoning';
import _ChatLoading from './chat-loading';

// 用的vue源码
import _ChatAction from './chat-action';
import _FileCard from './file-card';
import _ChatSender from './chat-sender';
import _ChatAttachments from './attachments';
import _ChatThinking from './chat-thinking';
import _ChatBot from './chatbot';
import _ChatMarkdown from './chat-markdown';
import { ChatSearchContentComponent, ChatSuggestionContentComponent, ChatListComponent } from './chatbot';
// 修改为直接导出
import { useChat } from './chatbot/useChat';
export { useChat };

import _ChatMessage from './chat-message';
import { withInstall } from '@tdesign/shared-utils';

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

export const Chat = withInstall(_Chat);
export const ChatItem = withInstall(_ChatItem);
export const ChatInput = withInstall(_ChatInput);
export const ChatSender = withInstall(_ChatSender);
export const ChatContent = withInstall(_ChatContent);
export const ChatReasoning = withInstall(_ChatReasoning);
export const ChatAction = withInstall(_ChatAction);
export const FileCard = withInstall(_FileCard);
export const ChatLoading = withInstall(_ChatLoading);
// 附件
export const ChatAttachments = withInstall(_ChatAttachments);
// 思考
export const ChatThinking = withInstall(_ChatThinking, 't-chat-thinking');
// 机器人
export const ChatBot = withInstall(_ChatBot, 't-chatbot');
// 消息对话
export const ChatMessage = withInstall(_ChatMessage, 't-chat-message');

export const ChatSearchContent = withInstall(ChatSearchContentComponent, 't-chat-search-content');

export const ChatSuggestionContent = withInstall(ChatSuggestionContentComponent, 't-chat-suggestion-content');

export const ChatList = withInstall(ChatListComponent, 't-chat-list');
export const ChatMarkdown = withInstall(_ChatMarkdown, 't-chat-markdown');

// 导出 MarkdownEngine
export { TdMarkdownEngine as MarkdownEngine };

// webc组件没有加入use todo
export default {
  // TODO: refactor
  install(app: App, config?: Record<string, unknown>) {
    app.use(Chat, config);
    app.use(ChatItem, config);
    app.use(ChatInput, config);
    app.use(ChatContent, config);
    app.use(ChatReasoning, config);
    app.use(ChatAction, config);
    app.use(ChatLoading, config);
    app.use(ChatSender, config);
    app.use(ChatThinking, config);
    app.use(ChatMessage, config);
    app.use(ChatBot, config);
    app.use(ChatAttachments, config);
    app.use(ChatSearchContent, config);
    app.use(ChatSuggestionContent, config);
    app.use(ChatList, config);
    app.use(FileCard, config);
    app.use(ChatMarkdown, config);
  },
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION,
};
