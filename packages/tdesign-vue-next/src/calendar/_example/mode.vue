<template>
  <t-space direction="vertical">
    <t-form layout="inline">
      <t-form-item label="切换模式为：">
        <t-select v-model="mode" class="demo-select-base">
          <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
        </t-select>
      </t-form-item>
    </t-form>
    <t-calendar :mode="mode" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const options = [
  { value: 'month', label: '日历' },
  { value: 'year', label: '月历' },
];

const mode = ref('year');
</script>

<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
}
</style>
