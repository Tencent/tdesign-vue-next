<template>
  <t-space>
    <t-space direction="vertical" size="small">
      <p>自定义系统色</p>
      <t-color-picker-panel v-model="color" :swatch-colors="systemColors" />
    </t-space>

    <t-space direction="vertical" size="small">
      <p>完全不显示系统色</p>
      <t-color-picker-panel v-model="color" :swatch-colors="null" />
    </t-space>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const color = ref('#0052d9');
const systemColors = ref(['red', 'green', 'yellow', 'blue', 'purple']);
</script>
<style scoped>
p {
  font-size: 12px;
}
</style>
