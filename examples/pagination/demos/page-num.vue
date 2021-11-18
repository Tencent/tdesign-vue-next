<template>
  <div>
    <t-pagination
      v-model="current"
      v-model:pageSize="pageSize"
      :total="645"
      :page-size-options="[10,20,30,100,200]"
      show-sizer
      @change="onChange"
      @pageSizeChange="onPageSizeChange"
      @currentChange="onCurrentChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

export default defineComponent({
  setup() {
    const current = ref(1);
    const pageSize = ref(20);

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
    };
  },
});
</script>
