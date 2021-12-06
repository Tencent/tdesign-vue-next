<template>
  <div class="tdesign-demo-block">
    <t-alert theme="info" title="这是一条普通的消息提示" message="这是与普通的消息提示相关的文字辅助说明" close>
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
