<template>
  <div style="position: relative">
    <!-- 快捷指令区域 -->
    <div class="quick-prompts">
      <div class="prompts-title">快捷指令：</div>
      <div class="prompts-buttons">
        <t-button
          v-for="(prompt, index) in quickPrompts"
          :key="index"
          size="small"
          variant="outline"
          @click="handleQuickPrompt(prompt)"
        >
          {{ prompt }}
        </t-button>
      </div>
    </div>

    <!-- 聊天组件 -->
    <div style="margin-top: 38px; height: 352px">
      <t-chatbot ref="chatRef" :sender-props="senderProps" :chat-service-config="chatServiceConfig" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  type SSEChunkData,
  type AIMessageContent,
  type ChatServiceConfig,
  type TdChatbotApi,
  type TdAttachmentItem,
  type TdChatSenderActionName,
} from '@tdesign-vue-next/chat';
import { MessagePlugin } from 'tdesign-vue-next';

/**
 * 输入配置示例
 *
 * 本示例展示如何通过 senderProps 配置输入框的基础行为。
 * senderProps 会透传给内部的 ChatSender 组件，用于控制输入框的功能和交互。
 *
 * 配置内容包括：
 * - 输入框基础配置（占位符、自动高度等）
 * - 附件上传配置（文件类型、附件展示等）
 * - 输入事件回调（输入、聚焦、失焦等）
 *
 * 学习目标：
 * - 掌握 senderProps 的常用配置项
 * - 了解如何处理附件上传
 * - 学会处理输入事件
 *
 * 相关文档：
 * - ChatSender 组件详细文档：https://tdesign.tencent.com/react-chat/components/chat-sender
 */

const chatRef = ref<TdChatbotApi | null>(null);
const files = ref<TdAttachmentItem[]>([]);

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

// 输入框配置
const senderProps = {
  // 基础配置
  placeholder: '请输入您的问题...（支持 Shift+Enter 换行）',
  // 输入框配置，透传Textarea组件的属性
  textareaProps: {
    maxlength: 10,
  },
  // 操作按钮
  actions: ['attachment', 'send'] as TdChatSenderActionName[], // 显示附件按钮和发送按钮
  // 附件配置
  attachmentsProps: {
    items: files.value, // 附件列表
    overflow: 'scrollX', // 附件溢出时横向滚动
  },
  // 上传配置
  uploadProps: {
    accept: '.pdf,.docx,.txt,.md', // 允许的文件类型
  },
  // 事件回调
  onChange: (e: CustomEvent<string>) => {
    console.log('输入内容:', e.detail);
  },
  onFocus: () => {
    console.log('输入框获得焦点');
  },
  onBlur: () => {
    console.log('输入框失去焦点');
  },
  onFileSelect: (e: CustomEvent<File[]>) => {
    console.log('选择文件:', e.detail);
    // 添加新文件并模拟上传进度
    const newFile: TdAttachmentItem = {
      name: e.detail[0].name,
      size: e.detail[0].size,
      status: 'progress',
      description: '上传中',
    };

    files.value.unshift(newFile);

    // 模拟上传完成
    setTimeout(() => {
      const index = files.value.findIndex((file) => file.name === newFile.name);
      if (index !== -1) {
        files.value[index] = {
          ...files.value[index],
          url: 'https://tdesign.gtimg.com/site/avatar.jpg',
          status: 'success',
          description: `${Math.floor((newFile?.size || 0) / 1024)}KB`,
        };
      }
      MessagePlugin.success(`文件 ${newFile.name} 上传成功`);
    }, 1000);
  },
  onFileRemove: (e: CustomEvent<TdAttachmentItem[]>) => {
    console.log('移除文件后的列表:', e.detail);
    files.value = e.detail;
    MessagePlugin.info('文件已移除');
  },
};

// 快捷指令列表
const quickPrompts = ['介绍一下 TDesign', '如何使用 Chatbot 组件？', '有哪些内容类型？', '如何自定义样式？'];

// 处理快捷指令点击
const handleQuickPrompt = (prompt: string) => {
  chatRef.value?.addPrompt(prompt);
};
</script>

<style scoped lang="less">
.quick-prompts {
  position: absolute;
  top: -40px;
  left: -40px;
  width: calc(100% + 80px);
  padding: 12px 0 12px 16px;
  background: #f5f5f5;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .prompts-title {
    font-size: 14px;
    font-weight: 500;
  }

  .prompts-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
