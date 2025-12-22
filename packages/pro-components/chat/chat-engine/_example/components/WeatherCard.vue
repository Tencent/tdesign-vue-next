<template>
  <t-card bordered style="margin-top: 8px">
    <template v-if="error">
      <div style="color: #e34d59">查询天气失败: {{ error.message }}</div>
    </template>
    <template v-else>
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px">{{ args?.city }} 天气信息</div>
      <div v-if="status === 'executing'" style="color: #0052d9">正在查询天气...</div>
      <t-space v-if="status === 'complete' && result" direction="vertical" size="small">
        <div>🌡️ 温度: {{ result.temperature }}</div>
        <div>☁️ 天气: {{ result.condition }}</div>
        <div>💧 湿度: {{ result.humidity }}</div>
      </t-space>
    </template>
  </t-card>
</template>

<script setup lang="ts">
/**
 * 天气查询组件
 * 展示 TOOL_CALL 基础用法
 */

interface WeatherArgs {
  city: string;
}

interface WeatherResult {
  temperature: string;
  condition: string;
  humidity: string;
}

defineProps<{
  status?: string;
  args?: WeatherArgs;
  result?: WeatherResult;
  error?: Error;
}>();
</script>
