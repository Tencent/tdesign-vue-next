<template>
  <div class="t-demo-iconfont">
    <div class="t-demo-row">
      <icon name="loading" style="color: #999999" />
      <icon name="close" @click="onIconClose" />
      <icon name="check-circle-filled" />
    </div>
    <br />
    <div class="t-demo-row">
      <icon name="check-circle-filled" size="small" />
      <icon name="check-circle-filled" />
      <icon name="check-circle-filled" size="medium" />
      <icon name="check-circle-filled" size="large" />
      <icon name="check-circle-filled" size="25px" />
      <icon name="check-circle-filled" size="2em" />
    </div>
    <br />
    <div class="t-demo-row">
      <icon name="check-circle-filled" style="color: red" />
      <icon name="check-circle-filled" style="color: green" />
      <icon name="check-circle-filled" style="color: orange" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'tdesign-icons-vue-next';

export default {
  components: {
    Icon,
  },
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
