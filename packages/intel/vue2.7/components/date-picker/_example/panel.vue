<template>
  <t-space direction="vertical">
    <div class="date-picker-panel-border">
      <t-date-picker-panel @panel-click="handlePanelClick" @cell-click="handleCellClick" :on-change="handleChange" />
    </div>
    <div class="date-picker-panel-border">
      <t-date-picker-panel
        enable-time-picker
        @panel-click="handlePanelClick"
        @cell-click="handleCellClick"
        :on-change="handleChange"
      />
    </div>

    <div class="date-picker-panel-border">
      <t-date-range-picker-panel
        @panel-click="handlePanelClick"
        @cell-click="handleCellClick"
        :on-change="handleChange"
        :value="['2022-02-16', '2022-02-21']"
      />
    </div>
    <div class="date-picker-panel-border">
      <t-date-range-picker-panel
        enable-time-picker
        @panel-click="handlePanelClick"
        @cell-click="handleCellClick"
        :on-change="handleChange"
      />
    </div>
  </t-space>
</template>

<script>
export default {
  methods: {
    handleChange(value) {
      console.log('onChange value', value);
    },
    handleCellClick(value) {
      console.log('onCellClick value', value);
    },
    handlePanelClick(ctx) {
      console.log('onPanelClick', ctx);
    },
  },
};
</script>

<style>
.date-picker-panel-border {
  border: 1px solid var(--td-border-level-2-color);
  width: fit-content;
  border-radius: 3;
}
</style>
