<template>
  <t-space direction="vertical">
    <t-space align="center">
      <h3>是否倒序</h3>
      <t-switch v-model="reverse" />
    </t-space>
    <t-timeline :reverse="reverse" mode="same">
      <t-timeline-item v-for="(item, index) in options" :key="index" :label="item.label" dot-color="primary">
        {{ item.content }}
      </t-timeline-item>
    </t-timeline>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const reverse = ref(false);
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
