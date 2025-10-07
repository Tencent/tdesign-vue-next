<template>
  <t-space align="center">
    <t-button theme="primary" @click="visible = true">AI助手悬窗展示</t-button>
  </t-space>
  <t-drawer v-model:visible="visible" :footer="false" size="480px" :close-btn="true" class="drawer-box">
    <template #header>
      <t-avatar size="32px" shape="circle" image="https://tdesign.gtimg.com/site/chat-avatar.png"></t-avatar>
      <span class="title">Hi, &nbsp;我是AI</span>
    </template>
    <t-chat
      layout="both"
      :clear-history="chatList.length > 0 && !isStreamLoad"
      :text-loading="loading"
      :is-stream-load="isStreamLoad"
      @clear="clearConfirm"
    >
      <template v-for="(item, index) in chatList" :key="index">
        <t-chat-message
          :avatar="item.avatar"
          :name="item.name"
          :role="item.role"
          :content="item.content"
          :datetime="item.datetime"
          :variant="getStyle(item.role)"
          :placement="item.role === 'user' ? 'right' : item.role === 'assistant' ? 'left' : 'left'"
        >
          <!-- 自定义操作按钮插槽 -->
          <template #actionbar>
            <t-chat-actionbar
              v-if="item.role === 'assistant'"
              :content="getActionContent(item.content)"
              :action-bar="['good', 'bad', 'replay', 'copy']"
              @actions="handleOperation"
            />
          </template>
        </t-chat-message>
      </template>
      <template #footer>
        <t-chat-input :stop-disabled="isStreamLoad" @send="inputEnter" @stop="onStop"> </t-chat-input>
      </template>
    </t-chat>
  </t-drawer>
</template>
<script setup>
import { ref } from 'vue';
const visible = ref(false);
import { MockSSEResponse } from './mock-data/sseRequest-reasoning';

const fetchCancel = ref(null);
const loading = ref(false);
const isStreamLoad = ref(false);

const handleOperation = function (type, options) {
  const { index } = options;
  if (type === 'good') {
    commentValue.value = commentValue.value === 'good' ? '' : 'good';
  } else if (type === 'bad') {
    commentValue.value = commentValue.value === 'bad' ? '' : 'bad';
  } else if (type === 'replay') {
    const userQuery = chatList.value[index + 1].content[0].data;

    inputEnter(userQuery);
  }
};
const getStyle = (role) => {
  if (role === 'assistant') {
    return 'outline';
  }
  if (role === 'user') {
    return 'base';
  }
  return 'text';
};
// 获取操作按钮需要的内容（排除thinking类型）
const getActionContent = function (contentArray) {
  const textContent = contentArray.find((item) => item.type === 'text' || item.type === 'markdown');
  return textContent ? textContent.data : '';
};
// 倒序渲染
const chatList = ref([
  {
    role: 'system',
    content: [
      {
        type: 'text',
        data: '模型由 hunyuan 变为 GPT4',
      },
    ],
  },
  {
    role: 'assistant',
    content: [
      {
        type: 'text',
        data: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
      },
    ],
  },
  {
    role: 'user',
    content: [
      {
        type: 'text',
        data: '南极的自动提款机叫什么名字？',
      },
    ],
  },
]);

const clearConfirm = function () {
  chatList.value = [];
};
const onStop = function () {
  if (fetchCancel.value) {
    fetchCancel.value.controller.close();
    loading.value = false;
  }
};
const inputEnter = function (inputValue) {
  if (isStreamLoad.value) {
    return;
  }
  if (!inputValue) return;
  const params = {
    role: 'user',
    content: [
      {
        type: 'text',
        data: inputValue,
      },
    ],
  };

  chatList.value.unshift(params);
  // 空消息占位
  const params2 = {
    role: 'assistant',
    content: [
      {
        type: 'thinking',
        status: 'complete',
        data: {
          title: '思考中...',
          text: '',
        },
      },
      {
        type: 'markdown',
        data: '',
      },
    ],
  };

  chatList.value.unshift(params2);
  handleData(inputValue);
};
const fetchSSE = async (fetchFn, options) => {
  const response = await fetchFn();
  const { success, fail, complete } = options;
  // 如果不 ok 说明有请求错误
  if (!response.ok) {
    complete?.(false, response.statusText);
    fail?.();
    return;
  }
  const reader = response?.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) return;

  reader.read().then(function processText({ done, value }) {
    if (done) {
      // 正常的返回
      complete?.(true);
      return;
    }
    const chunk = decoder.decode(value, { stream: true });
    const buffers = chunk.toString().split(/\r?\n/);
    const jsonData = JSON.parse(buffers);
    success(jsonData);
    reader.read().then(processText);
  });
};
const handleData = async () => {
  loading.value = true;
  isStreamLoad.value = true;
  const lastItem = chatList.value[0];
  const mockedData = {
    reasoning: `嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。

那问题来了，这个定律是否适用于所有参考系呢？记得以前学过的参考系分惯性系和非惯性系。惯性系里，牛顿定律成立；非惯性系里，可能需要引入惯性力之类的修正。所以牛顿第一定律应该只在惯性参考系中成立，而在非惯性系中不适用，比如加速的电梯或者旋转的参考系，这时候物体会有看似无外力下的加速度，所以必须引入假想的力来解释。`,
    content: `牛顿第一定律（惯性定律）**并不适用于所有参考系**，它只在**惯性参考系**中成立。以下是关键点：

---

### **1. 牛顿第一定律的核心**
- **内容**：物体在不受外力（或合力为零）时，将保持静止或匀速直线运动状态。
- **本质**：定义了惯性系的存在——即存在一类参考系，在其中惯性定律成立。`,
  };
  const mockResponse = new MockSSEResponse(mockedData);
  fetchCancel.value = mockResponse;
  await fetchSSE(
    () => {
      return mockResponse.getResponse();
    },
    {
      success(result) {
        console.log('success', result);
        loading.value = false;
        // 设置思考过程的status
        if (result.delta.reasoning_content) {
          lastItem.content[0].data.text += result.delta.reasoning_content;
        }
        if (result.delta.content) {
          lastItem.content[1].data += result.delta.content;
        }
      },
      complete(isOk, msg) {
        if (!isOk) {
          lastItem.role = 'error';
          lastItem.content[0].data.text = msg;
          lastItem.content[1].data = msg;
        }

        // 显示用时xx秒，业务侧需要自行处理
        lastItem.duration = 20;
        // 控制终止按钮
        isStreamLoad.value = false;
        loading.value = false;
      },
    },
  );
};
</script>
<style lang="less">
/* 应用滚动条样式 */
::-webkit-scrollbar-thumb {
  background-color: var(--td-scrollbar-color);
}
::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: var(--td-scrollbar-hover-color);
}
::-webkit-scrollbar-track {
  background-color: var(--td-scroll-track-color);
}
.title {
  margin-left: 16px;
  font-size: 20px;
  color: var(--td-text-color-primary);
  font-weight: 600;
  line-height: 28px;
}
.drawer-box {
  .t-drawer__header {
    padding: 32px;
  }
  .t-drawer__body {
    padding: 30px 32px;
  }
  .t-drawer__close-btn {
    right: 32px;
    top: 32px;
    background-color: var(--td-bg-color-secondarycontainer);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    .t-icon {
      font-size: 20px;
    }
  }
}
</style>
../_example-mock/sseRequest
