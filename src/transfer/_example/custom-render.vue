<template>
  <t-transfer
    v-model="targetValue"
    theme="primary"
    :data="list"
    :checked-value="checkedValue"
    :transfer-item="transferItem"
  />
</template>

<script setup lang="tsx">
import { TransferItem } from 'tdesign-vue-next/es/transfer/type';
import { VNode, ref } from 'vue';

type List = { value: string; label: string; description: string };

const list: List[] = [];

for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    description: `第${i + 1}段信息`,
  });
}

const targetValue = ref([]);
const checkedValue = ref([]);

const transferItem = (h: VNode, val: TransferItem<List>) => {
  const sourceLabel = (
    <span class="transfer-item">
      {val.data.label} - {val.data.description}
    </span>
  );
  const targetLabel = (
    <span class="transfer-item">
      {val.index} - {val.data.label}
    </span>
  );
  return val.type === 'source' ? sourceLabel : targetLabel;
};
</script>
