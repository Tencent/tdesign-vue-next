<template>
  <div class="demo-button-row">
    <div class="demo-button-col">
      <t-button block theme="primary" variant="base">填充按钮</t-button>
      <t-button block variant="outline">描边按钮</t-button>
      <t-button block variant="dashed">虚框按钮</t-button>
      <t-button block variant="text">文字按钮</t-button>
    </div>
  </div>
</template>

<style scoped>
.demo-button-row {
  display: flex;
  width: 100%;
  justify-content: center;
}
.demo-button-col {
  width: 50%;
}
.demo-button-col + .demo-button-col {
  margin-left: 32px;
}
.t-button + .t-button {
  margin-top: 16px;
}
</style>
