<template>
  <t-card bordered style="margin-top: 12px">
    <div style="font-size: 14px; font-weight: 600">🎨 开始生成图片</div>
    <div style="font-size: 12px; color: #666; margin-top: 4px">提示词: {{ args?.prompt }}</div>
  </t-card>
</template>

<script setup lang="ts">
interface GenerateImageArgs {
  taskId: string;
  prompt: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  args?: GenerateImageArgs;
}>();
</script>
