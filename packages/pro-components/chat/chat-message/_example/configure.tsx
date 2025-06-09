import React from 'react';
import { Divider, Space } from 'tdesign-react';
import { AIMessage, ChatMessage, SystemMessage, UserMessage } from '@tdesign-react/aigc';

const messages = {
  ai: {
    id: '11111',
    role: 'assistant',
    content: [
      {
        type: 'text',
        data: '牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。',
      },
    ],
  } as AIMessage,
  user: {
    id: '22222',
    role: 'user',
    content: [
      {
        type: 'text',
        data: '牛顿第一定律是否适用于所有参考系？',
      },
    ],
  } as UserMessage,
  system: {
    id: '33333',
    role: 'system',
    content: [
      {
        type: 'text',
        data: '模型由 hunyuan 变为 GPT4',
      },
    ],
  } as SystemMessage,
  error: {
    id: '4444',
    role: 'assistant',
    status: 'error',
    content: [
      {
        type: 'text',
        data: '数据解析失败',
      },
    ],
  } as AIMessage,
};

export default function ChatMessageExample() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Divider>可配置角色，头像，昵称，时间</Divider>
      <ChatMessage
        avatar="https://tdesign.gtimg.com/site/avatar.jpg"
        datetime="今天16:38"
        name="张三"
        message={messages.user}
      ></ChatMessage>
      <ChatMessage
        avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
        datetime="今天16:43"
        name="TDesignAI"
        message={messages.ai}
      ></ChatMessage>
      <Divider>可配置位置</Divider>
      <ChatMessage placement="right" variant="base" message={messages.user}></ChatMessage>
      <ChatMessage placement="left" message={messages.ai}></ChatMessage>
      <Divider>角色为system的系统消息</Divider>
      <ChatMessage message={messages.system}></ChatMessage>
    </Space>
  );
}
