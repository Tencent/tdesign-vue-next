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

<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerProps, ButtonProps } from 'tdesign-vue-next';
const visible = ref(false);
const handleClick: ButtonProps['onClick'] = () => {
  visible.value = true;
};
const handleClose: DrawerProps['onClose'] = () => {
  visible.value = false;
};
</script>
