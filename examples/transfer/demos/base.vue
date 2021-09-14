<template>
  <div>
    <t-transfer
      :data="list"
      v-model="targetValue"
      :checked="checked"
      @change="onChange"
      @checkedChange="handleCheckedChange"
    />
  </div>
</template>
<script>
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
export default {
  data() {
    return {
      list,
      targetValue: [],
      checked: [],
    };
  },
  methods: {
    handleCheckedChange({
      checked, sourceChecked, targetChecked, type,
    }) {
      console.log('handleCheckedChange', {
        checked, sourceChecked, targetChecked, type,
      });
      this.checked = checked
    },
    onChange(newTargetValue) {
      console.log('newTargetValue', newTargetValue);
    },
  },
};
</script>
