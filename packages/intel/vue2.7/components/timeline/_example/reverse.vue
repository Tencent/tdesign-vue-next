<template>
  <div>
    <t-space direction="vertical" size="large">
      <t-space>
        <label>是否倒序</label>
        <t-switch size="large" v-model="reverse"></t-switch>
      </t-space>
    </t-space>
    <t-timeline mode="same" :reverse="reverse">
      <t-timeline-item label="2022-01-01">事件一</t-timeline-item>
      <t-timeline-item label="2022-02-01">事件二</t-timeline-item>
      <t-timeline-item label="2022-03-01">事件三</t-timeline-item>
      <t-timeline-item label="2022-04-01">事件四</t-timeline-item>
    </t-timeline>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reverse: false,
    };
  },
};
</script>
