<template>
  <div>
    <t-pagination
      v-model="current"
      :total="36"
      :page-size.sync="pageSize"
      @current-change="onCurrentChange"
      @page-size-change="onPageSizeChange"
      @change="onChange"
    />
    <br /><br />
    <!-- :pageSizeOptions="[]" 表示隐藏分页器选项 -->
    <!-- 非受控用法，代码有效，勿删。 -->
    <t-pagination
      showFirstAndLastPageBtn
      :total="36"
      :default-current="2"
      :default-page-size="10"
      @current-change="onCurrentChange"
      @page-size-change="onPageSizeChange"
      @change="onChange"
    />
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
  methods: {
    onPageSizeChange(size, pageInfo) {
      console.log('Page Size:', this.pageSize, size, pageInfo);
    },
    onCurrentChange(current, pageInfo) {
      console.log('Current Page', this.current, current, pageInfo);
    },
    onChange(pageInfo) {
      console.log('Page Info: ', pageInfo);
    },
  },
};
</script>
