<template>
  <div class="tdesign-demo-block">
    <t-alert
      theme="success"
      message="这是一条成功的消息提示"
      close
    />
    <t-alert
      theme="info"
      message="这是一条普通的消息提示"
      close="知道了"
      :before-close="beforeClose"
    />
    <t-alert
      theme="warning"
      message="这是一条警示信息"
      :close="warningClose"
      @closed="handleClosed"
    />
    <t-alert theme="error" message="高危操作/出错信息提示">
      <template v-slot:close>
        Slot Close
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
    beforeClose() {
      return window.confirm('确认关闭吗？');
    },
    handleClosed() {
      alert('closed');
    },
  },
};
</script>
