<template>
  <div class="tdesign-demo-block-row">
    <t-switch />
    <t-switch v-model="checked" @change="onChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);

const onChange = (val) => {
  console.log(val);
};
</script>
