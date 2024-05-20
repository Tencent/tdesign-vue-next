<template>
  <div>
    <t-drawer
      :visible="visible"
      :showOverlay="false"
      :onConfirm="handleClose"
      :preventScrollThrough="false"
      header="抽屉标题"
      @close="handleClose"
    >
      <p>抽屉的内容</p>
    </t-drawer>

    <t-button variant="outline" @click="handleClick">打开抽屉</t-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const setVisible = (state) => {
  visible.value = state;
};
const handleClick = () => {
  setVisible(true);
};
const handleClose = () => {
  setVisible(false);
};
</script>
