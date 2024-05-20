<template>
  <t-space direction="vertical" :size="20">
    <t-space direction="vertical" :size="20">
      <h3 class="demo-t-badge-title">1.默认大小</h3>
      <t-space :size="24">
        <t-badge count="2">
          <div class="badge-block"></div>
        </t-badge>
        <t-badge count="99">
          <div class="badge-block"></div>
        </t-badge>
        <t-badge count="999">
          <div class="badge-block"></div>
        </t-badge>
      </t-space>
    </t-space>

    <t-space direction="vertical" :size="20">
      <h3 class="demo-t-badge-title">2.小</h3>
      <t-space :size="24">
        <t-badge count="2" size="small">
          <div class="badge-block"></div>
        </t-badge>
        <t-badge count="99" size="small">
          <div class="badge-block"></div>
        </t-badge>
        <t-badge count="999" size="small">
          <div class="badge-block"></div>
        </t-badge>
      </t-space>
    </t-space>
  </t-space>
</template>
<style scoped>
.badge-block {
  width: 40px;
  height: 40px;
  background: #eeeeee;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
