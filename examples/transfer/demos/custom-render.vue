<template>
  <div>
    <t-transfer
      v-model="targetValue"
      theme="primary"
      :data="list"
      :checked-value="checkedValue"
      :transfer-item="transferItem"
    />
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    description: `第${i + 1}段信息`,
  });
}

export default defineComponent({
  setup() {
    const targetValue = ref([]);
    const checkedValue = ref([]);

    const transferItem = (h, { data, index, type }) => {
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
    };

    return {
      targetValue,
      checkedValue,
      list,
      transferItem,
    };
  },
});
</script>
