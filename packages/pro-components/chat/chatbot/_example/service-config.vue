<template>
  <div style="margin-top: -18px; height: 408px">
    <t-chatbot :chat-service-config="chatServiceConfig" />
  </div>
</template>

<script setup lang="ts">
import {
  type SSEChunkData,
  type AIMessageContent,
  type ChatServiceConfig,
  type ChatRequestParams,
} from '@tdesign-vue-next/chat';
import { MessagePlugin } from 'tdesign-vue-next';

/**
 * 自定义协议配置示例
 *
 * 本示例展示如何配置自定义协议的聊天服务。
 * 当后端服务使用自定义数据格式时，需要通过 onMessage 进行数据转换。
 *
 * 配置内容包括：
 * - 请求配置（endpoint、onRequest返回请求头、请求参数）
 * - 数据转换（onMessage：将后端数据转换为组件所需格式）
 * - 生命周期回调（onStart、onComplete、onError、onAbort）
 *
 * 学习目标：
 * - 掌握 chatServiceConfig 的核心配置项
 * - 理解 onMessage 的数据转换逻辑（自定义协议必需）
 * - 学会使用生命周期回调处理不同阶段的业务逻辑
 */

// 聊天服务配置（自定义协议）
const chatServiceConfig: ChatServiceConfig = {
  // 1. 基础配置
  endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
  stream: true, // 是否使用流式传输
  protocol: 'default', // 使用自定义协议（需要配置 onMessage）

  // 2. 请求发送前的配置（添加请求头、修改请求参数等）
  onRequest: (params: ChatRequestParams) => {
    console.log('发送请求前:', params);

    // 可以修改请求参数、添加请求头等
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your-token',
        'X-Custom-Header': 'custom-value',
      },
      // 添加自定义参数
      body: JSON.stringify({
        ...params,
        model: 'gpt-4',
        temperature: 0.7,
      }),
    };
  },

  // 3. 流式传输开始时的回调
  onStart: (chunk: string) => {
    console.log('开始接收流式数据:', chunk);
    MessagePlugin.info('AI 开始回复...');
  },

  // 4. 数据转换：将后端返回的数据转换为组件所需格式
  // 这是最核心的配置，决定了如何解析后端数据
  onMessage: (chunk: SSEChunkData): AIMessageContent | null => {
    console.log('收到数据块:', chunk);

    const { type, ...rest } = chunk.data as any;

    // 根据不同的事件类型，返回不同的内容块
    switch (type) {
      // 文本内容
      case 'text':
        return {
          type: 'markdown',
          data: rest?.msg || '',
          strategy: 'merge', // 合并到同一个文本块
        };

      // 思考过程
      case 'think':
        return {
          type: 'thinking',
          data: {
            title: rest.title || '思考中',
            text: rest.content || '',
          },
          status: /完成/.test(rest?.title) ? 'complete' : 'streaming',
        };

      // 搜索结果
      case 'search':
        return {
          type: 'search',
          data: {
            title: rest.title || '搜索结果',
            references: rest?.content || [],
          },
        };

      // 忽略其他类型的事件（返回 null 表示不处理）
      default:
        console.log('忽略事件类型:', type);
        return null;
    }
  },

  // 5. 请求完成时的回调
  onComplete: (isAborted: boolean, params?: ChatRequestParams) => {
    console.log('请求完成:', { isAborted, params });

    if (isAborted) {
      MessagePlugin.warning('已停止生成');
    } else {
      MessagePlugin.success('回复完成');
    }
  },

  // 6. 用户主动中止时的回调
  onAbort: async () => {
    console.log('用户中止对话');
    // 可以执行清理操作
    await new Promise((resolve) => setTimeout(resolve, 100));
  },

  // 7. 错误处理
  onError: (err: Error | Response) => {
    console.error('请求错误:', err);
    if (err instanceof Response) {
      MessagePlugin.error(`请求失败: ${err.status} ${err.statusText}`);
    } else {
      MessagePlugin.error(`发生错误: ${err.message}`);
    }
  },
};
</script>
