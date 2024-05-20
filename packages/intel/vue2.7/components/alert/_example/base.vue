<template>
  <t-space style="width: 100%" direction="vertical">
    <t-alert theme="info" :message="infoMessage" />
    <t-alert theme="success" message="这是一条成功的消息提示" />
    <t-alert theme="warning">
      <template #message> 这是一条警示信息 </template>
    </t-alert>
    <t-alert theme="error"> 这是一条失败信息提示 </t-alert>
  </t-space>
</template>
<script lang="jsx">
export default {
  data() {
    return {
      infoMessage: () => <div>这是一条普通的消息提示</div>,
    };
  },
};
</script>
