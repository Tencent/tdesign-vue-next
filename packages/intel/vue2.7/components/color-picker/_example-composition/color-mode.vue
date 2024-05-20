<template>
  <t-space direction="vertical" size="32px">
    <t-space size="36px">
      <t-space direction="vertical" size="10px" class="item">
        <h5>默认（单色 + 线性渐变）</h5>
        <t-color-picker v-model="color1" format="CSS" />
      </t-space>
      <t-space direction="vertical" size="10px" class="item">
        <h5>仅单色模式</h5>
        <t-color-picker v-model="color2" format="CSS" :color-modes="['monochrome']" />
      </t-space>
    </t-space>

    <t-space direction="vertical" size="10px" class="item">
      <h5>仅线性渐变模式</h5>
      <t-color-picker v-model="color3" format="CSS" :color-modes="['linear-gradient']" />
    </t-space>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const color1 = ref('red');
const color2 = ref('#0052d9');
const color3 = ref('linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)');
</script>

<style scoped>
.item h5 {
  font-weight: normal;
}
</style>
