<template>
  <t-space>
    <t-button theme="primary" @click="showDialog">plugin打开多个dialog</t-button>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DialogEventSource, DialogPlugin } from 'tdesign-vue-next';

const count = ref(0);
const showDialog = () => {
  count.value += 1;
  const confirmDia = DialogPlugin.confirm({
    header: 'use ESC to close each dialog',
    body: `current dialog count: ${count.value}`,
    confirmBtn: 'more dialog',
    cancelBtn: 'cancel',
    onConfirm: ({ e }) => {
      console.log(e);
      showDialog();
    },
    onClose: ({ e, trigger }: { e: MouseEvent | KeyboardEvent; trigger: DialogEventSource }) => {
      console.log('e: ', e);
      console.log('trigger: ', trigger);
      count.value -= 1;
      confirmDia.hide();
    },
  });
};
</script>
