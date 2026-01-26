<template>
  <t-space direction="vertical">
    <div class="date-picker-panel-border">
      <t-date-picker-panel
        :on-cell-click="handleCellClick"
        :on-change="handleChange"
        :on-month-change="handleMonthChange"
        :on-year-change="handleYearChange"
      />
    </div>
    <div class="date-picker-panel-border">
      <t-date-picker-panel
        enable-time-picker
        :on-cell-click="handleCellClick"
        :on-change="handleChange"
        :on-month-change="handleMonthChange"
        :on-year-change="handleYearChange"
      />
    </div>

    <div class="date-picker-panel-border">
      <t-date-range-picker-panel
        :on-cell-click="handleCellClick"
        :on-change="handleChange"
        :on-month-change="handleMonthChange"
        :on-year-change="handleYearChange"
      />
    </div>
    <div class="date-picker-panel-border">
      <t-date-range-picker-panel
        enable-time-picker
        :on-cell-click="handleCellClick"
        :on-change="handleChange"
        :on-month-change="handleMonthChange"
        :on-year-change="handleYearChange"
      />
    </div>
  </t-space>
</template>

<script setup>
function handleChange(value) {
  console.log('onChange value', value);
}

function handleCellClick(value) {
  console.log('onCellClick value', value);
}

function handleMonthChange(context) {
  console.log('onMonthChange context', context);
}

function handleYearChange(context) {
  console.log('onYearChange context', context);
}
</script>
<style>
.date-picker-panel-border {
  border: 1px solid var(--td-border-level-2-color);
  width: fit-content;
  border-radius: 3;
}
</style>
