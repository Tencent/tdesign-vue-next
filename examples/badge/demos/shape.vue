<template>
  <div>
    <t-badge shape="circle" count="2">
      <div class="badge-block" />
    </t-badge>
    <t-badge shape="round" count="99">
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
