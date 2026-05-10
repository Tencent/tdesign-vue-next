export * from './hooks/index';
export * from './components/toolcall';
export * from './components/provider';
export * from './components/activity';
//Re-export core API from @tdesign/ai-chat-engine
// For full core API, use: import { ... } from '@tdesign/ai-chat-engine'
export { default as ChatEngine } from '@tdesign/ai-chat-engine';
export { ChatEngineEventType, ChatEventBus, createEventBus } from '@tdesign/ai-chat-engine';
export { AGUIAdapter, stateManager, activityManager } from '@tdesign/ai-chat-engine';
export {
  isAIMessage,
  isUserMessage,
  isTextContent,
  isMarkdownContent,
  isToolCallContent,
  isActivityContent,
  isThinkingContent,
  isSearchContent,
  isSuggestionContent,
  isAttachmentContent,
  isImageContent,
  applyJsonPatch,
  safeParseJSON,
  getMessageContentForCopy,
  findTargetElement,
} from '@tdesign/ai-chat-engine';
export { AGUIEventType } from '@tdesign/ai-chat-engine';

// Re-export commonly used types
export type {
  ChatMessagesData,
  ChatServiceConfig,
  ChatServiceConfigSetter,
  ChatStatus,
  ChatMessageStatus,
  ChatMessageRole,
  ChatRequestParams,
  ChatMessageSetterMode,
  AIMessageContent,
  UserMessageContent,
  SSEChunkData,
  IChatEngine,
  IChatEventBus,
  UserMessage,
  AIMessage,
  SystemMessage,
  ToolCall,
  ToolCallContent,
  ActivityData,
  ActivityContent,
  TextContent,
  MarkdownContent,
  ThinkingContent,
  SearchContent,
  SuggestionContent,
  ImageContent,
  AttachmentContent,
  AttachmentItem,
  ChatBaseContent,
  ChatContentType,
  ChatEventBusOptions,
  AGUIHistoryMessage,
  AGUIActivityMessage,
} from '@tdesign/ai-chat-engine';
