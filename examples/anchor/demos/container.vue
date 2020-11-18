<template>
  <div :id="`${path}#container`" class="anchor-demo anchor-container-demo">
    <t-anchor :id="`${path}#default`" container="anchor-container">
      <t-anchor-item :href="`#${path}#content-1`" title="content-1"> </t-anchor-item>
      <t-anchor-item :href="`#${path}#content-2`" title="content-2"> </t-anchor-item>
      <t-anchor-item :href="`#${path}#content-3`" title="content-3"></t-anchor-item>
      <t-anchor-item :href="`#${path}#content-4`" title="content-4"></t-anchor-item>
    </t-anchor>
    <div id="anchor-container">
      <div :id="`${path}#content-1`" class="anchor-content-1">anchor-content-1</div>
      <div :id="`${path}#content-2`" class="anchor-content-2">anchor-content-2</div>
      <div :id="`${path}#content-3`" class="anchor-content-3">anchor-content-3</div>
      <div :id="`${path}#content-4`" class="anchor-content-4">anchor-content-4</div>
      <div :id="`${path}#content-5`" class="anchor-content-5">anchor-content-5</div>
    </div>
  </div>
</template>
<script>

export default {
  computed: {
    path() {
      return this.$route.path;
    },
  },
};

</script>
<style lang='less'>
@import '../../../common/style/web/_variables.less';
.anchor-container-demo {
  display: flex;
}
#anchor-container {
  flex-grow: 1;
  height: 200px;
  overflow: auto;
  > div {
    text-align: center;
    font-size: 22px;
    line-height: 100px;
  }
  .anchor-content-1 {
    background: @primary-color-1;
  }
  .anchor-content-2 {
    background: @primary-color-2;
  }
  .anchor-content-3 {
    background: @primary-color-3;
  }
  .anchor-content-4 {
    background: @primary-color-4;
  }
  .anchor-content-5 {
    background: @primary-color-5;
  }
}
</style>
