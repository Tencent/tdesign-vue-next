<template>
  <div class="tdesign-demo-block-column">
    <div style="display: flex; align-items: center">
      <div style="flex: 1">
        <t-timeline>
          <t-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </t-timeline-item>
        </t-timeline>
      </div>
      <div style="flex: 1">
        <t-timeline mode="alternate">
          <t-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </t-timeline-item>
        </t-timeline>
      </div>
      <div style="flex: 1">
        <t-timeline mode="right">
          <t-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </t-timeline-item>
        </t-timeline>
      </div>
    </div>
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
