<template>
  <t-space direction="vertical">
    <t-space align="center">
      <h3>加载中</h3>
      <t-switch v-model="loading" />
    </t-space>
    <t-timeline mode="same">
      <t-timeline-item
        v-for="(item, index) in options"
        :key="index"
        :loading="loading"
        :label="item.label"
        dot-color="primary"
      >
        {{ item.content }}
      </t-timeline-item>
    </t-timeline>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(false);
const options = [
  {
    label: '2022-01-01',
    content: '事件一',
  },
  {
    label: '2022-02-01',
    content: '事件二',
  },
  {
    label: '2022-03-01',
    content: '事件三',
  },
  {
    label: '2022-04-01',
    content: '事件四',
  },
];
</script>
