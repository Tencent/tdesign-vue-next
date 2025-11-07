<template>
  <div style="height: 600px">
    <t-chatbot
      ref="chatRef"
      :default-messages="mockData"
      :message-props="messageProps"
      :sender-props="senderProps"
      :chat-service-config="chatServiceConfig"
      @message-change="handleMessageChange"
      @chat-after-send="onSend"
    >
      <!-- 渲染自定义消息内容 -->
      <template v-for="msg in mockMessage" :key="msg.id">
        <template v-for="(item, index) in msg.content" :key="index">
          <div v-if="item.type === 'imageview'" :slot="`${msg.id}-${item.type}-${index}`">
            <!-- 图片预览组件 -->
            <template v-if="item.data?.length === 0 || item.data?.every((img) => img.url === undefined)">
              <Skeleton style="width: 600px; margin: 14px 0" theme="paragraph" animation="gradient" />
            </template>
            <Space v-else break-line :size="16">
              <ImageViewer
                v-for="(img, imgIndex) in item.data.map((img) => img.url)"
                :key="imgIndex"
                :images="item.data.map((img) => img.url)"
                :default-index="imgIndex"
              >
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base">
                    <img alt="test" :src="img" class="tdesign-demo-image-viewer__ui-image--img" />
                    <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
                      <span><browse-icon size="1.4em" /> 预览</span>
                    </div>
                  </div>
                </template>
              </ImageViewer>
            </Space>
          </div>
        </template>
      </template>

      <!-- 输入框底部自定义区域 -->
      <template #sender-footer-prefix>
        <Space align="center" size="small">
          <Button shape="round" variant="outline" :icon="renderImageAddIcon" @click="onAttachClick"> 参考图 </Button>
          <Dropdown :options="RatioOptions" trigger="click" @click="switchRatio">
            <Button shape="round" variant="outline" :icon="renderTransform1Icon">
              {{ selectedRatioLabel }}
            </Button>
          </Dropdown>
          <Dropdown :options="StyleOptions" trigger="click" @click="switchStyle">
            <Button shape="round" variant="outline" :icon="renderFilter3Icon">
              {{ selectedStyleLabel }}
            </Button>
          </Dropdown>
        </Space>
      </template>
    </t-chatbot>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted, computed, watch } from 'vue';
import { BrowseIcon, Filter3Icon, ImageAddIcon, Transform1Icon } from 'tdesign-icons-vue-next';
import type {
  SSEChunkData,
  AIMessageContent,
  ChatRequestParams,
  ChatMessagesData,
  ChatServiceConfig,
  TdAttachmentItem,
  UploadFile,
  TdChatMessageConfig,
  TdChatbotApi,
} from '@tdesign-vue-next/chat';
import { ImageViewer, Skeleton, Button, Dropdown, Space } from 'tdesign-vue-next';
import { Bot } from '@tdesign-vue-next/chat';

const renderFilter3Icon = () => <Filter3Icon />;
const renderImageAddIcon = () => <ImageAddIcon />;
const renderTransform1Icon = () => <Transform1Icon />;

// 比例选项
const RatioOptions = [
  { content: '1:1 头像', value: 1 },
  { content: '2:3 自拍', value: 2 / 3 },
  { content: '4:3 插画', value: 4 / 3 },
  { content: '9:16 人像', value: 9 / 16 },
  { content: '16:9 风景', value: 16 / 9 },
];

// 风格选项
const StyleOptions = [
  { content: '人像摄影', value: 'portrait' },
  { content: '卡通动漫', value: 'cartoon' },
  { content: '风景', value: 'landscape' },
  { content: '像素风', value: 'pixel' },
];

// 默认消息数据
const mockData: ChatMessagesData[] = [
  {
    id: '123',
    role: 'assistant',
    content: [
      {
        type: 'text',
        status: 'complete',
        data: '欢迎使用 TDesign 智能生图助手，请先写下你的创意，可以试试上传参考图哦',
      },
    ],
  },
];

// 模板引用
const chatRef = ref<InstanceType<typeof Bot> & TdChatbotApi>(null);
const ratio = ref<number>(0);
const style = ref<string>('');
const reqParamsRef = ref<{ ratio: number; style: string; file?: string }>({
  ratio: 0,
  style: '',
});
const files = ref<TdAttachmentItem[]>([]);
const mockMessage = ref<ChatMessagesData[]>(mockData);

