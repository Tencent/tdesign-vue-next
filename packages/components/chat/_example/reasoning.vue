<template>
  <div class="chat-box">
    <t-chat
      ref="chatRef"
      layout="single"
      style="height: 800px"
      :clear-history="chatList.length > 0 && !isStreamLoad"
      @scroll="handleChatScroll"
      @clear="clearConfirm"
    >
      <template v-for="(item, index) in chatList" :key="index">
        <t-chat-item
          :avatar="item.avatar"
          :name="item.name"
          :role="item.role"
          :datetime="item.datetime"
          :text-loading="index === 0 && loading"
          :content="item.content"
          :reasoning="{
            collapsed: index === 0 && !isStreamLoad,
            expandIconPlacement: 'right',
            onExpandChange: handleChange(value, { index }),
            collapsePanelProps: {
              header: renderHeader(index === 0 && isStreamLoad, item),
              content: renderReasoningContent(item.reasoning),
            },
          }"
        >
        </t-chat-item>
      </template>
      <template #footer>
        <t-chat-sender
          v-model="inputValue"
          :stop-disabled="isStreamLoad"
          :textarea-props="{
            placeholder: '请输入消息...',
          }"
          @stop="onStop"
          @send="inputEnter"
        >
          <template #prefix>
            <div class="model-select">
              <t-tooltip v-model:visible="allowToolTip" content="切换模型" trigger="hover">
                <t-select
                  v-model="selectValue"
                  :options="selectOptions"
                  value-type="object"
                  @focus="allowToolTip = false"
                ></t-select>
              </t-tooltip>
              <t-button class="check-box" :class="{ 'is-active': isChecked }" variant="text" @click="checkClick">
                <SystemSumIcon />
                <span>深度思考</span>
              </t-button>
            </div>
          </template>
        </t-chat-sender>
      </template>
    </t-chat>
    <t-button v-show="isShowToBottom" variant="text" class="bottomBtn" @click="backBottom">
      <div class="to-bottom">
        <ArrowDownIcon />
      </div>
    </t-button>
  </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';
import { MockSSEResponse } from './mock-data/sseRequest-reasoning';
import { ArrowDownIcon, SystemSumIcon } from 'tdesign-icons-vue-next';
import { CheckCircleIcon } from 'tdesign-icons-vue-next';

const fetchCancel = ref(null);
const loading = ref(false);
// 流式数据加载中
const isStreamLoad = ref(false);
const inputValue = ref('');
const chatRef = ref(null);
const isShowToBottom = ref(false);
// 滚动到底部
const backBottom = () => {
  chatRef.value.scrollToBottom({
    behavior: 'smooth',
  });
};
const selectOptions = [
  {
    label: '默认模型',
    value: 'default',
  },
  {
    label: 'deepseek-r1',
    value: 'deepseek-r1',
  },
  {
    label: '混元',
    value: 'hunyuan',
  },
];
const selectValue = ref({
  label: '默认模型',
  value: 'default',
});
const allowToolTip = ref(false);
const isChecked = ref(false);
const checkClick = () => {
  isChecked.value = !isChecked.value;
};
const handleChange = (value, { index }) => {
  console.log('handleChange', value, index);
};
/**
 * 渲染推理模块的头部自定义内容
 * @param {boolean} flag - 思维链内容是否加载中
 * @param {string} endText - 思维链加载完成时显示的文本
 * @returns {JSX.Element} 返回对应的头部组件
 */
