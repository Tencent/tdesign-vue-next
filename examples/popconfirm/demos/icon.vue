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

    <div class="tdesign-demo-block">
      <t-popconfirm content="基础气泡确认框文案示意文字按钮">
        <t-button theme="line">默认</t-button>
      </t-popconfirm>
      <t-popconfirm theme="info" content="事件通知类型偏向于提示">
        <t-button theme="primary">提示</t-button>
      </t-popconfirm>
      <t-popconfirm theme="warning" content="事件通知类型偏向于警示">
        <t-button theme="warning-line">警示</t-button>
      </t-popconfirm>
      <t-popconfirm theme="error" content="事件通知类型偏向于警告">
        <t-button theme="warning">警告</t-button>
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
.tdesign-demo-block + .tdesign-demo-block {
  margin-top: 24px;
}
</style>
