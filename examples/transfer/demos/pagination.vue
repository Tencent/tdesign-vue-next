<template>
  <div>
    <t-transfer
      theme="primary"
      :data="list"
      v-model="targetValue"
      :checked-value="checkedValue"
      :pagination="pagination"
      :onPageChange="handlePageChange"
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
  });
}
export default defineComponent({
  setup() {
    const targetValue = ref([]);
    const checkedValue = ref([]);
    const pagination = ref([
      {
        pageSize: 10,
        defaultCurrent: 1,
      },
      {
        pageSize: 5,
        defaultCurrent: 1,
      },
    ]);

    const handlePageChange = (...args) => {
      console.log('handlePageChange', args);
    }

    return {
      list,
      targetValue,
      checkedValue,
      pagination,
      handlePageChange
    }

  }
});
</script>
