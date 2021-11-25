<template>
  <div>
    <t-badge :count="2">
      <div class="badge-block" />
    </t-badge>
    <t-badge
      :count="0"
      show-zero
    >
      <div class="badge-block" />
    </t-badge>
    <t-badge :count="100">
      <div class="badge-block" />
    </t-badge>
  </div>
</template>
<script></script>

<style>
.badge-block {
  width: 40px;
  height: 40px;
  background: #EEEEEE;
  border: 1px solid #DCDCDC;
  box-sizing: border-box;
  border-radius: 3px;
}

.badge-block + .badge-block {
  margin-left: 16px;
}
</style>
