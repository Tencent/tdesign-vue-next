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
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);

    return {
      visible,
      close() {
        console.error('===close');
        visible.value = false;
      },
      onConfirm() {
        console.log('click确定');
      },
    };
  },
});
</script>
