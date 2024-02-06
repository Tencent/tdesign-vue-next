<template>
  <t-config-provider :global-config="globalConfig">
    <div style="width: 480px">
      <t-dialog header="Title" body="Would you like to be my friends？" mode="normal" theme="default" visible />
      <br />
      <t-dialog header="confirm" body="Would you like to be my friends？" mode="normal" theme="info" visible />
      <br />
      <t-dialog header="confirm" body="Would you like to be my friends？" mode="normal" theme="warning" visible />
      <br />
      <t-dialog header="confirm" body="Would you like to be my friends？" mode="normal" theme="danger" visible />
      <br />
      <t-dialog header="confirm" body="Would you like to be my friends？" mode="normal" theme="success" visible />
    </div>
  </t-config-provider>
</template>

<script lang="ts" setup>
import { GlobalConfigProvider } from 'tdesign-vue-next';
const globalConfig: GlobalConfigProvider = {
  dialog: {
    confirm: 'confirm',
    // cancel: 'cancel',
    cancel: {
      theme: 'default',
      variant: 'outline',
      content: 'cancel',
    },
    confirmBtnTheme: {
      default: 'primary',
      info: 'primary',
      warning: 'warning',
      danger: 'danger',
      success: 'success',
    },
  },
};
</script>
