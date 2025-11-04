<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #ChatThinking="{ configProps }">
      <t-chat-thinking
        :content="{
          title: '思考中...',
          text: '嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。那问题来了，这个定律是否适用于所有参考系呢？记得以前学过的参考系分惯性系和非惯性系。惯性系里，牛顿定律成立；非惯性系里，可能需要引入惯性力之类的修正。所以牛顿第一定律应该只在惯性参考系中成立，而在非惯性系中不适用，比如加速的电梯或者旋转的参考系，这时候物体会有看似无外力下的加速度，所以必须引入假想的力来解释。',
        }"
        v-bind="configProps"
      />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'ChatThinking', value: 'ChatThinking' }];

const usageCodeMap = {
  ChatThinking: `<t-chat-thinking
      :content="{
        title: '思考中',
        text: '嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。那问题来了，这个定律是否适用于所有参考系呢？记得以前学过的参考系分惯性系和非惯性系。惯性系里，牛顿定律成立；非惯性系里，可能需要引入惯性力之类的修正。所以牛顿第一定律应该只在惯性参考系中成立，而在非惯性系中不适用，比如加速的电梯或者旋转的参考系，这时候物体会有看似无外力下的加速度，所以必须引入假想的力来解释。',
      }"
      v-bind="configProps"
    />`,
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
