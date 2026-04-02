<template>
  <div>
    <t-drawer v-model:visible="visible" header="标题名称" :on-confirm="handleClose" @close="handleClose">
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-space direction="vertical" :size="0" style="width: 100%">
          <span>标签 A</span>
          <t-input />
        </t-space>
        <t-space direction="vertical" :size="0" style="width: 100%">
          <span>标签 B</span>
          <t-input />
        </t-space>
        <t-space direction="vertical" :size="0" style="width: 100%">
          <span>标签 C</span>
          <t-input />
        </t-space>
      </t-space>
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
