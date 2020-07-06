<template>
  <div class="tdesign-demo-block">
    <t-alert theme="success" message="这是一条成功的消息提示" />
    <t-alert theme="info" :message="infoMessage" />
    <t-alert theme="warning">
      <template #message>
        这是一条警示信息
      </template>
    </t-alert>
    <t-alert theme="error">
      高危操作/出错信息提示
    </t-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoMessage: () => (
        <div>这是一条普通的消息提示</div>
      ),
    };
  },
};
</script>
