<template>
  <ActivityErrorBoundary :activity-type="activity.activityType">
    <component :is="memoizedComponent" v-if="memoizedComponent" v-bind="componentProps" />
    <DefaultActivityRenderer v-else :activity="activity" />
  </ActivityErrorBoundary>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { ActivityData } from 'tdesign-web-components';
import type { ActivityComponentProps } from './types';
import { activityRegistry } from './registry';
import ActivityErrorBoundary from './ErrorBoundary.vue';

interface Props {
  activity: ActivityData;
}

const props = defineProps<Props>();

// 注册状态，初始化时检查是否已注册
const isRegistered = ref(!!activityRegistry.getRenderFunction(props.activity.activityType));

// 缓存组件 props
// 包含所有必要的依赖：activityType, content, messageId
const componentProps = computed<ActivityComponentProps>(() => ({
  activityType: props.activity.activityType,
  content: props.activity.content,
  messageId: props.activity.messageId || '',
}));

// 监听组件注册事件，支持动态注册
const handleRegistered = (event: CustomEvent) => {
  // 精确匹配
  if (event.detail?.activityType === props.activity.activityType) {
    isRegistered.value = true;
  }
};

onMounted(() => {
  if (!isRegistered.value) {
    window.addEventListener('activity-registered', handleRegistered as EventListener);
  }
});

onUnmounted(() => {
  window.removeEventListener('activity-registered', handleRegistered as EventListener);
});

// 使用 registry 的缓存渲染函数
// 依赖 activityType 和 isRegistered 状态
const memoizedComponent = computed(() => {
  // 触发 isRegistered 的依赖收集
  if (!isRegistered.value) {
    return null;
  }
  return activityRegistry.getRenderFunction(props.activity.activityType);
});

/**
 * 默认的 Activity 渲染器
 * 当没有注册对应类型的组件时使用
 * TODO: 后续支持配置化的默认 UI
 */
const DefaultActivityRenderer = ({ activity }: { activity: ActivityData }) => {
  // 空白兜底，仅在控制台输出警告
  console.warn(`[ActivityRenderer] Unknown activity type: ${activity.activityType}`, activity.content);
  return null;
};
</script>
