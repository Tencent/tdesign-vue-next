import React from 'react';
import { Space } from 'tdesign-react';
import { ChatActionBar, ChatMessage } from '@tdesign-react/aigc';

import { AIMessage, getMessageContentForCopy } from 'tdesign-web-components';

const message: AIMessage = {
  id: '123123',
  role: 'assistant',
  content: [
    {
      type: 'text',
      data: '牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。',
    },
  ],
};
export default function ChatMessageExample() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <ChatMessage
        variant="text"
        avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
        name="TDesignAI"
        message={message}
      >
        {/* 植入插槽用来追加消息底部操作栏 */}
        <ChatActionBar slot="actionbar" copyText={getMessageContentForCopy(message)}></ChatActionBar>
      </ChatMessage>
    </Space>
  );
}
