<template>
  <div>
    <t-pagination v-model="current" v-model:page-size="pageSize" :total="total" :total-content="renderTotalContent" />
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const current = ref(12);
    const pageSize = ref(10);
    const total = ref(685);
    return {
      current,
      pageSize,
      total,
      renderTotalContent() {
        return <div class="t-pagination__total">{`共 ${total.value.value} 项数据`}</div>;
      },
    };
  },
});
</script>
