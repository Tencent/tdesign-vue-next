<template>
  <t-input-number v-model="value" :max="15" :min="-5" :step="1.2" :decimal-places="2" @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InputNumberProps } from 'tdesign-vue-next';
const value = ref(3.2);
const onChange: InputNumberProps['onChange'] = (ev) => {
  console.info(ev);
};
</script>
