<template>
  <div>
    <t-pagination v-model="current" :total="total" :page-size.sync="pageSize" :totalContent="renderTotalContent" />
  </div>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      current: 12,
      pageSize: 10,
      total: 685,
    };
  },
  methods: {
    renderTotalContent() {
      return <div class="t-pagination__total">{`共 ${this.total} 项数据`}</div>;
    },
  },
};
</script>
