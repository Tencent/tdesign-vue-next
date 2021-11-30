<template>
  <div class="t-demo-iconfont">
    <div class="t-demo-row">
      <t-icon name="loading" style="color: #999999" />
      <t-icon name="close" @click="onIconClose" />
      <t-icon name="check-circle-filled" />
    </div>
    <br />
    <div class="t-demo-row">
      <t-icon name="check-circle-filled" size="small" />
      <t-icon name="check-circle-filled" />
      <t-icon name="check-circle-filled" size="medium" />
      <t-icon name="check-circle-filled" size="large" />
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
import TIcon from 'tdesign-vue-next/icon';

export default {
  components: { TIcon },
  methods: {
    onIconClose() {
      console.log('icon was clicked.');
    },
  },
};
</script>

<style lang="less">
.t-demo-iconfont {
  .t-icon {
    margin-right: 24px;
  }
}
</style>
