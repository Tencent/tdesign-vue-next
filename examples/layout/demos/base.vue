<template>
  <div class="tdesign-demo-item--base">
    <div>
      <t-layout>
        <t-header>Header</t-header>
        <t-content>Content</t-content>
        <t-footer>Footer</t-footer>
      </t-layout>
    </div>

    <div>
      <t-layout>
        <t-header>Header</t-header>
        <t-layout>
          <t-aside>Aside</t-aside>
          <t-content>Content</t-content>
        </t-layout>
        <t-footer>Footer</t-footer>
      </t-layout>
    </div>

    <div>
      <t-layout>
        <t-header>Header</t-header>
        <t-layout>
          <t-content>Content</t-content>
          <t-aside>Aside</t-aside>
        </t-layout>
        <t-footer>Footer</t-footer>
      </t-layout>
    </div>

    <div>
      <t-layout>
        <t-aside>Aside</t-aside>
        <t-layout>
          <t-header>Header</t-header>
          <t-content>Content</t-content>
          <t-footer>Footer</t-footer>
        </t-layout>
      </t-layout>
    </div>
  </div>
</template>
<style lang="less" scoped>
.t-layout--header {
  text-align: center;
  color: #fff;
  background-color: #96BBF8;
  font-size: 16px;
}
.t-layout--content {
  text-align: center;
  color: #fff;
  background: #699EF5;
  height: 100px;
  font-size: 16px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.t-layout--footer {
  min-height: 46px;
  text-align: center;
  color: #fff;
  background: #96BBF8;
  font-size: 16px;
}
.tdesign-demo-item--base > div:not(:first-child) {
    margin-top: 24px;
}
.t-layout--sider {
  background-color: #4787F0;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>