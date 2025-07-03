<template>
  <t-space style="width: 100%">
    <t-alert theme="info" title="这是一条普通的消息提示" message="这是与普通的消息提示相关的文字辅助说明" close-btn>
      <template #operation>
        <span @click="handleOperation">相关操作</span>
      </template>
    </t-alert>
  </t-space>
</template>
<script lang="tsx" setup>
const handleOperation = () => {
  alert('operation clicked');
};
</script>
