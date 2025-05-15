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
      @on-action="operation"
      @clear="clearConfirm"
    >
      <template v-for="(item, index) in chatList" :key="index">
        <t-chat-item
          :role="item.role"
          :content="item.content"
          :text-loading="index === 0 && loading"
          :variant="getStyle(item.role)"
        >
          <template v-if="!isStreamLoad" #actions>
            <t-chat-action
              :is-good="isGood"
              :item-index="index"
              :is-bad="isBad"
              :content="item.content"
              @operation="handleOperation"
            />
          </template>
        </t-chat-item>
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
import { MockSSEResponse } from './mock-data/sseRequest';

const fetchCancel = ref(null);
const loading = ref(false);
const isStreamLoad = ref(false);
const isGood = ref(false);
const isBad = ref(false);

const getStyle = (role) => {
  if (role === 'assistant') {
    return 'outline';
  }
  if (role === 'user') {
    return 'base';
  }
  if (role === 'error') {
    return 'text';
  }
  return 'text';
};

const handleOperation = function (type, options) {
  const { index } = options;
  if (type === 'good') {
    isGood.value = !isGood.value;
    isBad.value = false;
  } else if (type === 'bad') {
    isBad.value = !isBad.value;
    isGood.value = false;
  } else if (type === 'replay') {
    const userQuery = chatList.value[index + 1].content;
    inputEnter(userQuery);
  }
};
// 倒序渲染
const chatList = ref([
  {
    content: `模型由 <span>hunyuan</span> 变为 <span>GPT4</span>`,
    role: 'model-change',
  },
  {
    content: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
    role: 'assistant',
  },
  {
    content: '南极的自动提款机叫什么名字？',
    role: 'user',
  },
]);
const operation = function (type, options) {
  console.log(type, options);
};
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
    content: inputValue,
    role: 'user',
  };
  chatList.value.unshift(params);
  // 空消息占位
  const params2 = {
    content: '',
    role: 'assistant',
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
  const bufferArr = [];
  let dataText = ''; // 记录数据
  const event = { data: null };

  reader.read().then(function processText({ done, value }) {
    if (done) {
      // 正常的返回
      complete?.(true);
      return;
    }
    const chunk = decoder.decode(value, { stream: true });
    const buffers = chunk.toString().split(/\r?\n/);
    bufferArr.push(...buffers);
    const i = 0;
    while (i < bufferArr.length) {
      const line = bufferArr[i];
      if (line) {
        dataText = dataText + line;
        event.data = dataText;
      }
      if (event.data) {
        const jsonData = JSON.parse(JSON.stringify(event));
        success(jsonData);
        event.data = null;
      }
      bufferArr.splice(i, 1);
    }
    reader.read().then(processText);
  });
};
const handleData = async () => {
  loading.value = true;
  isStreamLoad.value = true;
  const lastItem = chatList.value[0];
  const mockedData = `这是一段模拟的流式字符串数据。`;
  const mockResponse = new MockSSEResponse(mockedData);
  fetchCancel.value = mockResponse;
  await fetchSSE(
    () => {
      return mockResponse.getResponse();
    },
    {
      success(result) {
        loading.value = false;
        const { data } = result;
        lastItem.content += data;
      },
      complete(isOk, msg) {
        if (!isOk || !lastItem.content) {
          lastItem.role = 'error';
          lastItem.content = msg;
        }
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
