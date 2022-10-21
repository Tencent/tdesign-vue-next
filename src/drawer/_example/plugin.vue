<template>
  <t-space>
    <t-button theme="primary" @click="onDialogPluginConfirm">DialogPlugin.confirm</t-button>
  </t-space>
</template>
<script>
import { defineComponent } from 'vue';
import { DialogPlugin } from 'tdesign-vue-next';

export default defineComponent({
  data() {
    return {
      mydialog: '',
    };
  },
  methods: {
    onDialogPluginConfirm() {
      const confirmDia = DialogPlugin({
        header: 'Dialog-Confirm-Plugin',
        body: 'Are you sure to delete it?',
        confirmBtn: 'ok',
        cancelBtn: 'cancel',
        onConfirm: ({ e }) => {
          console.log('confirm button has been clicked!');
          console.log('e: ', e);
          confirmDia.destroy();
        },
        onClose: ({ e, trigger }) => {
          console.log('e: ', e);
          console.log('trigger: ', trigger);
          confirmDia.destroy();
        },
      });
    },
  },
});
</script>
