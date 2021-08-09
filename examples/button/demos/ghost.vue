<template>
  <div style="background: rgb(8,33,76); padding: 24px;">
    <div class="tdesign-demo-block" style="margin-bottom: 10px;">
      <t-button variant="outline" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" ghost>幽灵按钮</t-button>
      <t-button variant="text" ghost>幽灵按钮</t-button>
    </div>
    <div class="tdesign-demo-block" style="margin-bottom: 10px;">
      <t-button variant="outline" theme="primary" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" theme="primary" ghost>幽灵按钮</t-button>
      <t-button variant="text" theme="primary" ghost>幽灵按钮</t-button>
    </div>
    <div class="tdesign-demo-block" style="margin-bottom: 10px;">
      <t-button variant="outline" theme="success" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" theme="success" ghost>幽灵按钮</t-button>
      <t-button variant="text" theme="success" ghost>幽灵按钮</t-button>
    </div>
    <div class="tdesign-demo-block" style="margin-bottom: 10px;">
      <t-button variant="outline" theme="warning" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" theme="warning" ghost>幽灵按钮</t-button>
      <t-button variant="text" theme="warning" ghost>幽灵按钮</t-button>
    </div>
    <div class="tdesign-demo-block" style="margin-bottom: 10px;">
      <t-button variant="outline" theme="danger" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" theme="danger" ghost>幽灵按钮</t-button>
      <t-button variant="text" theme="danger" ghost>幽灵按钮</t-button>
    </div>
  </div>

</template>

<style scoped>
.t-button + .t-button {
  margin-left: 16px;
}
</style>
