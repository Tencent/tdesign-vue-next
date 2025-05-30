import { App } from 'vue';

import _Chat from './chat';
import _ChatItem from './chat-item';
import _ChatInput from './chat-input';
import _ChatContent from './chat-content';
import _ChatReasoning from './chat-reasoning';
import _ChatLoading from './chat-loading';

import _ChatAction from './chat-action';
// import _FileCard from './file-card';
import _ChatSender from './chat-sender';

// TODO: need refactor
import withInstall from '../../components/utils/withInstall';

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

import {
  TdChatbotApi,
  TdChatListProps,
  TdChatSearchContentProps,
  TdChatSuggestionContentProps,
} from 'tdesign-web-components';

import './style';
import 'tdesign-web-components/lib/style/index.css';
import 'tdesign-web-components/lib/chat-sender';
import 'tdesign-web-components/lib/attachments';
import 'tdesign-web-components/lib/chat-message/content/thinking-content';
import 'tdesign-web-components/lib/chatbot';
import 'tdesign-web-components/lib/chat-message/content/search-content';
import 'tdesign-web-components/lib/chat-message/content/suggestion-content';
import { omiVueify } from 'omi-vueify';
import type { DefineComponent } from 'vue';
import type { TdAttachmentsProps } from 'tdesign-web-components';
import type { TdChatThinkContentProps } from 'tdesign-web-components/lib/chat-message/content/thinking-content';
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
// export const FileCard = withInstall(_FileCard);
export const ChatLoading = withInstall(_ChatLoading);
// 附件
export const ChatAttachments = omiVueify('t-attachments', {
  methodNames: [],
}) as DefineComponent<TdAttachmentsProps>;
// export const ChatAttachments = withInstall(Attachments);
// 思考过程
export const ChatThinking = omiVueify('t-chat-thinking-content', {
  methodNames: [],
}) as DefineComponent<TdChatThinkContentProps>;
// export const ChatThinking = withInstall(ChatThinking);

export const Bot = omiVueify('t-chatbot', {
  // TODO: 这里可以补充TdChatbotApi里需要暴露出来的方法（ref实例上的方法）
  methodNames: ['addPrompt'],
}) as DefineComponent<TdChatProps>;

export const ChatBot = withInstall(Bot, 't-chatbot');

export const ChatSearchContent = omiVueify('t-chat-search-content', {
  methodNames: [],
}) as DefineComponent<TdChatSearchContentProps>;

export const ChatSuggestionContent = omiVueify('t-chat-suggestion-content', {
  methodNames: [],
}) as DefineComponent<TdChatSuggestionContentProps>;

export const ChatList = omiVueify('t-chat-list', {
  methodNames: [],
}) as DefineComponent<TdChatListProps>;

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
  },
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION,
};
