<template>
  <div>
    <t-dropdown
      :options="options"
      placement="top-left"
      trigger="click"
      :hideAfterItemClick="false"
      :minColumnWidth="100"
    >
      <t-button variant="text">下拉菜单</t-button>
    </t-dropdown>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const options = ref([
  {
    content: '操作一',
    value: 1,
  },
  {
    content: '操作二',
    value: 2,
    children: [
      {
        content: '操作五',
        value: 5,
      },
      {
        content: '操作六',
        value: 6,
      },
    ],
  },
  {
    content: '操作三',
    value: 3,
  },
  {
    content: '操作四',
    value: 4,
  },
]);
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
