<template>
  <t-transfer
    :data="list"
    v-model="targetValue"
    :checked.sync="checked"
    @change="onChange"
    @checked-change="handleCheckedChange"
  />
</template>
<script setup>
import { ref } from 'vue';

const initialList = [];
for (let i = 0; i < 20; i++) {
  initialList.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
const list = ref(initialList);
const targetValue = ref([]);
const checked = ref(['2']);
const handleCheckedChange = ({
  checked, sourceChecked, targetChecked, type,
}) => {
  console.log('handleCheckedChange', {
    checked,
    sourceChecked,
    targetChecked,
    type,
  });
};
const onChange = (newTargetValue) => {
  console.log(newTargetValue);
};
</script>
