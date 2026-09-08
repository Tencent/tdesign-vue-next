<template>
  <t-chat-thought-chain :items="items" :default-expanded-value="[1]">
    <template #icon="{ item }">
      <SearchIcon v-if="item.key === 'search'" />
    </template>
    <template #content="{ item }">
      <div v-if="item.key === 'search'">
        <t-tag v-for="doc in docs" :key="doc" theme="primary" variant="light" style="margin: 0 8px 4px 0">
          {{ doc }}
        </t-tag>
      </div>
    </template>
  </t-chat-thought-chain>
</template>
<script setup>
import { SearchIcon } from 'tdesign-icons-vue-next';

const docs = ['产品白皮书.pdf', '性能测试报告.xlsx', 'API 设计文档.md'];

const items = [
  { title: '理解问题', content: '识别为产品技术选型类问题。', status: 'success' },
  { key: 'search', title: '检索知识库', status: 'success' },
  { title: '生成回答', status: 'error', content: '生成超时，已自动重试。' },
];
</script>
