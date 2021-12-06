<template>
  <div>
    <t-pagination
      v-model="current"
      v-model:pageSize="pageSize"
      :total="100"
      @change="onChange"
      @pageSizeChange="onPageSizeChange"
      @currentChange="onCurrentChange"
    />
    <br /><br />
    <!-- :pageSizeOptions="[]" 表示隐藏分页器选项 -->
    <!-- 非受控用法，代码有效，勿删。 -->
    <t-pagination
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
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

export default defineComponent({
  setup() {
    const current = ref(1);
    const pageSize = ref(5);

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
