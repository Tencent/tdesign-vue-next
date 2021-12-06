<template>
  <t-head-menu theme="dark" value="item2">
    <t-menu-item value="item1"> 菜单内容一 </t-menu-item>
    <t-menu-item value="item2"> 已选内容 </t-menu-item>
    <t-menu-item value="item3"> 菜单内容二 </t-menu-item>
    <t-menu-item value="item4" :disabled="true"> 菜单内容三 </t-menu-item>
    <template #operations>
      <div class="demo-box">自定义内容区域</div>
    </template>
  </t-head-menu>
</template>

<style lang="less" scoped>
.demo-box {
  width: 200px;
  height: 40px;
  line-height: 40px;
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  text-align: center;
}
</style>
