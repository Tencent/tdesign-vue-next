<template>
  <div style="height: 598px; margin-top: 12px; display: flex; flex-direction: column">
    <t-chat-list :clear-history="false" style="flex: 1">
      <t-chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :placement="message.role === 'user' ? 'right' : 'left'"
        :variant="message.role === 'user' ? 'base' : 'text'"
        :avatar="message.role === 'user' ? 'https://tdesign.gtimg.com/site/avatar.jpg' : undefined"
        allow-content-segment-custom
      >
        <template v-for="(item, index) in message.content" :key="index">
          <div v-if="item.type === 'imageview'" :slot="`${item.type}-${index}`">
            <!-- {{ item.data }} -->
            <!-- 图片预览组件 -->
            <template v-if="item.data?.length === 0 || item.data?.every((img) => img.url === undefined)">
              <t-skeleton style="width: 600px; margin: 14px 0" theme="paragraph" animation="gradient" />
            </template>
            <t-space v-else break-line :size="8">
              <t-image-viewer
                v-for="img in item.data.map((img) => img.url)"
                :key="img"
                :default-index="index"
                :images="item.data.map((img) => img.url)"
                :z-index="10000"
              >
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base">
                    <img alt="test" :src="img" class="tdesign-demo-image-viewer__ui-image--img" />
                    <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open(index)">
                      <span><BrowseIcon size="1.4em" /> 预览</span>
                    </div>
                  </div>
                </template>
              </t-image-viewer>
            </t-space>
          </div>
        </template>

        <!-- 自定义操作栏 -->
        <template #actionbar>
          <t-space v-if="isAIMessageComplete(message)" size="small" :style="{ marginTop: '6px' }">
            <t-button shape="square" variant="text" size="small" title="自定义内容" @click="handleClickActionBar">
              <smile-icon />
            </t-button>
            <t-button shape="square" variant="text" size="small" title="自定义内容" @click="handleClickActionBar">
              <heart-icon />
            </t-button>
            <t-button shape="square" variant="text" size="small" title="自定义内容" @click="handleClickActionBar">
              <sound-icon />
            </t-button>
          </t-space>
        </template>
      </t-chat-message>
    </t-chat-list>

    <t-chat-sender
      ref="senderRef"
      v-model="inputValue"
      placeholder="描述你的生图需求~"
      :loading="status === 'pending' || status === 'streaming'"
      :upload-props="{ multiple: false, accept: 'image/*' }"
      :attachments-props="{ items: files }"
      @send="handleSend"
      @stop="handleStop"
      @file-select="handleFileSelect"
      @file-remove="handleFileRemove"
    >
      <!-- 自定义输入框底部控制栏 -->
      <template #footer-prefix>
        <t-space align="center" size="small">
          <t-button shape="round" variant="outline" @click="handleAttachClick">
            <template #icon>
              <image-add-icon />
            </template>
            参考图
          </t-button>
          <t-dropdown :options="RatioOptions" trigger="click" @click="switchRatio">
            <t-button shape="round" variant="outline">
              <template #icon>
                <transform1-icon size="16" />
              </template>
              {{ getRatioLabel() }}
            </t-button>
          </t-dropdown>
          <t-dropdown :options="StyleOptions" trigger="click" @click="switchStyle">
            <t-button shape="round" variant="outline">
              <template #icon>
                <filter3-icon size="16" />
              </template>
              {{ getStyleLabel() }}
            </t-button>
          </t-dropdown>
        </t-space>
      </template>
    </t-chat-sender>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  type SSEChunkData,
  type AIMessageContent,
  type ChatRequestParams,
  type ChatMessagesData,
  type ChatServiceConfig,
  type TdAttachmentItem,
  useChat,
  isAIMessage,
} from '@tdesign-vue-next/chat';
import { MessagePlugin } from 'tdesign-vue-next';
import {
  BrowseIcon,
  Filter3Icon,
  ImageAddIcon,
  Transform1Icon,
  SmileIcon,
  HeartIcon,
  SoundIcon,
} from 'tdesign-icons-vue-next';

/**
 * 自定义内容渲染示例 - AI 生图助手
 *
 * 本示例展示如何使用 ChatEngine 的插槽机制实现自定义渲染，包括：
 * 1. 自定义内容渲染：扩展自定义内容类型（如图片预览）
 * 2. 自定义操作栏：为消息添加自定义操作按钮
 * 3. 自定义输入框：添加参考图上传、比例选择、风格选择等功能
 */

const RatioOptions = [
  { content: '1:1 头像', value: 1 },
  { content: '2:3 自拍', value: 2 / 3 },
  { content: '4:3 插画', value: 4 / 3 },
  { content: '9:16 人像', value: 9 / 16 },
  { content: '16:9 风景', value: 16 / 9 },
];

const StyleOptions = [
  { content: '人像摄影', value: 'portrait' },
  { content: '卡通动漫', value: 'cartoon' },
  { content: '风景', value: 'landscape' },
  { content: '像素风', value: 'pixel' },
];

