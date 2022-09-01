<template>
  <div>
    <t-button @click="visible = true"> 异步加载类按钮 </t-button>
    <t-dialog
      v-model:visible="visible"
      header="保存订单"
      body="订单保存中，请稍后"
      :confirm-btn="{
        content: '保存中...',
        theme: 'primary',
        loading: true,
      }"
      :on-confirm="onConfirm"
      :on-close="close"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const visible = ref(false);

const close = () => {
  console.error('===close');
  visible.value = false;
};

const onConfirm = () => {
  console.log('click确定');
};
</script>
