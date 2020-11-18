<template>
  <div :id="`${path}#anchor-target`" class='anchor-demo'>
    <t-anchor-target :id="`${path}#anchor-target-1`" tag="h1"> 创建签名 </t-anchor-target>
    <t-anchor-target :id="`${path}#anchor-target-2`" tag="h2"> 创建内容的正式模板并保存 </t-anchor-target>
    <t-anchor-target :id="`${path}#anchor-target-3`" tag="h3"> 为什么账户有余额, 但是发送短信返回1031错误码?</t-anchor-target>
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
