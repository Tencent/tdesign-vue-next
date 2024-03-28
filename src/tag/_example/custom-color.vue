<template>
  <div>
    <p class="color-picker">
      <t-space align="center">
        <label>调整颜色查看效果</label>
        <t-color-picker v-model="color" :color-modes="['monochrome']"></t-color-picker>
      </t-space>
    </p>
    <t-space direction="horizontal">
      <t-space>
        <t-tag theme="primary" :color="color">默认</t-tag>
      </t-space>
      <t-space>
        <t-tag :color="color" variant="light">浅色</t-tag>
      </t-space>
      <t-space>
        <t-tag :color="color" variant="outline">outline</t-tag>
      </t-space>
      <t-space>
        <t-tag :color="color" variant="light-outline">light-outline</t-tag>
      </t-space>
    </t-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const color = ref('rgb(0, 82, 217)');
</script>

<style lang="less" scoped>
.color-picker {
  margin-bottom: 20px;
}
</style>
