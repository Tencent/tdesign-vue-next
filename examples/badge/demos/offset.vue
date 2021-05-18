<template>
  <div>
    <t-badge count="2">
      <div class="badge-block"></div>
    </t-badge>

    <t-badge count="2" :offset="[10, 10]">
      <div class="badge-block"></div>
    </t-badge>

    <t-badge count="2" :offset="[-10, 10]">
      <div class="badge-block"></div>
    </t-badge>

    <t-badge count="2" :offset="[-10, -10]">
      <div class="badge-block"></div>
    </t-badge>

    <t-badge count="2" :offset="[10, -10]">
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
  margin-left: 24px;
}

.badge-block + div {
  margin-top: 8px;
}
</style>
