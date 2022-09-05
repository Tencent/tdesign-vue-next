<template>
  <t-space direction="vertical">
    <t-space break-line>
      <icon name="loading" style="color: #999999" />
      <icon name="close" @click="onIconClose" />
      <icon name="check-circle-filled" />
    </t-space>
    <t-space break-line align="center">
      <icon name="check-circle-filled" size="small" />
      <icon name="check-circle-filled" />
      <icon name="check-circle-filled" size="medium" />
      <icon name="check-circle-filled" size="large" />
      <icon name="check-circle-filled" size="25px" />
      <icon name="check-circle-filled" size="2em" />
    </t-space>
    <t-space break-line>
      <icon name="check-circle-filled" style="color: red" />
      <icon name="check-circle-filled" style="color: green" />
      <icon name="check-circle-filled" style="color: orange" />
    </t-space>
  </t-space>
</template>
<script setup>
import { Icon } from 'tdesign-icons-vue-next';

const onIconClose = () => {
  console.log('icon was clicked.');
};
</script>