// 计算属性：选中的比例标签
const selectedRatioLabel = computed(() => {
  const option = RatioOptions.find((opt) => opt.value === ratio.value);
  return option ? option.content : '比例';
});

// 计算属性：选中的风格标签
const selectedStyleLabel = computed(() => {
  const option = StyleOptions.find((opt) => opt.value === style.value);
  return option ? option.content : '风格';
});

// 消息属性配置
const messageProps: TdChatMessageConfig = {
  user: {
    variant: 'base',
    placement: 'right',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  assistant: {
    placement: 'left',
    actions: ['good', 'bad'],
    handleActions: {
      good: async ({ message, active }) => {
        console.log('点赞', message, active);
      },
      bad: async ({ message, active }) => {
        console.log('点踩', message, active);
      },
    },
  },
};

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = {
  endpoint: `https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal`,
  stream: true,
  onComplete: (aborted: boolean, params: RequestInit) => {
    console.log('onComplete', aborted, params);
  },
  onError: (err: Error | Response) => {
    console.error('Chatservice Error:', err);
  },
  onAbort: async () => {},
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

// 点击附件按钮
const onAttachClick = () => {
  chatRef.value?.selectFile();
};

// 文件选择处理
const onFileSelect = (e: CustomEvent<TdAttachmentItem[]>) => {
  const currFiles = e.detail;

  if (currFiles.length === 0) return;

  const newFile = {
    ...currFiles[0],
    name: currFiles[0].name,
    status: 'progress' as UploadFile['status'],
    description: '上传中',
  };

  files.value = [newFile, ...files.value];

  setTimeout(() => {
    files.value = files.value.map((file) =>
      file.name === newFile.name
        ? {
            ...file,
            url: 'https://tdesign.gtimg.com/demo/images/example5.png',
            status: 'success',
            description: '上传成功',
          }
        : file,
    );
    console.log(files, 'files');
  }, 1000);
};

// 文件移除处理
const onFileRemove = (e: CustomEvent<TdAttachmentItem[]>) => {
  files.value = e.detail;
};

// 发送消息处理
const onSend = (e: CustomEvent<ChatRequestParams>): ChatRequestParams => {
  const { prompt, attachments } = e.detail;
  files.value = [];

  return {
    attachments,
    prompt: `${prompt}，要求比例：${
      ratio.value === 0 ? '默认比例' : RatioOptions.find((opt) => opt.value === ratio.value)?.content
    }, 风格：${style.value ? StyleOptions.find((opt) => opt.value === style.value)?.content : '默认风格'}`,
  };
};

// 切换比例
const switchRatio = (data: { value: number }) => {
  ratio.value = data.value;
};

// 切换风格
const switchStyle = (data: { value: string }) => {
  style.value = data.value;
};

// 消息变化处理
const handleMessageChange = (e: CustomEvent<ChatMessagesData[]>) => {
  mockMessage.value = e.detail;
};

// 初始化请求参数
onMounted(() => {
  reqParamsRef.value = {
    ratio: ratio.value,
    style: style.value,
    file: 'https://tdesign.gtimg.com/demo/images/example5.png',
  };
});

// 监听比例和风格变化
watch([ratio, style], () => {
  reqParamsRef.value = {
    ratio: ratio.value,
    style: style.value,
    file: 'https://tdesign.gtimg.com/demo/images/example5.png',
  };
});

const senderProps = computed(() => ({
  defaultValue: '请为 TDesign 设计三张品牌宣传图',
  placeholder: '描述你的生图需求~',
  uploadProps: {
    multiple: false,
    accept: 'image/*',
  },
  attachmentsProps: {
    items: files.value,
  },
  onFileSelect,
  onFileRemove,
}));
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
  border-radius: 9px;
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
  border: 4px solid var(--td-bg-color-secondarycontainer);
}
</style>
<style lang="less">
t-chatbot {
  .t-space {
    .t-button {
      height: var(--td-comp-size-m);
      border-radius: 32px;
      color: var(--td-text-color-primary);
      box-sizing: border-box;
      flex: 0 0 auto;
      .t-button__text {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          margin-left: var(--td-comp-margin-s);
        }
      }
      &.is-active {
        border: 1px solid var(--td-brand-color-focus);
        background: var(--td-brand-color-light);
        color: var(--td-text-color-brand);
      }
    }
  }
}
</style>
