<template>
  <t-transfer
    theme="primary"
    :data="list"
    v-model="targetValue"
    :checked-value="checkedValue"
    :renderItem="renderItem"
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
    };
  },
  methods: {
    renderItem({ transferItem, direction, index }) {
      const sourceLabel = (
              <span class="transfer-item">
              {transferItem.title} - {transferItem.description}
              </span>
      );
      const targetLabel = (
              <span class="transfer-item">
              {index} - {transferItem.title}
              </span>
      );
      return {
        title: direction === 'source' ? sourceLabel : targetLabel, // for displayed item
        value: transferItem.title, // for title and filter matching
      };
    },
  },
};
</script>
