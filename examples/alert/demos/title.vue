<template>
  <div class="tdesign-demo-block">
    <t-alert
      theme="success"
      title="这是一条成功的消息提示"
      message="这是一条普通的消息提示描述，这是一条普通的消息提示描述，这是一条普通的消息提示描述，这是一条普通的消息提示描述，"
      icon
      close
    >
      <template #operation>
        <span @click="handleOperation">相关操作</span>
      </template>
    </t-alert>
    <t-alert
      theme="info"
      title="这是一条普通的消息提示"
      message="这是一条普通的消息提示这是一条普通的消息提示这是一条普通的消息提示这是一条普通的消息提示"
      icon
      close
    >
      <template #operation>
        <span @click="handleOperation">相关操作</span>
      </template>
    </t-alert>
    <t-alert
      theme="warning"
      title="这是一条警示信息"
      message="这是一条警示信息这是一条警示信息这是一条警示信息这是一条警示信息"
      icon
      close
    >
      <template #operation>
        <span @click="handleOperation">相关操作</span>
      </template>
    </t-alert>
    <t-alert
      theme="error"
      title="高危操作/出错信息提示"
      message="高危操作/出错信息提示高危操作/出错信息提示高危操作/出错信息提示高危操作/出错信息提示"
      icon
      close
    >
      <template #operation>
        <span @click="handleOperation">相关操作</span>
      </template>
    </t-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      warningClose: () => 'FunctionPropClose',
    };
  },
  methods: {
    handleOperation() {
      alert('operation clicked');
    },
  },
};
</script>
