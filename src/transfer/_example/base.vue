<template>
  <t-transfer
    v-model="targetValue"
    :data="list"
    :checked="checked"
    @change="onChange"
    @checked-change="handleCheckedChange"
  />
</template>
<script setup lang="ts">
import { CheckedOptions, TransferValue } from 'tdesign-vue-next/es/transfer/type';
import { ref } from 'vue';

type List = { value: string; label: string; disabled: boolean };

const list: List[] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}

const targetValue = ref([]);
const checked = ref<TransferValue[]>(['2']);

const handleCheckedChange = (val: CheckedOptions) => {
  console.log('handleCheckedChange', {
    checked: val.checked,
    sourceChecked: val.sourceChecked,
    targetChecked: val.targetChecked,
    type: val.type,
  });
  checked.value = val.checked;
};

const onChange = (newTargetValue: Array<TransferValue>) => {
  console.log('newTargetValue', newTargetValue);
};
</script>
