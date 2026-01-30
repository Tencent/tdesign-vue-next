<template>
  <t-space direction="vertical">
    <t-radio-group v-model="level" variant="default-filled">
      <t-radio-button value="L">L</t-radio-button>
      <t-radio-button value="M">M</t-radio-button>
      <t-radio-button value="Q">Q</t-radio-button>
      <t-radio-button value="H">H</t-radio-button>
    </t-radio-group>
    <t-qrcode :level="level" value="https://tdesign.gtimg.com/site/tdesign-logo.png" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const level = ref('M');
</script>
