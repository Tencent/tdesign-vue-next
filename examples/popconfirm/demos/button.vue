<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <t-popconfirm theme="info" content="您确定要提交吗" confirmText='确定提交' cancelText='我再想想'>
        <t-button theme="primary">自定义button文本</t-button>
      </t-popconfirm>
      <t-popconfirm theme="info" content="您确定要提交吗">
        <t-button slot='cancelText' style="margin-right:12px">我再想想</t-button>
        <t-button theme="primary" slot='confirmText'>确定提交</t-button>
        <t-button theme="primary">使用Slot自定义button</t-button>
      </t-popconfirm>
    </div>
  </div>
</template>

<style>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
