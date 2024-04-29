<template>
  <t-space>
    <t-switch />
    <t-switch v-model="checked" @change="onChange" />
  </t-space>
</template>

<script lang="ts" setup>
import { SwitchProps } from 'tdesign-vue-next';
import { ref } from 'vue';
const checked = ref(true);
const onChange: SwitchProps['onChange'] = (val) => {
  console.log(val);
};
</script>
