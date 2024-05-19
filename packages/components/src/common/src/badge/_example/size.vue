<template>
  <t-space direction="vertical" size="large">
    <h3>1.默认大小</h3>
    <div>
      <t-badge count="2">
        <div class="badge-block" />
      </t-badge>
      <t-badge count="99">
        <div class="badge-block" />
      </t-badge>
      <t-badge count="999">
        <div class="badge-block" />
      </t-badge>
    </div>

    <h3>2.小</h3>
    <div>
      <t-badge count="2" size="small">
        <div class="badge-block" />
      </t-badge>
      <t-badge count="99" size="small">
        <div class="badge-block" />
      </t-badge>
      <t-badge count="999" size="small">
        <div class="badge-block" />
      </t-badge>
    </div>
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
