<template>
  <t-head-menu theme="dark" active="item2">
    <t-menu-item name="item1">菜单内容一</t-menu-item>
    <t-menu-item name="item2">已选内容</t-menu-item>
    <t-menu-item name="item3">菜单内容二</t-menu-item>
    <t-menu-item name="item4" :disabled="true">菜单内容三</t-menu-item>
    <template #options>
      <div>
        <div class="demo-box">自定义内容区域</div>
      </div>
    </template>
  </t-head-menu>
</template>

<style lang="less">
  .demo-box {
    margin-top: 12px;
    margin-right: 20px;
    width: 200px;
    height: 40px;
    line-height: 40px;
    background: rgba(255,255,255,0.3);
    color: #fff;
    text-align: center;
  }
</style>
