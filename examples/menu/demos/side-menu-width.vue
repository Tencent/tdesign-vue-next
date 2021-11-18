<template>
  <t-menu
    theme="light"
    value="item2"
    width="200px"
    height="550px"
  >
    <template #logo>
      <img
        width="136"
        class="t-menu__logo--center"
        src="https://www.tencent.com/img/index/menu_logo_hover.png"
        alt="logo"
      >
    </template>
    <t-menu-item value="item1">
      仪表盘
    </t-menu-item>
    <t-menu-item value="item2">
      资源区
    </t-menu-item>
    <t-menu-item value="item3">
      视频区
    </t-menu-item>
    <t-menu-item
      value="item4"
      :disabled="true"
    >
      资源编辑
    </t-menu-item>
  </t-menu>
</template>
<script />
