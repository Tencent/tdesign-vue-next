<template>
  <div v-if="MemoizedComponent">
    <component :is="MemoizedComponent" v-bind="componentProps" />
  </div>
</template>

<script setup lang="tsx">
import { ref, computed, onMounted, watch, type Ref } from 'vue';
import type { ToolCall } from 'tdesign-web-components/lib/chat-engine';
import { isNonInteractiveConfig, type ToolcallComponentProps } from './types';
import { agentToolcallRegistry } from './registry';
import { useAgentStateDataByKey } from '../../hooks/useAgentState';

interface ToolCallRendererProps {
  toolCall: ToolCall;
  onRespond?: (toolCall: ToolCall, response: any) => void;
}

const props = defineProps<ToolCallRendererProps>();

const actionState: Ref<{
  status: ToolcallComponentProps['status'];
  result?: any;
  error?: Error;
}> = ref({
  status: 'idle',
});

// 缓存配置获取
const config = computed(() => {
  return agentToolcallRegistry.get(props.toolCall.toolCallName);
});

// 添加注册状态监听
const isRegistered = ref(() => !!agentToolcallRegistry.getRenderFunction(props.toolCall.toolCallName));

// 缓存参数解析
const args = computed(() => {
  try {
    return props.toolCall.args ? JSON.parse(props.toolCall.args) : {};
  } catch (error) {
    console.error('解析工具调用参数失败:', error);
    return {};
  }
});

const handleRespond = (response: any) => {
  if (props.onRespond) {
    props.onRespond(props.toolCall, response);
    // 使用对象展开确保触发响应式更新
    actionState.value = {
      ...actionState.value,
      status: 'complete',
      result: response,
    };
  }
};

// 执行 handler（如果存在）
watch(
  () => [config.value, args.value, props.toolCall.result, props.toolCall.eventType],
  async () => {
    if (!config.value) return;

    if (isNonInteractiveConfig(config.value)) {
      // 非交互式：执行 handler
      try {
        actionState.value = { status: 'executing' };

        // 解析后端返回的结果作为 handler 的第二个参数
        let backendResult;
        if (props.toolCall.result) {
          try {
            backendResult = JSON.parse(props.toolCall.result);
          } catch (error) {
            console.warn('解析后端结果失败，使用原始字符串:', error);
            backendResult = props.toolCall.result;
          }
        }

        // 调用 handler，传入 args 和 backendResult
        const result = await config.value.handler(args.value, backendResult);
        actionState.value = {
          status: 'complete',
          result,
        };
      } catch (error) {
        actionState.value = {
          status: 'error',
          error: error as Error,
        };
      }
    } else if (props.toolCall.result) {
      // 交互式：已有结果，显示完成状态
      try {
        const result = JSON.parse(props.toolCall.result);
        actionState.value = {
          status: 'complete',
          result,
        };
      } catch (error) {
        actionState.value = {
          status: 'error',
          error: error as Error,
        };
      }
    } else if (props.toolCall.eventType === 'TOOL_CALL_END' || props.toolCall.eventType === 'TOOL_CALL_RESULT') {
      // 🔑 关键修复：工具调用已结束（无 result 的情况，如 show_progress）
      actionState.value = { status: 'complete' };
    } else {
      // 等待用户交互或工具执行中
      actionState.value = { status: 'executing' };
    }
  },
  { immediate: true },
);

// 从配置中获取 subscribeKey 提取函数
const subscribeKeyExtractor = computed(() => config.value?.subscribeKey);

// 使用配置的提取函数来获取 targetStateKey
const targetStateKey = computed(() => {
  if (!subscribeKeyExtractor.value) return undefined;

  // 构造完整的 props 对象传给提取函数
  const fullProps = {
    status: actionState.value.status,
    args: args.value,
    result: actionState.value.result,
    error: actionState.value.error,
    respond: handleRespond,
  };

  return subscribeKeyExtractor.value(fullProps);
});

// 监听组件注册事件
onMounted(() => {
  const handleRegistered = (event: CustomEvent) => {
    if (event.detail?.name === props.toolCall.toolCallName) {
      isRegistered.value = true;
    }
  };

  if (!isRegistered.value) {
    window.addEventListener('toolcall-registered', handleRegistered as EventListener);
  }

  return () => {
    window.removeEventListener('toolcall-registered', handleRegistered as EventListener);
  };
});

// 使用精确订阅
const agentState = useAgentStateDataByKey(targetStateKey);

// 缓存组件 props
const componentProps = computed<ToolcallComponentProps>(() => ({
  status: actionState.value.status,
  args: args.value,
  result: actionState.value.result,
  error: actionState.value.error,
  respond: handleRespond,
  agentState: agentState.value,
}));

// 使用registry的缓存渲染函数
const MemoizedComponent = computed(() => agentToolcallRegistry.getRenderFunction(props.toolCall.toolCallName));
</script>
