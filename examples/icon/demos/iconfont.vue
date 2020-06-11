<template>
  <div class="t-demo-iconfont">
    <p>
      用法几乎同 SVG 一模一样，<a href="http://bkicon.oa.com/resource/project/94/detail" target="_blank">查看全部图标</a>
    </p><br>
    <div class="t-demo-row">
      <t-icon name="success-fill" size="xs"/>
      <t-icon name="success-fill" size="small"/>
      <t-icon name="success-fill" />
      <t-icon name="success-fill" size="middle" />
      <t-icon name="success-fill" size="large" />
      <t-icon name="success-fill" size="xl" />
      <t-icon name="success-fill" size="28px" />
      <t-icon name="success-fill" size="2.5em" />
    </div>
    <div class="t-demo-row">
      <t-icon name="success-fill" style="color: red"/>
      <t-icon name="success-fill" style="color: green"/>
      <t-icon name="success-fill" style="color: orange"/>
    </div>
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
