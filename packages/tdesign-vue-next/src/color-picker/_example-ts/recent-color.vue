<template>
  <t-space>
    <t-space direction="vertical" size="small">
      <p>预设最近使用色</p>
      <t-color-picker-panel
        v-model="color"
        :recent-colors="[
          'red',
          'green',
          'yellow',
          'blue',
          'purple',
          'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
          'linear-gradient(45deg, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)',
          'linear-gradient(120deg, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)',
        ]"
      />
    </t-space>

    <t-space direction="vertical" size="small">
      <p>完全不显示最近使用色</p>
      <t-color-picker-panel v-model="color" :recent-colors="null" />
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#0052d9');
</script>
<style scoped>
p {
  font-size: 12px;
}
</style>
