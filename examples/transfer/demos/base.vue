<template>
  <div>
    <t-transfer
      v-model="targetValue"
      :data="list"
      :checked="checked"
      @change="onChange"
      @checkedChange="handleCheckedChange"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}

export default defineComponent({
  setup() {
    const targetValue = ref([]);
    const checked = ref(['2']);

    const handleCheckedChange = ({ checked: checkedVal, sourceChecked, targetChecked, type }) => {
      console.log('handleCheckedChange', {
        checkedVal,
        sourceChecked,
        targetChecked,
        type,
      });
      checked.value = checkedVal;
    };

    const onChange = (newTargetValue) => {
      console.log('newTargetValue', newTargetValue);
    };

    return {
      list,
      targetValue,
      checked,
      handleCheckedChange,
      onChange,
    };
  },
});
</script>
