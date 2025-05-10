<template>
  <t-space>
    <t-space direction="vertical" size="small">
      <p>预设最近使用色</p>
      <t-color-picker-panel v-model="color" :default-recent-colors="recentColors" />
    </t-space>

    <t-space direction="vertical" size="small">
      <p>完全不显示最近使用色</p>
      <t-color-picker-panel v-model="color" :recent-colors="null" />
    </t-space>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';
const color = ref('#0052d9');
const recentColors = ref([
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  'linear-gradient(45deg, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)',
]);
</script>
<style scoped>
p {
  font-size: 12px;
}
</style>
