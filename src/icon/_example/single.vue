<template>
  <t-space direction="vertical">
    <t-space break-line align="center">
      <loading-icon />
      <close-icon @click="onIconClose" />
      <check-circle-filled-icon />
    </t-space>
    <t-space break-line align="center">
      <check-circle-filled-icon size="small" />
      <check-circle-filled-icon />
      <check-circle-filled-icon size="medium" />
      <check-circle-filled-icon size="large" />
      <check-circle-filled-icon size="25px" />
      <check-circle-filled-icon size="2em" />
    </t-space>
    <t-space break-line align="center">
      <check-circle-filled-icon style="color: red" />
      <check-circle-filled-icon style="color: green" />
      <check-circle-filled-icon style="color: orange" />
    </t-space>
  </t-space>
</template>
<script setup>
import { LoadingIcon, CloseIcon, CheckCircleFilledIcon } from 'tdesign-icons-vue-next';

const onIconClose = () => {
  console.log('icon was clicked.');
};
</script>
