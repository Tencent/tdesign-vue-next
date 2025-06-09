import React, { useState } from 'react';
import { Divider, Space, Select } from 'tdesign-react';
import { AIMessage, ChatMessage, TdChatLoadingProps } from '@tdesign-react/aigc';

const messages: Record<string, AIMessage> = {
  loading: {
    id: '11111',
    role: 'assistant',
    status: 'pending',
  },
  error: {
    id: '22222',
    role: 'assistant',
    status: 'error',
  },
};

export default function ChatMessageExample() {
  const [animation, setAnimation] = useState<TdChatLoadingProps['animation']>('skeleton');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Divider>消息加载状态</Divider>
      <Select
        value={animation}
        onChange={(value: TdChatLoadingProps['animation']) => {
          setAnimation(value);
        }}
        style={{
          width: '20%',
        }}
        options={[
          { label: 'skeleton', value: 'skeleton' },
          { label: 'moving', value: 'moving' },
          { label: 'gradient', value: 'gradient' },
          { label: 'circle', value: 'circle' },
        ]}
      />
      <ChatMessage
        avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
        datetime="今天16:38"
        animation={animation}
        name="TDesignAI"
        message={messages.loading}
      ></ChatMessage>
      <Divider>出错状态下的消息</Divider>
      <ChatMessage avatar="https://tdesign.gtimg.com/site/chat-avatar.png" message={messages.error}></ChatMessage>
    </Space>
  );
}
