<template>
  <div
    v-if="shouldShow"
    :style="{
      position: 'fixed',
      right: '200px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '200px',
      background: '#fff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e7e7e7',
      zIndex: 1000,
    }"
  >
    <div
      :style="{
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid #e7e7e7',
      }"
    >
      <div style="font-size: 14px; font-weight: 600; color: #000; margin-bottom: 4px">规划进度</div>
      <t-tag theme="primary" variant="light" size="small"> {{ completedCount }}/{{ totalCount }} </t-tag>
    </div>

    <!-- 步骤列表 -->
    <t-space direction="vertical" size="small" style="width: 100%">
      <div v-for="(item, index) in items" :key="index" style="display: flex; align-items: center; gap: 8px">
        <check-circle-filled-icon v-if="item.status === 'completed'" style="color: #00a870; font-size: 14px" />
        <loading-icon v-else-if="item.status === 'running'" style="color: #0052d9; font-size: 14px" />
        <error-circle-filled-icon v-else-if="item.status === 'failed'" style="color: #e34d59; font-size: 14px" />
        <time-filled-icon v-else style="color: #bbbbbb; font-size: 14px" />
        <span
          :style="{
            flex: 1,
            fontSize: '12px',
            color: item.status === 'completed' ? '#00a870' : item.status === 'running' ? '#0052d9' : '#666',
            fontWeight: item.status === 'running' ? 600 : 400,
          }"
        >
          {{ item.label }}
        </span>
      </div>
    </t-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAgentState } from '@tdesign-vue-next/chat';
import { CheckCircleFilledIcon, TimeFilledIcon, ErrorCircleFilledIcon, LoadingIcon } from 'tdesign-icons-vue-next';

/**
 * 右侧进度面板组件
 * 演示如何在对话组件外部使用 useAgentState 获取状态
 *
 * 使用场景：展示规划行程的详细子步骤（从后端 STATE_DELTA 事件推送）
 */

// 使用 useAgentState 订阅状态更新
const { stateMap, currentStateKey } = useAgentState();

// 获取规划状态
const planningState = computed(() => {
  if (!currentStateKey.value || !stateMap.value[currentStateKey.value]) {
    return null;
  }
  return stateMap.value[currentStateKey.value];
});

const items = computed(() => planningState.value?.items || []);
const completedCount = computed(() => items.value.filter((item: any) => item.status === 'completed').length);
const totalCount = computed(() => items.value.length);

// 如果没有规划状态，或者所有步骤都完成了，不显示面板
const shouldShow = computed(() => {
  if (!planningState.value || !planningState.value.items || planningState.value.items.length === 0) {
    return false;
  }
  // 如果所有步骤都完成了，隐藏面板
  if (completedCount.value === totalCount.value && totalCount.value > 0) {
    return false;
  }
  return true;
});
</script>
