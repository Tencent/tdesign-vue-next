<template>
  <slot />
</template>

<script setup lang="ts">
import { useAgentState, provideAgentState } from '../../hooks/useAgentState';

interface Props {
  initialState?: Record<string, any>;
  subscribeKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initialState: () => ({}),
  subscribeKey: undefined,
});

// 创建 AgentState 并提供给后代组件
const agentStateResult = useAgentState({
  initialState: props.initialState,
  subscribeKey: props.subscribeKey,
});

provideAgentState(agentStateResult);

// 暴露给父组件使用
defineExpose(agentStateResult);
</script>
