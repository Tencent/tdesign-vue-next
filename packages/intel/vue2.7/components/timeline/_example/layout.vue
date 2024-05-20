<template>
  <div>
    <t-space direction="vertical">
      <t-space>
        <h4>时间轴方向</h4>
        <t-radio-group default-value="vertical" @change="handleLayoutChange">
          <t-radio-button value="vertical">垂直时间轴</t-radio-button>
          <t-radio-button value="horizontal">水平时间轴</t-radio-button>
        </t-radio-group>
      </t-space>
      <t-space>
        <h4>对齐方式</h4>
        <t-radio-group default-value="left" @change="handleDirectionChange">
          <t-radio-button value="left">左对齐</t-radio-button>
          <t-radio-button value="alternate">交错对齐</t-radio-button>
          <t-radio-button value="right">右对齐</t-radio-button>
        </t-radio-group>
      </t-space>
      <t-space>
        <h4>label对齐方式</h4>
        <t-radio-group default-value="same" @change="handleModeChange">
          <t-radio-button value="same">同侧</t-radio-button>
          <t-radio-button value="alternate">交错</t-radio-button>
        </t-radio-group>
      </t-space>
    </t-space>
    <t-timeline :layout="layout" :labelAlign="direction" :mode="mode">
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
      layout: 'vertical',
      direction: 'left',
      mode: 'same',
    };
  },
  methods: {
    handleLayoutChange(checkedValue) {
      this.layout = checkedValue;
    },
    handleDirectionChange(checkedValue) {
      this.direction = checkedValue;
    },
    handleModeChange(checkedValue) {
      this.mode = checkedValue;
    },
  },
};
</script>
