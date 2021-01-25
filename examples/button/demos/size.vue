<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button size="small" variant="base">主按钮</t-button>
      <t-button size="small" variant="outline">次要按钮</t-button>
      <t-button size="small" variant="dashed">虚框按钮</t-button>
      <t-button size="small" variant="text">文字按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button size="medium" variant="base">主按钮</t-button>
      <t-button size="medium" variant="outline">次要按钮</t-button>
      <t-button size="medium" variant="dashed">虚框按钮</t-button>
      <t-button size="medium" variant="text">文字按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button size="large" variant="base">主按钮</t-button>
      <t-button size="large" variant="outline">次要按钮</t-button>
      <t-button size="large" variant="dashed">虚框按钮</t-button>
      <t-button size="large" variant="text">文字按钮</t-button>
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
