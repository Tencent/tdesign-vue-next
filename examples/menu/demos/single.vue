<template>
  <div>
    <t-head-menu v-model="menu1Value" theme="light" @change="changeHandler">
      <template #logo>
        <img width="136"  src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo">
      </template>
      <t-menu-item value="item1">内容列表</t-menu-item>
      <t-menu-item value="item2">已选内容</t-menu-item>
      <t-menu-item value="item4" :disabled="true">内容列表</t-menu-item>
      <template #operations>
        <a href="javascript:;"><t-icon name="search"/></a>
        <a href="javascript:;"><t-icon name="mail"/></a>
        <a href="javascript:;"><t-icon name="user"/></a>
        <a href="javascript:;"><t-icon name="ellipsis"/></a>
      </template>
    </t-head-menu>

    <br />

    <t-head-menu theme="dark" v-model="menu2Value" height="120px">
      <template #logo>
        <img width="136"  src="https://www.tencent.com/img/index/menu_logo.png" alt="logo">
      </template>
      <t-menu-item value="item1">已选内容</t-menu-item>
      <t-menu-item value="item2">内容列表</t-menu-item>
      <t-menu-item value="item4" :disabled="true">内容列表</t-menu-item>
      <template #operations>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search"/></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail"/></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user"/></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis"/></a>
      </template>
    </t-head-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu1Value: 'item2',
      menu2Value: 'item1',
    };
  },
  methods: {
    changeHandler(active) {
      console.log('change', active);
    },
  },
};
</script>
