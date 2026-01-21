<template>
  <div style="margin-top: 12px">
    <template v-if="toolStatus === 'error'">
      <div style="color: #ff4d4f">解析参数失败: {{ toolError?.message }}</div>
    </template>

    <template v-else-if="!genState">
      <div>等待任务开始</div>
    </template>

    <template v-else>
      <!-- 准备阶段 -->
      <template v-if="genState.status === 'preparing'">
        <t-space direction="vertical" style="width: 100%">
          <div style="display: flex; align-items: center; gap: 8px">
            <loading-icon style="color: var(--td-brand-color)" />
            <span>准备生成图片</span>
          </div>
          <t-progress :percentage="genState.progress" />
          <div style="color: #666; font-size: 12px">{{ genState.message }}</div>
        </t-space>
      </template>

      <!-- 生成阶段 -->
      <template v-else-if="genState.status === 'generating'">
        <t-space direction="vertical" style="width: 100%">
          <div style="display: flex; align-items: center; gap: 8px">
            <loading-icon style="color: var(--td-brand-color)" />
            <span>正在生成图片</span>
          </div>
          <t-progress :percentage="genState.progress" />
          <div style="color: #666; font-size: 12px">{{ genState.message }}</div>
        </t-space>
      </template>

      <!-- 完成阶段 -->
      <template v-else-if="genState.status === 'completed'">
        <t-space direction="vertical" style="width: 100%">
          <div style="display: flex; align-items: center; gap: 8px; color: #52c41a">
            <check-circle-filled-icon style="color: var(--td-success-color)" size="20px" />
            <span style="color: black; font-size: 14px">已完成</span>
          </div>
          <t-image
            v-if="genState.imageUrl"
            :src="genState.imageUrl"
            fit="cover"
            style="width: 100%; max-width: 320px; border-radius: 8px"
          />
        </t-space>
      </template>

      <!-- 失败阶段 -->
      <template v-else-if="genState.status === 'failed'">
        <t-space direction="vertical" style="width: 100%">
          <div style="display: flex; align-items: center; gap: 8px; color: #ff4d4f">
            <close-circle-filled-icon />
            <span>图片生成失败</span>
          </div>
          <div style="color: #ff4d4f; font-size: 12px">{{ genState.error || '未知错误' }}</div>
        </t-space>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CheckCircleFilledIcon, CloseCircleFilledIcon, LoadingIcon } from 'tdesign-icons-vue-next';

/**
 * 图片生成进度状态接口
 */
interface ImageGenState {
  status: 'preparing' | 'generating' | 'completed' | 'failed';
  progress: number;
  message: string;
  imageUrl?: string;
  error?: string;
}

const props = defineProps<{
  agentState?: any;
  status?: string;
  error?: Error;
}>();

const toolStatus = computed(() => props.status);
const toolError = computed(() => props.error);

// agentState 已经是 taskId 对应的状态对象，直接使用
const genState = computed<ImageGenState | null>(() => {
  if (!props.agentState) {
    return null;
  }
  return props.agentState as ImageGenState;
});
</script>
