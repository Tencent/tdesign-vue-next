<template>
  <t-card bordered style="margin-top: 8px">
    <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px">
      正在为您规划 {{ args?.destination }} {{ args?.days }}日游
    </div>

    <!-- 进度条 -->
    <div v-if="planningState?.progress !== undefined">
      <t-progress :percentage="planningState.progress" />
      <div style="font-size: 12px; color: #888; margin-top: 4px">
        {{ planningState.message || '规划中...' }}
      </div>
    </div>
  </t-card>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

/**
 * 规划步骤组件
 * 展示 STATE 订阅 + agentState 注入
 */

interface PlanningArgs {
  destination: string;
  days: number;
  taskId: string;
}

const props = defineProps<{
  status?: string;
  args?: PlanningArgs;
  respond?: (response: any) => void;
  agentState?: any;
}>();

// 因为配置了 subscribeKey，agentState 已经是 taskId 对应的状态对象
const planningState = computed(() => props.agentState || {});

const isComplete = computed(() => props.status === 'complete');

// 当状态变为完成时，调用 respond
watch(isComplete, (newVal) => {
  if (newVal && props.respond) {
    props.respond({ success: true });
  }
});
</script>
