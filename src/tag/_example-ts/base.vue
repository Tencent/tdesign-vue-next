<template>
  <t-space direction="vertical">
    <t-space class="tag-demo">
      <a href="https://www.tencent.com/zh-cn" target="_blank">
        <t-tag>超链接</t-tag>
      </a>
    </t-space>
    <t-space class="tag-demo">
      <t-tag @click="onClick">灰标签</t-tag>
      <t-tag theme="primary">标签一</t-tag>
      <t-tag theme="success">标签二</t-tag>
      <t-tag theme="warning">标签三</t-tag>
      <t-tag theme="danger">标签四</t-tag>
    </t-space>
    <t-space class="tag-demo light">
      <t-tag variant="light">灰标签</t-tag>
      <t-tag theme="primary" variant="light">标签一</t-tag>
      <t-tag theme="success" variant="light">标签二</t-tag>
      <t-tag theme="warning" variant="light">标签三</t-tag>
      <t-tag theme="danger" variant="light">标签四</t-tag>
    </t-space>
    <t-space class="tag-demo">
      <t-tag variant="outline">灰标签</t-tag>
      <t-tag theme="primary" variant="outline">标签一</t-tag>
      <t-tag theme="success" variant="outline">标签二</t-tag>
      <t-tag theme="warning" variant="outline">标签三</t-tag>
      <t-tag theme="danger" variant="outline">标签四</t-tag>
    </t-space>
    <t-space class="tag-demo">
      <t-tag variant="light-outline">灰标签</t-tag>
      <t-tag theme="primary" variant="light-outline">标签一</t-tag>
      <t-tag theme="success" variant="light-outline">标签二</t-tag>
      <t-tag theme="warning" variant="light-outline">标签三</t-tag>
      <t-tag theme="danger" variant="light-outline">标签四</t-tag>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { TagProps } from 'tdesign-vue-next';
const onClick: TagProps['onClick'] = ({ e }) => {
  e.stopPropagation();
};
</script>
