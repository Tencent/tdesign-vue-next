<template>
  <div class="t-demo-iconfont">
    <t-icon name="bulletpoint" />
    <t-icon name="browse-20" />
    <t-icon name="close-fill" />
    <t-icon name="close" />
    <t-icon name="discount" />
    <t-icon name="help-fill" />
    <t-icon name="more" />
    <t-icon name="not-visible-20" />
    <t-icon name="loading" />
    <t-icon name="search" />
    <t-icon name="prompt-fill" />
    <t-icon name="success-fill" />
    <t-icon name="warning-fill" />
    <t-icon name="arrow-dowm" />
    <t-icon name="arrow-left" />
    <t-icon name="arrow-right" />
    <t-icon name="success-2" />
  </div>
</template>

<script>
import TIcon from '@/src/icon/iconfont';
export default {
  components: { TIcon },
};
</script>

<style lang="less">
  .t-demo-iconfont {
    .t-icon {
      margin-right: 24px;
    }
  }
</style>
