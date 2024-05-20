<template>
  <t-timeline mode="same">
    <t-timeline-item v-for="(item, index) in options" :key="index" :label="item.label" :dot-color="item.dotColor">
      {{ item.content }}
    </t-timeline-item>
  </t-timeline>
</template>
<script lang="ts" setup>
const options = [
  {
    label: '2022-01-01',
    content: '已完成的时间',
    dotColor: 'primary',
  },
  {
    label: '2022-02-01',
    content: '成功的时间',
    dotColor: 'success',
  },
  {
    label: '2022-03-01',
    content: '危险时间',
    dotColor: 'error',
  },
  {
    label: '2022-04-01',
    content: '告警事件',
    dotColor: 'warning',
  },
  {
    label: '2022-04-01',
    content: '默认的时间',
  },
  {
    label: '2022-04-01',
    content: '自定义主题色',
    dotColor: 'yellowgreen',
  },
];
</script>
