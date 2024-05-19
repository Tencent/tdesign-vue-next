<template>
  <t-space direction="vertical" size="large">
    <t-space>
      <t-space direction="vertical" size="small">
        <p>默认（单色 + 线性渐变）</p>
        <t-color-picker v-model="color1" format="CSS" />
      </t-space>
      <t-space direction="vertical" size="small">
        <p>仅单色模式</p>
        <t-color-picker
          v-model="color2"
          format="CSS"
          :color-modes="['monochrome']"
          :show-primary-color-preview="false"
        />
      </t-space>
    </t-space>

    <t-space direction="vertical" size="small">
      <p>仅线性渐变模式</p>
      <t-color-picker v-model="color3" format="CSS" :color-modes="['linear-gradient']" />
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const color1 = ref('#0052d9');
const color2 = ref('#0052d9');
const color3 = ref('linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)');
</script>
<style scoped>
p {
  font-size: 12px;
}
</style>
