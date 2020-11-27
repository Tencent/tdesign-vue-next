<template>
  <t-transfer
    theme="primary"
    :data="list"
    v-model="targetValue"
    :checked-value="checkedValue"
    :pagination="pagination"
    :disabled="true"
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
  });
}
export default {
  data() {
    return {
      list,
      targetValue: [],
      checkedValue: [],
      pagination: [{
        pageSize: 10,
        total: 20,
        current: 1,
      },
      {
        pageSize: 10,
        total: 0,
        current: 1,
      },
      ],
    };
  },
};
</script>
