<template>
  <div class="tdesign-demo-block">
    <t-alert theme="info" close :max-line="2">
      <span>这是折叠的第一条消息</span>
      <span>这是折叠的第二条消息</span>
      <span>这是折叠的第三条消息</span>
      <span>这是折叠的第四条消息</span>
      <span>这是折叠的第五条消息</span>
      <span>这是折叠的第六条消息</span>
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
