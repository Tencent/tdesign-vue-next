<template>
  <div>
    <t-space direction="vertical">
      <t-timeline-item>123</t-timeline-item>
      <t-timeline mode="same">
        <t-timeline-item label="2022-01-01" dotColor="primary"> 已完成的时间 </t-timeline-item>
        <t-timeline-item label="2022-03-01" dotColor="error"> 危险时间 </t-timeline-item>
        <t-timeline-item label="2022-04-01" dotColor="warning"> 告警事件 </t-timeline-item>
        <t-timeline-item label="2022-05-01">默认的时间</t-timeline-item>
        <t-timeline-item label="2022-06-01" dotColor="yellowgreen"> 自定义主题色 </t-timeline-item>
      </t-timeline>
    </t-space>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleChange(checkedValue) {
      this.direction = checkedValue;
    },
  },
};
</script>
