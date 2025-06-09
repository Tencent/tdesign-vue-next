import React from 'react';
import { Space } from 'tdesign-react';
import { UserMessage, ChatMessage } from '@tdesign-react/aigc';

const message: UserMessage = {
  content: [
    {
      type: 'text',
      data: '牛顿第一定律是否适用于所有参考系？',
    },
  ],
};

export default function ChatMessageExample() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <ChatMessage message={message}></ChatMessage>
      <ChatMessage variant="base" message={message}></ChatMessage>
      <ChatMessage variant="outline" message={message}></ChatMessage>
    </Space>
  );
}
