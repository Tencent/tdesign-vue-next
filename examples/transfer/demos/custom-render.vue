<template>
  <div>
    <t-transfer
      theme="primary"
      :data="list"
      v-model="targetValue"
      :checked-value="checkedValue"
      :transfer-item="transferItem"
    >
    </t-transfer>
  </div>
</template>

<script lang="jsx">
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
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
    transferItem(h, { data, index, type }) {
      const sourceLabel = (
        <span class="transfer-item">
          {data.label} - {data.description}
        </span>
      );
      const targetLabel = (
        <span class="transfer-item">
          {index} - {data.label}
        </span>
      );
      return type === 'source' ? sourceLabel : targetLabel;
    },
  },
};
</script>
