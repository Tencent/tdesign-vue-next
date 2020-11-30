<template>
  <div :id="`${path}#default`" class='anchor-demo'>
    <t-anchor>
      <t-anchor-item :href="`#${path}#default`" title="默认"></t-anchor-item>
      <t-anchor-item :href="`#${path}#bounds`" title="滚动区域判断"></t-anchor-item>
      <t-anchor-item :href="`#${path}#container`" title="自定义滚动区"></t-anchor-item>
      <t-anchor-item :href="`#${path}#anchor-target`" title="联动anchor-target">
        <t-anchor-item :href="`#${path}#anchor-target-1`" title="创建签名"></t-anchor-item>
        <t-anchor-item :href="`#${path}#anchor-target-2`" title="创建内容的正式模板并保存"></t-anchor-item>
        <t-anchor-item :href="`#${path}#anchor-target-3`" title="为什么账户有余额, 但是发送短信返回1031错误码, 超过会省略省略省略省略?"></t-anchor-item>
      </t-anchor-item>
    </t-anchor>
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
