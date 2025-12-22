<template>
  <div style="margin-top: -18px; height: 408px">
    <t-chatbot
      ref="chatRef"
      :default-messages="mockData"
      :message-props="messageProps"
      :sender-props="senderProps"
      :chat-service-config="chatServiceConfig"
      @messageChange="handleMessageChange"
    >
      <template v-for="msg in mockMessage" :key="msg.id">
        <template v-for="(item, index) in msg.content" :key="`${msg.id}-${item.data.id}`">
          <div v-if="item.type === 'preview'" :slot="`${msg.id}-${item.type}-${index}`">
            <t-card
              bordered
              hover-shadow
              shadow
              size="medium"
              theme="normal"
              :title="item.data.enName"
              style="margin: 14px 0"
            >
              <template #actionbar>
                <t-space v-if="item.status === 'complete'">
                  <a style="cursor: pointer" @click="copyHandler(msg.content[0].data)">复制代码</a>
                  <a style="cursor: pointer" @click="previewHandler">预览</a>
                </t-space>
                <span v-else>{{ item.data.cnName }}</span>
              </template>
            </t-card>
          </div>
        </template>
      </template>
    </t-chatbot>
  </div>
  <t-dialog v-model:visible="visible" header="代码生成预览" @close="closeHandler" @confirm="confirmHandler">
    <login />
  </t-dialog>
</template>

<script lang="tsx">
import { ref, reactive } from 'vue';
import {
  ChatMessagesData,
  SSEChunkData,
  TdChatMessageConfig,
  AIMessageContent,
  ChatRequestParams,
  ChatServiceConfig,
} from '@tdesign-vue-next/chat';
import Login from './components/Login.vue';

// 默认初始化消息
const mockData = [
  {
    id: '123',
    role: 'assistant',
    content: [
      {
        type: 'text',
        status: 'complete',
        data: '欢迎使用TDesign Chatbot智能代码助手，请输入你的问题',
      },
    ],
  },
];

export default {
  name: 'ChatSample',
  components: {
    Login,
  },
  setup() {
    const chatRef = ref(null);
    const mockMessage = ref<ChatMessagesData[]>(mockData);

    // 预览效果弹窗
    let visible = ref(false);
    const previewHandler = () => {
      console.log(1231);

      visible.value = true;
    };
    const closeHandler = () => {
      visible.value = false;
    };
    const confirmHandler = () => {
      visible.value = false;
    };

    // 复制生成的代码
    const copyHandler = async (code: string) => {
      try {
        const codeBlocks = Array.from(code.matchAll(/```(?:jsx|javascript)?\n([\s\S]*?)```/g)).map((match) =>
          match[1].trim(),
        );
        // 拼接多个代码块（如有）
        const combinedCode = codeBlocks.join('\n\n// 分割代码块\n\n');

        // 使用剪贴板
        await navigator.clipboard.writeText(combinedCode);
        console.log('代码已复制到剪贴板');
      } catch (error) {
        console.error('复制失败:', error);
      }
    };

    // 消息属性配置
    const messageProps: TdChatMessageConfig = reactive({
      user: {
        variant: 'base',
        placement: 'right',
        avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
      },
      assistant: {
        actions: ['replay', 'good', 'bad'],
        handleActions: {
          // 处理消息操作回调
          replay: ({ message, active }) => {
            console.log('自定义重新回复', message, active);
            chatRef.value?.regenerate();
          },
        },
        // 内置的消息渲染配置
        chatContentProps: {
          markdown: {
            options: {
              html: true,
              breaks: true,
              typographer: true,
            },
            pluginConfig: [
              // 按需加载，开启插件
              {
                preset: 'code', // 代码块
                enabled: true,
              },
            ],
          },
        },
      },
    });

    // 聊天服务配置
    const chatServiceConfig: ChatServiceConfig = reactive({
      // 对话服务地址
      endpoint: `https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal`,
      stream: true,
      // 流式对话结束（aborted为true时，表示用户主动结束对话，params为请求参数）
      onComplete: (aborted: boolean, params: RequestInit) => {
        console.log('onComplete', aborted, params);
      },
      // 流式对话过程中出错业务自定义行为
      onError: (err: Error | Response) => {
        console.error('Chatservice Error:', err);
      },
      // 流式对话过程中用户主动结束对话业务自定义行为
      onAbort: async () => {},
      // 自定义流式数据结构解析
      onMessage: (chunk: SSEChunkData): AIMessageContent => {
        const { type, ...rest } = chunk.data;
        switch (type) {
          // 正文
          case 'text':
            return {
              type: 'markdown',
              data: rest?.msg || '',
              // 根据后端返回的paragraph字段来决定是否需要另起一段展示markdown
              strategy: rest?.paragraph === 'next' ? 'append' : 'merge',
            };
          // 自定义：代码运行结果预览
          case 'preview':
            return {
              type: 'preview',
              status: () => (/完成/.test(rest?.content?.cnName) ? 'complete' : 'streaming'),
              data: rest?.content,
            };
        }
      },
      // 自定义请求参数
      onRequest: (innerParams: ChatRequestParams) => {
        const { prompt } = innerParams;
        return {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({
            uid: 'tdesign-chat',
            prompt,
            code: true,
          }),
        };
      },
    });

    const senderProps = reactive({
      defaultValue: '使用 TDesign 组件库实现一个登录表单的例子',
      placeholder: '有问题，尽管问～ Enter 发送，Shift+Enter 换行',
    });

    const handleMessageChange = (e: CustomEvent<ChatMessagesData[]>) => {
      mockMessage.value = e.detail;
    };

    return {
      chatRef,
      mockMessage,
      messageProps,
      chatServiceConfig,
      senderProps,
      handleMessageChange,
      copyHandler,
      mockData,
      previewHandler,
      closeHandler,
      confirmHandler,
      visible,
    };
  },
};
</script>
