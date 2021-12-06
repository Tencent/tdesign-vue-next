<template>
  <t-config-provider :global-config="globalConfig" style="padding: 16px">
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

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      globalConfig: {
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
      },
    };
  },
});
</script>
<style scoped>
.tdesign-demo-item--locale-provider-base {
  margin: 24px -120px 0 0;
}
</style>