const renderHeader = (flag, item) => {
  if (flag) {
    return <t-chat-loading text="思考中..." />;
  }
  const endText = item.duration ? `已深度思考(用时${item.duration}秒)` : '已深度思考';
  return (
    <div style="display:flex;align-items:center">
      <CheckCircleIcon
        style={{
          color: 'var(--td-success-color-5)',
          fontSize: '20px',
          marginRight: '8px',
        }}
      />
      <span>{endText}</span>
    </div>
  );
};
const renderReasoningContent = (reasoningContent) => <t-chat-content content={reasoningContent} role="assistant" />;
// 倒序渲染
const chatList = ref([
  {
    content: `模型由<span>hunyuan</span>变为<span>GPT4</span>`,
    role: 'model-change',
    reasoning: '',
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    name: 'TDesignAI',
    datetime: '今天16:38',
    reasoning: `嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。

`,
    content: `牛顿第一定律（惯性定律）**并不适用于所有参考系**，它只在**惯性参考系**中成立。以下是关键点：

---

### **1. 牛顿第一定律的核心**
- **内容**：物体在不受外力（或合力为零）时，将保持静止或匀速直线运动状态。
- **本质**：定义了惯性系的存在——即存在一类参考系，在其中惯性定律成立。

---
`,
    role: 'assistant',
    duration: 10,
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: '今天16:38',
    content: '牛顿第一定律是否适用于所有参考系？',
    role: 'user',
    reasoning: '',
  },
]);
const clearConfirm = function () {
  chatList.value = [];
};
const onStop = function () {
  if (fetchCancel.value) {
    fetchCancel.value.controller.close();
    loading.value = false;
    isStreamLoad.value = false;
  }
};
// 是否显示回到底部按钮
const handleChatScroll = function ({ e }) {
  const scrollTop = e.target.scrollTop;
  isShowToBottom.value = scrollTop < 0;
};

const inputEnter = function () {
  console.log('inputEnter', inputValue.value);
  if (isStreamLoad.value) {
    return;
  }
  if (!inputValue.value) return;
  const params = {
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: new Date().toDateString(),
    content: inputValue.value,
    role: 'user',
  };
  chatList.value.unshift(params);
  // 空消息占位
  const params2 = {
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    name: 'TDesignAI',
    datetime: new Date().toDateString(),
    content: '',
    reasoning: '',
    role: 'assistant',
  };
  chatList.value.unshift(params2);
  handleData(inputValue.value);
  inputValue.value = '';
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

`,
    content: `牛顿第一定律（惯性定律）**并不适用于所有参考系**，它只在**惯性参考系**中成立。以下是关键点：
`,
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
        lastItem.reasoning += result.delta.reasoning_content;
        lastItem.content += result.delta.content;
      },
      complete(isOk, msg) {
        if (!isOk) {
          lastItem.role = 'error';
          lastItem.content = msg;
          lastItem.reasoning = msg;
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
.chat-box {
  position: relative;
  .bottomBtn {
    position: absolute;
    left: 50%;
    margin-left: -20px;
    bottom: 210px;
    padding: 0;
    border: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.08), 0px 16px 24px 2px rgba(0, 0, 0, 0.04),
      0px 6px 30px 5px rgba(0, 0, 0, 0.05);
  }
  .to-bottom {
    width: 40px;
    height: 40px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    background: var(--td-bg-color-container);
    border-radius: 50%;
    font-size: 24px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .t-icon {
      font-size: 24px;
    }
  }
}

.model-select {
  display: flex;
  align-items: center;
  .t-select {
    width: 112px;
    height: var(--td-comp-size-m);
    margin-right: var(--td-comp-margin-s);
    .t-input {
      border-radius: 32px;
      padding: 0 15px;
    }
    .t-input.t-is-focused {
      box-shadow: none;
    }
  }
  .check-box {
    width: 112px;
    height: var(--td-comp-size-m);
    border-radius: 32px;
    border: 0;
    background: var(--td-bg-color-component);
    color: var(--td-text-color-primary);
    box-sizing: border-box;
    flex: 0 0 auto;
    .t-button__text {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-left: var(--td-comp-margin-xs);
      }
    }
  }
  .check-box.is-active {
    border: 1px solid var(--td-brand-color-focus);
    background: var(--td-brand-color-light);
    color: var(--td-text-color-brand);
  }
}
</style>
