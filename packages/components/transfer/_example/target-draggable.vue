<template>
  <div>
    <t-transfer
      v-model="targetValue"
      :data="data"
      :target-draggable="true"
      target-sort="push"
      @change="onChange"
      @checked-change="handleCheckedChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TransferProps } from 'tdesign-vue-next';
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `content${i + 1}`,
    disabled: i % 4 < 1,
  });
}
const data = ref<TransferProps['data']>(list);
const targetValue = ref([]);
const handleCheckedChange: TransferProps['onCheckedChange'] = ({ checked, sourceChecked, targetChecked, type }) => {
  console.log('handleCheckedChange', {
    checked,
    sourceChecked,
    targetChecked,
    type,
  });
};
const onChange: TransferProps['onChange'] = (newTargetValue) => {
  console.log(newTargetValue);
};
</script>
