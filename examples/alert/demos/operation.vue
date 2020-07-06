<template>
  <div class="tdesign-demo-block">
    <t-alert theme="success" message="这是一条成功的消息提示" close>
      <template #operation>
        <span @click="handleOperation">相关操作</span>
      </template>
    </t-alert>
    <t-alert theme="info" message="这是一条普通的消息提示" close>
      <template #operation>
        <span @click="handleOperation">相关操作</span>
      </template>
    </t-alert>
    <t-alert theme="warning" message="这是一条警示信息" close>
      <template #operation>
        <span @click="handleOperation">相关操作</span>
      </template>
    </t-alert>
    <t-alert theme="error" message="高危操作/出错信息提示" close>
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
