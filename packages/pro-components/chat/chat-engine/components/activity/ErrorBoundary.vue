<template>
  <slot v-if="!hasError" />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

/**
 * Activity 错误边界组件
 * 捕获子组件渲染错误，防止整个对话列表崩溃
 *
 * 对应 React 的 Error Boundary:
 * - getDerivedStateFromError -> errorCaptured 钩子
 * - componentDidCatch -> errorCaptured 钩子 + 错误日志
 * - render with error state -> 条件渲染
 *
 * TODO: 后续支持配置化的错误 UI
 */

interface Props {
  activityType: string;
}

const props = defineProps<Props>();

const hasError = ref(false);
const error = ref<Error | null>(null);

// Vue3 的 onErrorCaptured 对应 React 的 componentDidCatch
// 返回 false 阻止错误继续向上传播
onErrorCaptured((err: Error, instance: any, info: string) => {
  console.error(`[ActivityRenderer] Error in activity "${props.activityType}":`, err, {
    componentInfo: info,
    instance,
  });

  hasError.value = true;
  error.value = err;

  // 返回 false 阻止错误继续向上传播
  return false;
});
</script>
