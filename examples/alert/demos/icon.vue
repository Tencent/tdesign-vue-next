<template>
  <div class="tdesign-demo-block">
    <t-alert theme="success" icon message="这是一条成功的消息提示" />
    <t-alert theme="info" icon message="这是一条普通的消息提示" />
    <t-alert theme="warning" :icon="warningIcon" message="这是一条警示信息" />
    <t-alert theme="error" message="高危操作/出错信息提示">
      <template #icon>
        <t-icon name="warning_fill" />
      </template>
    </t-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      warningIcon: () => (
        <t-icon name="warning_fill" />
      ),
    };
  },
};
</script>
