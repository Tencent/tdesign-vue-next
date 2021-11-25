<template>
  <div>
    <h3 class="demo-t-badge-title">
      1.默认大小
    </h3>
    <t-badge count="2">
      <div class="badge-block" />
    </t-badge>
    <t-badge count="99">
      <div class="badge-block" />
    </t-badge>
    <t-badge count="999">
      <div class="badge-block" />
    </t-badge>

    <h3 class="demo-t-badge-title">
      2.小
    </h3>
    <t-badge
      count="2"
      size="small"
    >
      <div class="badge-block" />
    </t-badge>
    <t-badge
      count="99"
      size="small"
    >
      <div class="badge-block" />
    </t-badge>
    <t-badge
      count="999"
      size="small"
    >
      <div class="badge-block" />
    </t-badge>
  </div>
</template>
<script></script>

<style scoped>
  .demo-t-badge-title {
      margin: 20px 0;
  }

  .badge-block {
  width: 40px;
  height: 40px;
  background: #EEEEEE;
  border: 1px solid #DCDCDC;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
