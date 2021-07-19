<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <t-popconfirm theme="default" content="您确定要提交吗" confirmBtn='确定提交' cancelBtn='我再想想'>
        <t-button theme="primary">自定义button文本</t-button>
      </t-popconfirm>
      <t-popconfirm theme="default" content="您确定要提交吗">
        <t-button slot='cancelBtn' style="margin-right:12px">我再想想</t-button>
        <t-button theme="primary" slot='confirmBtn'>确定提交</t-button>
        <t-button theme="primary">使用Slot自定义button</t-button>
      </t-popconfirm>
    </div>
  </div>
</template>

<style scoped>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
