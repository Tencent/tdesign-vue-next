<template>
  <t-space :size="24">
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
