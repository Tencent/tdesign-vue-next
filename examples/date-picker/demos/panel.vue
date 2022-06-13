<template>
  <div class="tdesign-demo-block-column">
    <div class="date-picker-panel-border">
      <t-date-picker-panel :on-change="handleChange" />
    </div>
    <div class="date-picker-panel-border">
      <t-date-picker-panel enable-time-picker :on-change="handleChange" />
    </div>

    <div class="date-picker-panel-border">
      <t-date-range-picker-panel :on-change="handleChange" />
    </div>
    <div class="date-picker-panel-border">
      <t-date-range-picker-panel enable-time-picker :on-change="handleChange" />
    </div>
  </div>
</template>

<script setup>
function handleChange(value) {
  console.log('value', value);
}
</script>
<style>
.date-picker-panel-border {
  border: 1px solid var(--td-border-level-2-color);
  width: fit-content;
  border-radius: 3;
}
</style>
