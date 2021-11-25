<template>
  <div>
    <t-head-menu v-model="menu1Value" theme="light" @change="changeHandler">
      <template #logo>
        <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
      </template>
      <t-menu-item value="item1"> 菜单1 </t-menu-item>
      <t-menu-item value="item2"> 菜单2 </t-menu-item>
      <t-menu-item value="item4" :disabled="true"> 禁用菜单 </t-menu-item>
      <template #operations>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
      </template>
    </t-head-menu>

    <br />

    <t-head-menu v-model="menu2Value" theme="dark" height="120px">
      <template #logo>
        <img width="136" src="https://www.tencent.com/img/index/menu_logo.png" alt="logo" />
      </template>
      <t-menu-item value="item1"> 菜单1 </t-menu-item>
      <t-menu-item value="item2"> 菜单2 </t-menu-item>
      <t-menu-item value="item4" :disabled="true"> 禁用菜单 </t-menu-item>
      <template #operations>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
        <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
      </template>
    </t-head-menu>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const menu1Value = ref('item2');
    const menu2Value = ref('item1');

    const changeHandler = (active) => {
      console.log('change', active);
    };

    return {
      menu1Value,
      menu2Value,
      changeHandler,
    };
  },
});
</script>
