<template>
  <t-space direction="vertical">
    <t-space align="center">
      <label>时间轴方向</label>
      <t-radio-group default-value="vertical" @change="handleChange">
        <t-radio-button value="vertical">垂直时间轴</t-radio-button>
        <t-radio-button value="horizontal">水平时间轴</t-radio-button>
      </t-radio-group>
    </t-space>

    <t-timeline :layout="direction" mode="same">
      <t-timeline-item label="2022-01-01">事件一</t-timeline-item>
      <t-timeline-item label="2022-02-01">事件二</t-timeline-item>
      <t-timeline-item label="2022-03-01">事件三</t-timeline-item>
      <t-timeline-item label="2022-04-01">事件四</t-timeline-item>
    </t-timeline>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const direction = ref('vertical');
const handleChange = (checkedValue) => {
  direction.value = checkedValue;
};
</script>
