<template>
  <t-transfer
    v-model="targetValue"
    theme="primary"
    :data="list"
    :checked-value="checkedValue"
    :transfer-item="transferItem"
  />
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TransferProps } from 'tdesign-vue-next';
const list: TransferProps['data'] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    description: `第${i + 1}段信息`,
  });
}
const targetValue = ref([]);
const checkedValue = ref([]);
const transferItem: TransferProps['transferItem'] = (h, { data, index, type }) => {
  const sourceLabel = (
    <span class="transfer-item">
      {data.label} - {data.description}
    </span>
  );
  const targetLabel = (
    <span class="transfer-item">
      {index} - {data.label}
    </span>
  );
  return type === 'source' ? sourceLabel : targetLabel;
};
</script>
