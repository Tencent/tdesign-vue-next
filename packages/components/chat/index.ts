import _Chat from './chat';
import _ChatItem from './chat-item';
import _ChatInput from './chat-input';
import _ChatContent from './chat-content';
import _ChatReasoning from './chat-reasoning';
import _ChatLoading from './chat-loading';

import _ChatAction from './chat-action';
import _FileCard from './file-card';
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
import '@tencent/tdesign-chatbot/lib/chat-sender';
import '@tencent/tdesign-chatbot/lib/attachments';
import { omiVueify } from 'omi-vueify';
import type { DefineComponent } from 'vue';
import type { TdAttachmentsProps } from '@tencent/tdesign-chatbot/lib/attachments';

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
export const Attachments = omiVueify('t-attachments', {
  methodNames: [],
}) as DefineComponent<TdAttachmentsProps>;
export const ChatAttachments = withInstall(Attachments);
export default Chat;
