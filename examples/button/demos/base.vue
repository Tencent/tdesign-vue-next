<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button>默认按钮</t-button>
      <t-button variant="outline">次要按钮</t-button>
      <t-button variant="dashed">虚框按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" variant="base">主要按钮</t-button>
      <t-button theme="primary" variant="outline">次要按钮</t-button>
      <t-button theme="primary" variant="dashed">虚框按钮</t-button>
      <t-button theme="primary" variant="text">文字按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="danger" variant="base">主要按钮</t-button>
      <t-button theme="danger" variant="outline">次要按钮</t-button>
      <t-button theme="danger" variant="dashed">虚框按钮</t-button>
      <t-button theme="danger" variant="text">文字按钮</t-button>
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
