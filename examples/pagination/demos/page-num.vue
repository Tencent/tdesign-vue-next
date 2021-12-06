<template>
  <div>
    <t-pagination
      v-model="current"
      v-model:pageSize="pageSize"
      :total="645"
      show-sizer
      :page-size-options="pageSizeOptions"
      @change="onChange"
      @pageSizeChange="onPageSizeChange"
      @currentChange="onCurrentChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const pageSizeOptions = [
  { label: '每页 10 条', value: 10 },
  { label: '每页 30 条', value: 30 },
  { label: '每页 100 条', value: 100 },
  { label: '每页 50 条', value: 50 },
];

export default defineComponent({
  setup() {
    const current = ref(1);
    const pageSize = ref(30);

    const onPageSizeChange = (size) => {
      console.log('page-size:', size);
      MessagePlugin.success(`pageSize变化为${size}`);
    };

    const onCurrentChange = (index, pageInfo) => {
      MessagePlugin.success(`转到第${index}页`);
      console.log(pageInfo);
    };

    const onChange = (pageInfo) => {
      console.log(pageInfo);
    };

    return {
      current,
      pageSize,
      onPageSizeChange,
      onCurrentChange,
      onChange,
      pageSizeOptions,
    };
  },
});
</script>
