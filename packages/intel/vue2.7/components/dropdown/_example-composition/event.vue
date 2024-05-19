<template>
  <div>
    <t-dropdown :options="options" :minColumnWidth="88">
      <t-button variant="text">下拉菜单</t-button>
    </t-dropdown>
  </div>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { ref } from 'vue';

const options = ref([
  {
    content: '操作一',
    value: 1,
    onClick: () => MessagePlugin.success('操作一'),
  },
  {
    content: '操作二',
    value: 2,
    onClick: () => MessagePlugin.success('操作二'),
  },
  {
    content: '操作三',
    value: 3,
    onClick: () => MessagePlugin.success('操作三'),
  },
  {
    content: '操作四',
    value: 4,
    onClick: () => MessagePlugin.success('操作四'),
  },
]);
</script>
