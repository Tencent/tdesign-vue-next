<template>
  <t-transfer
    v-model="targetValue"
    :data="list"
    :checked="checked"
    @change="onChange"
    @checked-change="handleCheckedChange"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TransferProps } from 'tdesign-vue-next';
const list: TransferProps['data'] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
const targetValue = ref([]);
const checked = ref<TransferProps['checked']>(['2']);
const handleCheckedChange: TransferProps['onCheckedChange'] = ({
  checked: checkedVal,
  sourceChecked,
  targetChecked,
  type,
}) => {
  console.log('handleCheckedChange', {
    checkedVal,
    sourceChecked,
    targetChecked,
    type,
  });
  checked.value = checkedVal;
};
const onChange: TransferProps['onChange'] = (newTargetValue) => {
  console.log('newTargetValue', newTargetValue);
};
</script>
