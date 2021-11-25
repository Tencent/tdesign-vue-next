<template>
  <div>
    <t-badge count="2" dot>
      <div class="badge-block" />
    </t-badge>
    <t-badge count="99" color="#52c41a">
      <div class="badge-block" />
    </t-badge>
    <t-badge count="100" color="#2db7f5" shape="round">
      <div class="badge-block" />
    </t-badge>
  </div>
</template>
<script></script>
<style>
.badge-block {
  width: 40px;
  height: 40px;
  background: #eeeeee;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 3px;
}

.badge-block + .badge-block {
  margin-left: 16px;
}
</style>
