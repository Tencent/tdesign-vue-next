<template>
  <div>
    <div class="tdesign-demo-block">
      <div class="item"><t-button shape="square" variant="base">主按钮</t-button></div>
      <div class="item"><t-button shape="round" variant="base">主按钮</t-button></div>
      <div class="item"><t-button shape="circle" variant="base">i</t-button></div>
    </div>
    <div class="tdesign-demo-block">
      <div class="item"><t-button shape="square" variant="outline">次要按钮</t-button></div>
      <div class="item"><t-button shape="round" variant="outline">次要按钮</t-button></div>
      <div class="item"><t-button shape="circle" variant="outline">i</t-button></div>
    </div>
    <div class="tdesign-demo-block">
      <div class="item"><t-button shape="square" variant="dashed">虚框按钮</t-button></div>
      <div class="item"><t-button shape="round" variant="dashed">虚框按钮</t-button></div>
      <div class="item"><t-button shape="circle" variant="dashed">i</t-button></div>
    </div>
    <div class="tdesign-demo-block">
      <div class="item"><t-button shape="square" variant="text">文字按钮</t-button></div>
      <div class="item"><t-button shape="round" variant="text">文字按钮</t-button></div>
      <div class="item"><t-button shape="circle" variant="text">i</t-button></div>
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
    display: flex;
    .item {
      width: 150px;
    }
  }
}
.tdesign-wrap {
  display: inline-block;
  background-color: #bbbbbb;
  padding: 10px;
  margin-right: 10px;

}
</style>
