<template>
  <t-space align="center">
    <t-button theme="primary" @click="visibleModelessDrag = true">AI助手可拖拽</t-button>
  </t-space>
  <t-dialog
    v-model:visible="visibleModelessDrag"
    :footer="false"
    header="AI助手"
    mode="modeless"
    draggable
    :on-confirm="() => (visibleModelessDrag = false)"
  >
    <template #body>
      <t-chat
        layout="single"
        style="height: 600px"
        :data="chatList"
        :clear-history="chatList.length > 0 && !isStreamLoad"
        :text-loading="loading"
        :is-stream-load="isStreamLoad"
        @clear="clearConfirm"
      >
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <template #content="{ item }">
          <template v-for="(content, contentIndex) in item.content" :key="contentIndex">
            <t-chat-content :content="content.data" :role="item.role" />
          </template>
        </template>
        <template #actionbar="{ item }">
          <t-chat-actionbar
            v-if="item.role === 'assistant'"
            :comment="commentValue"
            :content="item.content[0]?.data || ''"
            :action-bar="['good', 'bad', 'replay', 'copy']"
            @actions="handleOperation"
          />
        </template>

        <template #footer>
          <t-chat-input :stop-disabled="isStreamLoad" @send="inputEnter" @stop="onStop"> </t-chat-input>
        </template>
      </t-chat>
    </template>
  </t-dialog>
</template>
<script setup>
import { ref } from 'vue';
const visibleModelessDrag = ref(false);
import { MockSSEResponse } from './mock-data/sseRequest';
const fetchCancel = ref(null);
const loading = ref(false);
const isStreamLoad = ref(false);
const commentValue = ref('');
// 倒序渲染
const chatList = ref([
  {
    role: 'system',
    content: [
      {
        type: 'text',
        data: '模型由hunyuan变为GPT4',
      },
    ],
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    name: 'TDesignAI',
    datetime: '今天16:38',
    role: 'assistant',
    content: [
      {
        type: 'text',
        data: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
      },
    ],
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: '今天16:38',
    role: 'user',
    content: [
      {
        type: 'text',
        data: '南极的自动提款机叫什么名字？',
      },
    ],
  },
]);

const handleOperation = (type) => {
  if (type === 'good') {
    commentValue.value = commentValue.value === 'good' ? '' : 'good';
  } else if (type === 'bad') {
    commentValue.value = commentValue.value === 'bad' ? '' : 'bad';
  }
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
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: new Date().toDateString(),
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
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    name: 'TDesignAI',
    datetime: new Date().toDateString(),
    role: 'assistant',
    content: [
      {
        type: 'text',
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
        lastItem.content[0].data += data;
      },
      complete(isOk, msg) {
        if (!isOk || !lastItem.content[0].data) {
          lastItem.role = 'error';
          lastItem.content[0].data = msg;
        }

        // 控制终止按钮
        isStreamLoad.value = false;
        loading.value = false;
      },
    },
  );
};
</script>
<style scoped lang="less">
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
</style>
