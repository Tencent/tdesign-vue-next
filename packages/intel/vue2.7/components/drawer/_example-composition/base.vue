<template>
  <div>
    <t-drawer :visible.sync="visible" header="抽屉标题" :onConfirm="onClickConfirm" :closeBtn="true">
      <p>抽屉的内容</p>
    </t-drawer>
    <t-button variant="outline" @click="handleClick">打开抽屉</t-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MessagePlugin as Message } from 'tdesign-vue';

const visible = ref(false);
const handleClick = () => {
  visible.value = true;
};
const onClickConfirm = () => {
  Message.info('数据保存中...', 1000);
  const timer = setTimeout(() => {
    clearTimeout(timer);
    visible.value = false;
    Message.info('数据保存成功!');
  }, 1000);
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
