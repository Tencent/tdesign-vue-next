<template>
  <div class="demo-button-row">
    <div class="demo-button-col">
      <t-button block theme="primary">主按钮</t-button>
      <t-button block theme="line">次要按钮</t-button>
      <t-button block theme="dashed">虚框按钮</t-button>
    </div>
    <div class="demo-button-col">
      <t-button block theme="warning">告警按钮</t-button>
      <t-button block theme="warning-line">次要告警</t-button>
      <t-button block theme="link">文字按钮</t-button>
      <t-button block theme="ghost">幽灵按钮</t-button>
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
