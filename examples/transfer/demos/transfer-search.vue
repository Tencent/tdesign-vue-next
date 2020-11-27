<template>
  <t-transfer
    theme="primary"
    :data="list"
    v-model="targetValue"
    :checked-value="checkedValue"
    :disabled="true"
    :search="true"
  >
  </t-transfer>
</template>
<script>
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    key: i.toString(),
    title: `内容${i + 1}`,
    description: `第${i + 1}段信息`,
    disabled: i % 3 < 1,
  });
}
export default {
  data() {
    return {
      list,
      targetValue: [],
      checkedValue: [],
    };
  },
};
</script>
