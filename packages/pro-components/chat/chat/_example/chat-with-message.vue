<template>
  <div class="chat-box">
    <t-chat
      ref="chatRef"
      :clear-history="chatList.length > 0 && !isStreamLoad"
      :text-loading="loading"
      :is-stream-load="isStreamLoad"
      style="height: 600px"
      animation="gradient"
      @scroll="handleChatScroll"
      @clear="clearConfirm"
    >
      <template v-for="(item, index) in chatList" :key="index">
        <t-chat-message
          :avatar="item.avatar"
          :name="item.name"
          :role="item.role"
          :content="item.content"
          :datetime="item.datetime"
          :handle-actions="onActions"
          :chat-content-props="{
            thinking: { maxHeight: 100, collapsed: false },
            search: { expandable: true },
          }"
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
import { ArrowDownIcon } from 'tdesign-icons-vue-next';

const fetchCancel = ref(null);
const loading = ref(false);
// 流式数据加载中
const isStreamLoad = ref(false);

const chatRef = ref(null);
const isShowToBottom = ref(false);
// 滚动到底部
const backBottom = () => {
  chatRef.value.scrollToBottom({
    behavior: 'smooth',
  });
};
// 是否显示回到底部按钮
const handleChatScroll = function ({ e }) {
  const scrollTop = e.target.scrollTop;
  isShowToBottom.value = scrollTop < 0;
};
// 清空消息
const clearConfirm = function () {
  chatList.value = [];
};
const handleOperation = function (type, options) {
  console.log('handleOperation', type, options);
};

// 处理建议和搜索项的操作
const onActions = {
  suggestion: (content) => {
    console.log('suggestionItem', content);
  },
  searchItem: (content, event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('searchItem', content);
  },
};

// 获取操作按钮需要的内容（排除thinking类型）
const getActionContent = function (contentArray) {
  const textContent = contentArray.find((item) => item.type === 'text' || item.type === 'markdown');
  return textContent ? textContent.data : '';
};
// 倒序渲染
const chatList = ref([
  {
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    name: 'TDesignAI',
    datetime: '今天16:38',
    id: '33333',
    role: 'assistant',
    status: 'complete',
    content: [
      {
        type: 'thinking',
        status: 'complete',
        data: {
          title: '已完成思考（耗时3秒）',
          text: '好的，我现在需要回答用户关于对比近3年当代偶像爱情剧并总结创作经验的问题\n查询网络信息中...\n根据网络搜索结果，成功案例包括《春色寄情人》《要久久爱》《你也有今天》等，但缺乏具体播放数据，需要结合行业报告总结共同特征。2022-2024年偶像爱情剧的创作经验主要集中在题材创新、现实元素融入、快节奏叙事等方面。结合行业报告和成功案例，总结出以下创作经验。',
        },
      },
      {
        type: 'search',
        data: {
          title: '搜索到2篇相关内容',
          references: [
            {
              title: '《传媒内参2024剧集市场分析报告》',
              url: '',
            },
            {
              title: '2024年国产剧市场分析:优质内容的消失与未来展望_观众_剧集_平台',
              url: '',
            },
          ],
        },
      },
      {
        type: 'markdown',
        data: '**数据支撑：** 据《传媒内参2024报告》，2024年偶像爱情剧完播率`提升12%`，其中"职业创新"类`占比达65%`，豆瓣评分7+作品数量同比`增加40%`。',
      },
      {
        type: 'suggestion',
        data: [
          {
            title: '近3年偶像爱情剧的市场反馈如何',
            prompt: '近3年偶像爱情剧的市场反馈如何',
          },
          {
            title: '偶像爱情剧的观众群体分析',
            prompt: '偶像爱情剧的观众群体分析',
          },
          {
            title: '偶像爱情剧的创作趋势是什么',
            prompt: '偶像爱情剧的创作趋势是什么',
          },
        ],
      },
    ],
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: '今天16:38',
    id: '22222',
    role: 'user',
    status: 'complete',
    content: [
      {
        type: 'text',
        data: '这个图里的帅哥是谁？',
      },
      {
        type: 'attachment',
        data: [
          {
            fileType: 'image',
            name: 'avatar.jpg',
            size: 234234,
            url: 'https://tdesign.gtimg.com/site/avatar.jpg',
          },
        ],
      },
    ],
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: '今天16:38',
    id: '11111',
    role: 'user',
    status: 'complete',
    content: [
      {
        type: 'text',
        data: '分析以下内容，总结一篇广告策划方案',
      },
      {
        type: 'attachment',
        data: [
          {
            fileType: 'doc',
            name: 'demo.docx',
            url: 'https://tdesign.gtimg.com/site/demo.docx',
            size: 12312,
          },
          {
            fileType: 'pdf',
            name: 'demo2.pdf',
            url: 'https://tdesign.gtimg.com/site/demo.pdf',
            size: 34333,
          },
        ],
      },
    ],
  },
]);

const onStop = function () {
  if (fetchCancel.value) {
    fetchCancel.value.controller.close();
    loading.value = false;
    isStreamLoad.value = false;
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
.text {
  color: red;
}
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
    height: 32px;
    margin-right: 8px;
    .t-input {
      border-radius: 32px;
      padding: 0 15px;
    }
  }
  .check-box {
    width: 112px;
    height: 32px;
    border-radius: 32px;
    border: 0;
    background: #e7e7e7;
    color: rgba(0, 0, 0, 0.9);
    box-sizing: border-box;
    flex: 0 0 auto;
    .t-button__text {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-left: 4px;
      }
    }
  }
  .check-box.is-active {
    border: 1px solid #d9e1ff;
    background: #f2f3ff;
    color: var(--td-brand-color);
  }
}
</style>
