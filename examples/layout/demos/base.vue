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
<script>
</script>