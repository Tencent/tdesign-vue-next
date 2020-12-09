<template>
  <div class="t-demo-iconfont">
    <p>使用 Iconfont 图标需要单独引入 Iconfont 图标组件：<code>import TIcon from '@/src/icon/iconfont';</code><br /></p>
    <br />
    <div class="t-demo-row">
      <t-icon name="loading" />
      <t-icon name="close" @click.native="onIconClose" />
      <t-icon name="check-circle-filled" />
    </div>
    <br />
    <div class="t-demo-row">
      <t-icon name="check-circle-filled" size="xs" />
      <t-icon name="check-circle-filled" size="small" />
      <t-icon name="check-circle-filled" />
      <t-icon name="check-circle-filled" size="middle" />
      <t-icon name="check-circle-filled" size="large" />
      <t-icon name="check-circle-filled" size="xl" />
      <t-icon name="check-circle-filled" size="25px" />
      <t-icon name="check-circle-filled" size="2em" />
    </div>
    <br />
    <div class="t-demo-row">
      <t-icon name="check-circle-filled" style="color: red" />
      <t-icon name="check-circle-filled" style="color: green" />
      <t-icon name="check-circle-filled" style="color: orange" />
    </div>
  </div>
</template>

<script>
import TIcon from '@/src/icon/iconfont';
export default {
  components: { TIcon },
  methods: {
    onIconClose() {
      console.log('icon was clicked.');
    },
  },
};
</script>
