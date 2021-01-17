<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary">主要按钮</t-button>
      <t-button theme="line">次要按钮</t-button>
      <t-button theme="dashed">虚框按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="warning">告警按钮</t-button>
      <t-button theme="warning-line">次要告警</t-button>
      <t-button theme="link">文字按钮</t-button>
      <t-button theme="link" disabled>文字按钮</t-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tdesign-demo-item__body {
  .t-button + .t-button {
    margin-left: 32px;
  }
  .tdesign-demo-block {
    margin-top: 16px;
  }
}
.tdesign-wrap {
  display: inline-block;
  background-color: #bbbbbb;
  padding: 10px;
  margin-right: 10px;

}
</style>
