<template>
  <t-transfer :data="list" :operation="['移除', '加入']" class="tdesign-transfer-custom">
    <template #title="props">
      <div>{{ props.type === 'target' ? '目标' : '来源' }}</div>
    </template>
    <template #footer="props">
      <div style="padding: 12px; border-top: 1px solid #e7e7e7">
        <span v-if="props.type === 'source'">选中并加入</span>
        <span v-else>选中并移除</span>
      </div>
    </template>
  </t-transfer>
</template>
<script lang="ts" setup>
import { TransferProps } from 'tdesign-vue-next';
const list: TransferProps['data'] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}
</script>
<style>
.tdesign-transfer-custom .t-button .t-icon {
  display: none;
}
.tdesign-transfer-custom .t-icon + .t-button__text:not(:empty) {
  margin-left: 0;
}
</style>
