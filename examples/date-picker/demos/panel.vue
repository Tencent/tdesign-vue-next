<template>
  <div class="tdesign-demo-block-column">
    <div :style="{ border: '1px solid var(--td-border-level-2-color)', width: 'fit-content', borderRadius: 3 }">
      <t-date-picker-panel :on-change="handleChange" />
    </div>
    <div :style="{ border: '1px solid var(--td-border-level-2-color)', width: 'fit-content', borderRadius: 3 }">
      <t-date-picker-panel enable-time-picker :on-change="handleChange" />
    </div>

    <div :style="{ border: '1px solid var(--td-border-level-2-color)', width: 'fit-content', borderRadius: 3 }">
      <t-date-range-picker-panel :on-change="handleChange" />
    </div>
    <div :style="{ border: '1px solid var(--td-border-level-2-color)', width: 'fit-content', borderRadius: 3 }">
      <t-date-range-picker-panel enable-time-picker :on-change="handleChange" />
    </div>
  </div>
</template>

<script setup>
function handleChange(value) {
  console.log('value', value);
}
</script>
