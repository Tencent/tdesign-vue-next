<template>
  <div style="background: #ddd; padding: 24px;">
    <div class="tdesign-demo-block" style="margin-bottom: 10px;">
      <t-button variant="base" ghost>幽灵按钮</t-button>
      <t-button variant="outline" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" ghost>幽灵按钮</t-button>
      <t-button variant="text" ghost>幽灵按钮</t-button>
    </div>
    <div class="tdesign-demo-block" style="margin-bottom: 10px;">
      <t-button theme="primary" ghost>幽灵按钮</t-button>
      <t-button variant="outline" theme="primary" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" theme="primary" ghost>幽灵按钮</t-button>
      <t-button variant="text" theme="primary" ghost>幽灵按钮</t-button>
    </div>
    <div class="tdesign-demo-block" style="margin-bottom: 10px;">
      <t-button theme="danger" ghost>幽灵按钮</t-button>
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
