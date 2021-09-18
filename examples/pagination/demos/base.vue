<template>
  <div>
    <t-pagination
      v-model="current"
      :total="100"
      @change="onChange"
      v-model:pageSize="pageSize"
      @pageSizeChange="onPageSizeChange"
      @currentChange="onCurrentChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      pageSize: 5,
    };
  },
  methods: {
    onPageSizeChange(size) {
      console.log('page-size:', size);
    },
    onCurrentChange(index, pageInfo) {
      console.log(`转到第${index}页`);
      console.log(pageInfo);
    },
    onChange(pageInfo) {
      console.log(pageInfo);
    },
  },
};
</script>
