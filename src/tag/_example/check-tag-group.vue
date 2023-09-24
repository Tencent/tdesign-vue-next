<template>
  <t-space direction="vertical">
    <t-check-tag-group v-model="checkTagValue1" :options="options" />

    <t-check-tag-group
      v-model="checkTagValue2"
      :options="options"
      :unchecked-props="{ theme: 'default', variant: 'outline' }"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const checkTagValue1 = ref([]);
const checkTagValue2 = ref([]);
const options = [
  { label: '标签1', value: 1 },
  { label: '标签2', value: 2 },
  { label: '标签3', value: 3 },
  { label: '标签4', value: 4 },
  { label: '标签5', value: 5 },
  { label: '标签6', value: 6 },
];
</script>

<style lang="less"></style>
