<template>
  <div class="tdesign-demo-block-column">
    <div>反向排列</div>
    <t-timeline reverse>
      <t-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
        {{ activity.content }}
      </t-timeline-item>
    </t-timeline>
  </div>
</template>

<script lang="jsx" setup>
const activities = [
  {
    content: '事件一',
    timestamp: '2022-05-01',
  },
  {
    content: '事件二',
    timestamp: '2022-05-01',
  },
  {
    content: '事件三',
    timestamp: '2022-05-01',
  },
  {
    content: '事件四',
    timestamp: '2022-05-01',
  },
];
</script>

<style lang="scss" scoped></style>
