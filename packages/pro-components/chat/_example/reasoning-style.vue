<script setup lang="jsx">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { CheckCircleIcon } from 'tdesign-icons-vue-next';
const fullText =
  '嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。那问题来了，这个定律是否适用于所有参考系呢？记得以前学过的参考系分惯性系和非惯性系。惯性系里，牛顿定律成立；非惯性系里，可能需要引入惯性力之类的修正。所以牛顿第一定律应该只在惯性参考系中成立，而在非惯性系中不适用，比如加速的电梯或者旋转的参考系，这时候物体会有看似无外力下的加速度，所以必须引入假想的力来解释。';
const displayText = ref('');
const status = ref('streaming');
const title = ref('正在思考中...');
const layout = ref('block');
const animation = ref('moving');
const timerRef = ref(null);
const currentIndex = ref(0);
const startTimeRef = ref(Date.now());

// 打字效果函数
const typeEffect = () => {
  if (currentIndex.value < fullText.length) {
    const char = fullText[currentIndex.value];
    currentIndex.value += 1;
    displayText.value += char;
    timerRef.value = setTimeout(typeEffect, 50);
    status.value = 'streaming';
  } else {
    // 计算耗时并更新状态
    const costTime = parseInt(((Date.now() - startTimeRef.value) / 1000).toString(), 10);
    title.value = `已完成思考（耗时${costTime}秒）`;
    status.value = 'complete';
  }
};

// 重置打字效果相关状态
const resetTypingEffect = () => {
  displayText.value = '';
  status.value = 'pending';
  title.value = '正在思考中...';
  currentIndex.value = 0;
  if (timerRef.value) clearTimeout(timerRef.value);
};

// 监听layout和animation变化
watch([layout, animation], () => {
  resetTypingEffect();
  startTimeRef.value = Date.now();
  timerRef.value = setTimeout(typeEffect, 500);
});

onMounted(() => {
  resetTypingEffect();
  startTimeRef.value = Date.now();
  timerRef.value = setTimeout(typeEffect, 500);
});

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timerRef.value) clearTimeout(timerRef.value);
});

/**
 * 渲染推理模块的头部自定义内容
 * @param {boolean} flag - 思维链内容是否加载中
 * @param {string} endText - 思维链加载完成时显示的文本
 * @returns {JSX.Element} 返回对应的头部组件
 */
const renderHeader = (status) => {
  if (status === 'streaming' || status === 'pending') {
    return <t-chat-loading text="正在思考中..." />;
  }
  return (
    <div style="display:flex;align-items:center">
      <CheckCircleIcon
        style={{
          color: 'var(--td-success-color-5)',
          fontSize: '20px',
          marginRight: '8px',
        }}
      />
      <span>{title.value}</span>
    </div>
  );
};

/**
 * 渲染推理内容组件
 * @param {string} reasoningContent - 需要渲染的推理内容
 * @returns {JSX.Element} 返回 markdown渲染内容，用于展示推理内容, 不用markdown渲染组件原文返回
 */
const renderReasoningContent = (reasoningContent) => <t-chat-content content={reasoningContent} role="assistant" />;

const handelLayoutChange = (value) => {
  resetTypingEffect();
  layout.value = value;
};

const handleChange = (value) => {
  console.log('handleChange', value);
};
</script>

<template>
  <t-space direction="vertical">
    <t-space>
      <t-space direction="vertical">
        <h5>layout：</h5>
        <t-radio-group :default-value="layout" @change="handelLayoutChange">
          <t-radio value="border">border</t-radio>
          <t-radio value="block">block</t-radio>
        </t-radio-group>
      </t-space>
    </t-space>
    <t-chat-reasoning
      expand-icon-placement="right"
      :layout="layout"
      :collapse-panel-props="{
        header: renderHeader(status),
        content: renderReasoningContent(displayText),
      }"
      @expand-change="handleChange"
    >
    </t-chat-reasoning>
  </t-space>
</template>
