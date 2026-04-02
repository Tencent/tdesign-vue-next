<template>
  <t-space>
    <t-input-number v-model="value1" theme="column"></t-input-number>

    <t-input-number
      v-model="value2"
      theme="column"
      align="center"
      :max="15"
      :min="-2"
      label="数字"
      style="width: 150px"
    ></t-input-number>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref(3);
const value2 = ref(3);
</script>
