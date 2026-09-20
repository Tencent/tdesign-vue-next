<template>
  <t-chat-thinking
    :content="{ title: '正在思考', text: '整理相关信息，准备回答。' }"
    status="pending"
    :collapsed="collapsed"
    @collapsed-change="handleCollapsedChange"
  >
    <template #icon>
      <lightbulb-icon />
    </template>
  </t-chat-thinking>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LightbulbIcon } from 'tdesign-icons-vue-next';

const collapsed = ref(false);
const handleCollapsedChange = (event: CustomEvent<boolean>) => {
  collapsed.value = event.detail;
};
</script>
