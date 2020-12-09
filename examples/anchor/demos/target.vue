<template>
  <div :id="`${path}#anchor-target`" class='anchor-demo'>
    <t-anchor-target :id="`${path}#anchor-target-1`" tag="h1">定义</t-anchor-target>
    <t-anchor-target :id="`${path}#anchor-target-2`" tag="h2">服务功能</t-anchor-target>
    <t-anchor-target :id="`${path}#anchor-target-3`" tag="h3">使用指南</t-anchor-target>
    <t-anchor-target :id="`${path}#anchor-target-4`" tag="h3">创建签名</t-anchor-target>
    <t-anchor-target :id="`${path}#anchor-target-5`" tag="h3">创建内容</t-anchor-target>
    <t-anchor-target :id="`${path}#anchor-target-6`" tag="h3">保密协议</t-anchor-target>
    <t-anchor-target :id="`${path}#anchor-target-7`" tag="h3">其他</t-anchor-target>
  </div>
</template>

<script>
import { get } from 'lodash';
export default {
  computed: {
    path() {
      return get(this, '$route.path', '');
    },
  },
};
</script>
