<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <t-popconfirm theme="default" content="基础气泡确认框文案示意文字按钮" icon='browse'>
        <t-button theme="primary">使用string</t-button>
      </t-popconfirm>
      <t-popconfirm theme="default" content="事件通知类型偏向于提示">
        <t-icon name="browse" style="color: #0052d9" slot='icon'/>
        <t-button theme="primary">使用VNode</t-button>
      </t-popconfirm>
      <t-popconfirm theme="default" content="事件通知类型偏向于警示" :icon='customIcon'>
        <t-button theme="primary">使用Function</t-button>
      </t-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    customIcon() {
      return (<t-icon name='browse' style="margin-right: 8px"/>);
    },
  },
};
</script>
<style>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
