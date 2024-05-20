<template>
  <div>
    <t-drawer
      v-model:visible="visible"
      :show-overlay="false"
      header="抽屉标题"
      :on-confirm="handleClose"
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

const handleClick = () => {
  visible.value = true;
};
const handleClose = () => {
  visible.value = false;
};
</script>