// 默认初始化消息
const mockData: ChatMessagesData[] = [
  {
    id: '123',
    role: 'assistant',
    content: [
      {
        type: 'text',
        status: 'complete',
        data: '欢迎使用 TDesign 智能生图助手，请先写下你的创意，可以试试上传参考图哦～',
      },
    ],
  },
];

const senderRef = ref<any>(null);
const ratio = ref<number>(0);
const style = ref<string>('');
const reqParamsRef = ref<{ ratio: number; style: string; file?: string }>({ ratio: 0, style: '' });
const files = ref<TdAttachmentItem[]>([]);
const inputValue = ref<string>('请为 TDesign 设计三张品牌宣传图，要求比例：默认比例，风格：默认风格');

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = {
  endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
  stream: true,
  onComplete: (aborted: boolean, params: RequestInit) => {
    console.log('onComplete', aborted, params);
  },
  onError: (err: Error | Response) => {
    console.error('Chatservice Error:', err);
  },
  onMessage: (chunk: SSEChunkData): AIMessageContent => {
    const { type, ...rest } = chunk.data;
    switch (type) {
      case 'image':
        return {
          type: 'imageview',
          status: 'complete',
          data: JSON.parse(rest.content),
        };
      case 'text':
        return {
          type: 'markdown',
          data: rest?.msg || '',
        };
    }
  },
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
        image: true,
        ...reqParamsRef.value,
      }),
    };
  },
};

// 使用 useChat Hook
const { chatEngine, messages, status } = useChat({
  defaultMessages: mockData,
  chatServiceConfig,
});

// 选中文件
const handleAttachClick = () => {
  senderRef.value?.selectFile?.();
};

// 文件上传
const handleFileSelect = (e: { detail: File[] }) => {
  const newFile = {
    ...e.detail[0],
    name: e.detail[0].name,
    status: 'progress' as TdAttachmentItem['status'],
    description: '上传中',
  };

  files.value = [newFile, ...files.value];

  setTimeout(() => {
    files.value = files.value.map((file) =>
      file.name === newFile.name
        ? {
            ...file,
            url: 'https://tdesign.gtimg.com/site/avatar.jpg',
            status: 'success',
            description: '上传成功',
          }
        : file,
    );
  }, 1000);
};

// 移除文件回调
const handleFileRemove = (e: { detail: File[] }) => {
  files.value = e.detail;
};

// 发送消息
const handleSend = async (params: string) => {
  files.value = [];
  const enhancedPrompt = `${params}，要求比例：${
    ratio.value === 0 ? '默认比例' : RatioOptions.filter((item) => item.value === ratio.value)[0].content
  }, 风格：${style.value ? StyleOptions.filter((item) => item.value === style.value)[0].content : '默认风格'}`;

  await chatEngine.value?.sendUserMessage({
    prompt: enhancedPrompt,
  });
  inputValue.value = '';
};

// 停止生成
const handleStop = () => {
  chatEngine.value?.abortChat();
};

const switchRatio = (data: any) => {
  ratio.value = data.value;
};

const switchStyle = (data: any) => {
  style.value = data.value;
};

// 获取比例标签
const getRatioLabel = () => {
  return RatioOptions.find((item) => item.value === ratio.value)?.content || '比例';
};

// 获取风格标签
const getStyleLabel = () => {
  return StyleOptions.find((item) => item.value === style.value)?.content || '风格';
};

// 判断是否是完成的AI消息
const isAIMessageComplete = (message: ChatMessagesData) => {
  return isAIMessage(message) && message.status === 'complete';
};

// 播放语音
const handleClickActionBar = () => {
  MessagePlugin.info('自定义内容');
};

// 监听比例和风格变化
watch([ratio, style], () => {
  reqParamsRef.value = {
    ratio: ratio.value,
    style: style.value,
    file: 'https://tdesign.gtimg.com/site/avatar.jpg',
  };
});
</script>

<style scoped>
/* 添加必要的样式 */
.tdesign-demo-image-viewer__ui-image {
  width: 100%;
  height: 100%;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
}

.tdesign-demo-image-viewer__ui-image--hover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--td-text-color-anti);
  line-height: 22px;
  transition: 0.2s;
}

.tdesign-demo-image-viewer__ui-image:hover .tdesign-demo-image-viewer__ui-image--hover {
  opacity: 1;
  cursor: pointer;
}

.tdesign-demo-image-viewer__ui-image--img {
  width: auto;
  height: auto;
  max-height: 100%;
  cursor: pointer;
  position: absolute;
  object-fit: cover;
}

.tdesign-demo-image-viewer__ui-image--footer {
  padding: 0 16px;
  height: 56px;
  width: 100%;
  line-height: 56px;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  color: var(--td-text-color-anti);
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  box-sizing: border-box;
}

.tdesign-demo-image-viewer__ui-image--title {
  flex: 1;
}

.tdesign-demo-popup__reference {
  margin-left: 16px;
}

.tdesign-demo-image-viewer__ui-image--icons .tdesign-demo-icon {
  cursor: pointer;
}

.tdesign-demo-image-viewer__base {
  width: 160px;
  height: 160px;
}
</style>
