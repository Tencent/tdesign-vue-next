<template>
  <div>
    <t-space direction="vertical" size="large" style="width: 100%">
      <span>展示首尾页码省略</span>
      <t-pagination v-model="current" :total="100" :page-size.sync="pageSize" />
      <span>不展示首尾页码省略</span>
      <t-pagination v-model="current" page-ellipsis-mode="both-ends" :total="100" :page-size.sync="pageSize" />
    </t-space>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 12,
      pageSize: 5,
    };
  },
};
</script>
