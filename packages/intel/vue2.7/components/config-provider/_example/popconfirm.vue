<template>
  <t-config-provider :globalConfig="globalConfig" style="padding: 16px">
    <div class="tdesign-demo-item__config-provider-base">
      <t-popconfirm theme="default" content="Do you want to delete">
        <t-button>Default</t-button>
      </t-popconfirm>
      <t-popconfirm theme="warning" content="Do you want to delete">
        <t-button theme="warning">Warning</t-button>
      </t-popconfirm>
      <t-popconfirm theme="danger" content="Do you want to delete">
        <t-button theme="danger">Danger</t-button>
      </t-popconfirm>

      <t-button theme="primary" @click="drawerVisible = true">Open Drawer</t-button>

      <t-drawer
        :visible.sync="drawerVisible"
        header="Drawer"
        :onConfirm="() => (drawerVisible = false)"
        :closeBtn="true"
      >
        <p>This is a controlled drawer</p>
      </t-drawer>
    </div>
  </t-config-provider>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: false,
      globalConfig: {
        popconfirm: {
          confirmBtnTheme: {
            default: 'primary',
            warning: 'warning',
            danger: 'danger',
          },
          confirm: 'OK',
          cancel: {
            theme: 'default',
            variant: 'outline',
            content: 'Cancel',
          },
        },
        drawer: {
          confirm: 'confirm',
          cancel: 'cancel',
        },
      },
    };
  },
};
</script>

<style scoped>
.tdesign-demo-item__config-provider-base {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.tdesign-demo-item__config-provider-base .t-button {
  margin-right: 36px;
}
</style>
