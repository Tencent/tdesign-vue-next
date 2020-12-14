<template>
  <div :id="`${path}#offset`" class='anchor-demo'>
    <t-anchor :bounds="100" :targetOffset="200">
      <t-anchor-item :href="`#${path}#default`" title="定义"></t-anchor-item>
      <t-anchor-item :href="`#${path}#nested`" title="服务功能"></t-anchor-item>
      <t-anchor-item :href="`#${path}#offset`" title="使用指南"></t-anchor-item>
      <t-anchor-item :href="`#${path}#anchor-target-4`" title="创建签名"></t-anchor-item>
      <t-anchor-item :href="`#${path}#anchor-target-5`" title="创建内容"></t-anchor-item>
      <t-anchor-item :href="`#${path}#anchor-target-6`" title="保密协议"></t-anchor-item>
      <t-anchor-item :href="`#${path}#anchor-target-7`" title="其他"></t-anchor-item>
    </t-anchor>
  </div>
</template>
<script>
import get from 'lodash/get';
export default {
  computed: {
    path() {
      return get(this, '$route.path', '');
    },
  },
};
</script>
<style lang='less'>
.anchor-demo {
  border: 1px solid transparent;
  padding: 20px;
  margin: -20px;
}
.anchor-demo:target {
  border-color: #1890ff;
}
</style>
