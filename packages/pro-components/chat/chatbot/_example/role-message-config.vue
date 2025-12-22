<template>
  <div style="margin-top: -18px; height: 408px">
    <t-chatbot
      ref="chatRef"
      :default-messages="defaultMessages"
      :message-props="messageProps"
      :chat-service-config="chatServiceConfig"
    />
  </div>
</template>

<script setup lang="ts">
import {
  type SSEChunkData,
  type AIMessageContent,
  type TdChatMessageConfigItem,
  type ChatMessagesData,
  type ChatServiceConfig,
  type TdChatbotApi,
} from '@tdesign-vue-next/chat';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

/**
 * 角色消息配置示例
 *
 * 本示例展示如何通过 messageProps 配置不同角色的消息展示效果。
 * messageProps 会透传给内部的 ChatMessage 组件，用于控制消息的渲染和交互。
 *
 * 配置内容包括：
 * - 消息样式配置（气泡样式、位置、头像、昵称等）
 * - 消息操作按钮配置（复制、点赞、点踩、重试）
 * - 内容类型展示配置（思考过程、搜索结果、Markdown 等）
 * - 静态配置 vs 动态配置的使用场景
 *
 * 学习目标：
 * - 掌握 messageProps 动态配置函数的使用方式
 * - 了解如何根据消息内容、状态动态调整配置
 * - 学会配置消息操作按钮及其回调
 * - 学会使用 chatContentProps 控制内容展示行为
 *
 * 相关文档：
 * - ChatMessage 组件详细文档：https://tdesign.tencent.com/react-chat/components/chat-message
 */

const chatRef = ref<TdChatbotApi | null>(null);

// 初始化消息：展示各种内置支持的渲染类型
const defaultMessages: ChatMessagesData[] = [
  {
    id: 'demo-1',
    role: 'user',
    content: [
      {
        type: 'text',
        data: '请展示一下 TDesign Chatbot 内置支持的各种内容类型',
      },
    ],
    datetime: '2024-01-01 10:00:00',
  },
  {
    id: 'demo-2',
    role: 'assistant',
    status: 'complete',
    datetime: '2024-01-01 10:00:05',
    content: [
      // 1. 思考过程
      {
        type: 'thinking',
        data: {
          title: '分析问题',
          text: '正在分析用户问题的核心需求，准备展示各种内容类型...',
        },
        status: 'complete',
      },
      // 2. 搜索结果
      {
        type: 'search',
        data: {
          title: '找到 3 条相关内容',
          references: [
            {
              title: 'TDesign 官网',
              url: 'https://tdesign.tencent.com',
              content: 'TDesign 是腾讯开源的企业级设计体系',
            },
            {
              title: 'TDesign Vue',
              url: 'https://tdesign.tencent.com/vue-next',
              content: 'TDesign 的 Vue 技术栈实现',
            },
            {
              title: 'TDesign AIGC',
              url: 'https://tdesign.tencent.com/react-chat',
              content: 'TDesign 的 AI 对话组件库',
            },
          ],
        },
      },
      // 3. Markdown 内容
      {
        type: 'markdown',
        data: `好的！以下是 TDesign Chatbot 支持的各种内容类型：

**1. 文本和 Markdown**
- 纯文本内容
- **粗体**、*斜体*、\`代码\`
- [链接](https://tdesign.tencent.com)

**2. 代码块**
\`\`\`javascript
const greeting = 'Hello TDesign!';
console.log(greeting);
\`\`\`

**3. 列表**
- 思考过程（Thinking）
- 搜索结果（Search）
- 建议问题（Suggestion）
- 图片（Image）
- 附件（Attachment）`,
      },
      // 4. 建议问题
      {
        type: 'suggestion',
        data: [
          { title: '继续了解 TDesign', prompt: '告诉我更多关于 TDesign 的信息' },
          { title: '查看组件列表', prompt: 'TDesign 有哪些组件？' },
          { title: '如何使用', prompt: '如何在项目中使用 TDesign？' },
        ],
      },
    ],
  },
];

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = {
  endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
  stream: true,
  onMessage: (chunk: SSEChunkData): AIMessageContent => {
    const { ...rest } = chunk.data as any;
    return {
      type: 'markdown',
      data: rest?.msg || '',
    };
  },
};

// 动态配置消息展示函数：根据消息内容、状态等动态调整配置
// 适用于需要根据不同消息特征返回不同配置的场景
const messageProps = (msg: ChatMessagesData): TdChatMessageConfigItem => {
  const { role } = msg;

  // 用户消息配置
  if (role === 'user') {
    return {
      variant: 'base',
      placement: 'right',
      avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
      name: '用户',
    };
  }

  // AI 消息配置
  if (role === 'assistant') {
    return {
      variant: 'text',
      placement: 'left',
      avatar: 'https://tdesign.gtimg.com/site/avatar-boy.jpg',
      name: 'TDesign 助手',
      // 消息操作按钮
      actions: ['copy', 'replay', 'good', 'bad'],
      // 消息操作回调
      handleActions: {
        copy: () => {
          MessagePlugin.success('已复制到剪贴板');
        },
        good: ({ message, active }) => {
          console.log('点赞', message, active);
          MessagePlugin.success(active ? '已点赞' : '取消点赞');
        },
        bad: ({ message, active }) => {
          console.log('点踩', message, active);
          MessagePlugin.success(active ? '已点踩' : '取消点踩');
        },
        replay: ({ message }) => {
          console.log('重新生成', message);
          MessagePlugin.info('重新生成功能将在实例方法示例中展示');
        },
        searchItem: ({ content }) => {
          console.log('点击搜索条目', content);
        },
        suggestion: ({ content }) => {
          console.log('点击建议问题', content);
        },
      },
      // 根据消息状态和内容动态配置
      chatContentProps: {
        // 思考过程
        thinking: {
          collapsed: false, // 是否折叠
          layout: 'block', // 展示样式：border、block
          maxHeight: 200, // 展示最大高度，超出会自动向下滚动
        },
        // 搜索结果
        search: {
          useCollapse: true,
          collapsed: false,
        },
        // markdown文本
        markdown: {
          // 透传cherryMarkdown引擎配置
          options: {
            themeSettings: {
              codeBlockTheme: 'light',
            },
          },
        },
      },
    };
  }

  return {};
};
</script>
