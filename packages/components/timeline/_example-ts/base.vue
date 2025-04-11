<template>
  <t-space direction="vertical">
    <t-space align="center">
      <h3>时间轴方向</h3>
      <t-radio-group v-model="layout" variant="default-filled">
        <t-radio-button value="vertical">垂直时间轴</t-radio-button>
        <t-radio-button value="horizontal">水平时间轴</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-timeline :layout="layout" mode="same">
      <t-timeline-item v-for="(item, index) in options" :key="index" :label="item.label" dot-color="primary">
        {{ item.content }}
      </t-timeline-item>
    </t-timeline>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TimelineProps } from 'tdesign-vue-next';
const layout = ref<TimelineProps['layout']>('vertical');
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
