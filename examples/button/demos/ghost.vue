<template>
  <div>
    <div class="tdesign-demo-block" style="background: #bbb; padding: 10px;">
      <t-button variant="base" ghost>幽灵按钮</t-button>
      <t-button variant="outline" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" ghost>幽灵按钮</t-button>
      <t-button variant="text" ghost>幽灵按钮</t-button>
    </div>
    <div class="tdesign-demo-block" style="background: #bbb; padding: 10px;">
      <t-button variant="base" theme="primary" ghost>幽灵按钮</t-button>
      <t-button variant="outline" theme="primary" ghost>幽灵按钮</t-button>
      <t-button variant="dashed" theme="primary" ghost>幽灵按钮</t-button>
      <t-button variant="text" theme="primary" ghost>幽灵按钮</t-button>
    </div>
    <div class="tdesign-demo-block" style="background: #bbb; padding: 10px;">
      <t-button variant="base" theme="danger" ghost>幽灵按钮</t-button>
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
