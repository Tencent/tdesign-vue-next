<template>
  <div>
    <t-tooltip :onVisibleChange="onVisibleChange">
      <t-button variant="outline">带箭头文字提示</t-button>
      <div slot="content">这是自定义的带箭头文字内容</div>
    </t-tooltip>
  </div>
</template>
<script>
export default {
  methods: {
    onVisibleChange(val) {
      console.log('visible change triggered: ', val);
    },
  },
};
</script>
