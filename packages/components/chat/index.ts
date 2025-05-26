import _Chat from './chat';
import _ChatItem from './chat-item';
import _ChatInput from './chat-input';
import _ChatContent from './chat-content';
import _ChatReasoning from './chat-reasoning';
import _ChatLoading from './chat-loading';

import _ChatAction from './chat-action';
import _ChatSender from './chat-sender';

import withInstall from '../utils/withInstall';

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
import '@tencent/tdesign-chatbot/lib/style/index.css';
import '@tencent/tdesign-chatbot/lib/chat-sender';
import '@tencent/tdesign-chatbot/lib/attachments';
import '@tencent/tdesign-chatbot/lib/chat-message/content/thinking-content';
import { omiVueify } from 'omi-vueify';
import type { DefineComponent } from 'vue';
import type { TdAttachmentsProps } from '@tencent/tdesign-chatbot';
import type { TdChatThinkContentProps } from '@tencent/tdesign-chatbot/lib/chat-message/content/thinking-content';
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

export default Chat;
