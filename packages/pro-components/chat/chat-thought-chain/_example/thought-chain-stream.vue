<template>
  <t-space direction="vertical" style="width: 100%">
    <t-button :disabled="running" @click="start">{{ running ? '规划执行中...' : '模拟 Agent 执行' }}</t-button>
    <t-chat-thought-chain v-model:expanded-value="expandedValue" :items="items" />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const PLAN = [
  { key: 'intent', title: '理解任务目标', content: '解析用户输入，确认任务为多步骤数据分析。' },
  { key: 'plan', title: '制定执行计划', content: '拆分为数据拉取、清洗、统计、生成报告 4 个子任务。' },
  { key: 'tool', title: '调用工具执行', content: '调用 SQL 工具拉取近 30 天数据并完成聚合统计。' },
  { key: 'report', title: '汇总生成报告', content: '整合各步骤结果，生成最终分析报告。' },
];

const items = ref([]);
const expandedValue = ref([]);
const running = ref(false);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const start = async () => {
  running.value = true;
  items.value = [];
  expandedValue.value = [];
  for (const step of PLAN) {
    items.value = [...items.value, { ...step, status: 'processing' }];
    expandedValue.value = [...expandedValue.value, step.key];
    await sleep(1200);
    items.value = items.value.map((it) => (it.key === step.key ? { ...it, status: 'success' } : it));
  }
  running.value = false;
};
</script>
