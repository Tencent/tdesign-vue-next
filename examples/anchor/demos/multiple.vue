<template>
  <div :id="`${path}#multiple`" class='anchor-demo'>
    <t-anchor :bounds="100" :targetOffset="200">
      <t-anchor-item :href="`#${path}#default`" title="定义"></t-anchor-item>
      <t-anchor-item :href="`#${path}#multiple`" title="服务功能"></t-anchor-item>
      <t-anchor-item :href="`#${path}#small`" title="使用指南">
        <t-anchor-item :href="`#${path}#large`" title="创建签名"></t-anchor-item>
        <t-anchor-item :href="`#${path}#container`" title="创建内容"></t-anchor-item>
      </t-anchor-item>
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
