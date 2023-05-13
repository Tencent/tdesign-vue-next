<template>
  <t-space>
    <t-switch />
    <t-switch v-model="checked" @change="onChange" />
  </t-space>
</template>

<script setup lang="ts">
import { SwitchValue } from 'tdesign-vue-next';
import { ref } from 'vue';

const checked = ref(true);

const onChange = (val: SwitchValue) => {
  console.log(val);
};
</script>
