<template>
  <div>
    <t-badge count="2" dot>
      <div class="badge-block"></div>
    </t-badge>
    <t-badge count="99" color="#52c41a">
      <div class="badge-block"></div>
    </t-badge>
    <t-badge count="100" color="#2db7f5" shape="round">
      <div class="badge-block"></div>
    </t-badge>
  </div>
</template>
<style>
.badge-block {
  width: 40px;
  height: 40px;
  background: #EEEEEE;
  border: 1px solid #DCDCDC;
  box-sizing: border-box;
  border-radius: 2px;
}

.badge-block + .badge-block {
  margin-left: 16px;
}
</style>
