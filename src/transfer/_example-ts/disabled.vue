<template>
  <t-transfer :data="list" :disabled="[false, true]" :default-value="defaultValue" />
</template>
<script lang="ts" setup>
import { TransferProps } from 'tdesign-vue-next';
const list: TransferProps['data'] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i,
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
const defaultValue: TransferProps['defaultValue'] = list
  .map((item) => item.value)
  .filter((v) => parseInt(v, 10) % 2 === 0);
</script>
