<template>
  <t-space direction="vertical">
    <t-space break-line>
      <icon-font name="loading" />
      <icon-font name="close" @click="onIconClose" />
      <icon-font name="check-circle-filled" />
    </t-space>
    <t-space break-line align="center">
      <icon-font name="check-circle-filled" size="small" />
      <icon-font name="check-circle-filled" />
      <icon-font name="check-circle-filled" size="medium" />
      <icon-font name="check-circle-filled" size="large" />
      <icon-font name="check-circle-filled" size="25px" />
      <icon-font name="check-circle-filled" size="2em" />
    </t-space>
    <t-space break-line align="center">
      <icon-font name="check-circle-filled" style="color: red" />
      <icon-font name="check-circle-filled" style="color: green" />
      <icon-font name="check-circle-filled" style="color: orange" />
    </t-space>
  </t-space>
</template>
<script setup>
import { IconFont } from 'tdesign-icons-vue-next';

const onIconClose = () => {
  console.log('icon was clicked.');
};
</script>
