<template>
  <div>
    <t-drawer v-model:visible="visible" header="header" :on-confirm="onClickConfirm" :close-btn="true">
      <p>This is a controlled drawer</p>
    </t-drawer>
    <t-button variant="outline" @click="handleClick">打开抽屉</t-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MessagePlugin, DrawerProps, ButtonProps } from 'tdesign-vue-next';
const visible = ref(false);
const handleClick: ButtonProps['onClick'] = () => {
  visible.value = true;
};
const onClickConfirm: DrawerProps['onConfirm'] = () => {
  MessagePlugin.info('数据保存中...', 1000);
  const timer = setTimeout(() => {
    clearTimeout(timer);
    visible.value = false;
    MessagePlugin.info('数据保存成功!');
  }, 1000);
};
</script>
