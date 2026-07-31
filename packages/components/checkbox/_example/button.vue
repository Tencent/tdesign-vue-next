<template>
  <t-space direction="vertical">
    <p>选中值: {{ value.join('、') }}</p>
    <t-checkbox-group v-model="value" variant="outline">
      <t-checkbox value="view">查看数据</t-checkbox>
      <t-checkbox value="edit">编辑数据</t-checkbox>
      <t-checkbox value="export">导出数据</t-checkbox>
      <t-checkbox value="approve" disabled>审批权限（禁用）</t-checkbox>
    </t-checkbox-group>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(['view', 'edit']);
</script>
