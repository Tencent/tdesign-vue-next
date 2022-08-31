<template>
  <div>
    <t-badge count="2" dot>
      <div class="badge-block"></div>
    </t-badge>
    <t-badge count="new">
      <div class="badge-block"></div>
    </t-badge>
    <t-badge count="99" color="#00A870">
      <div class="badge-block"></div>
    </t-badge>
    <t-badge count="100" color="#0052D9" shape="round">
      <div class="badge-block"></div>
    </t-badge>
  </div>
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

.t-badge + .t-badge {
  margin-left: 32px;
}
</style>
