<template>
  <div class="tdesign-demo-block-column">
    <t-table :data="data" :columns="columns" :rowKey="rowKey" :size="size" :loading="true"></t-table>

    <!-- loading-props 用于透传全部加载组件特性，以便实现更多自定义内容-->
    <!-- loadingProps.indicator=false 隐藏加载图标 -->
    <t-table
      :data="[]"
      :columns="columns"
      :rowKey="rowKey"
      :size="size"
      :loading="true"
      :loading-props="{ indicator: false }"
    >
      <div slot="loading" class="t-table--loading-message">😊 这里使用插槽自定义加载状态 😊</div>
    </t-table>

    <!-- loadingProps.indicator=false 隐藏加载图标 -->
    <t-table :data="[]" :columns="columns" :rowKey="rowKey" :size="size" :loading="renderLoading"></t-table>
  </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const data = ref([]);
const columns = ref([
  {
    align: 'left',
    width: '100',
    className: 'row',
    ellipsis: true,
    colKey: 'type',
    title: '类型',
  },
  {
    align: 'left',
    width: '100',
    className: 'test',
    ellipsis: true,
    colKey: 'platform',
    title: '平台',
  },
  {
    align: 'left',
    width: '100',
    className: 'test2',
    ellipsis: true,
    colKey: 'property',
    title: '属性',
  },
  {
    align: 'left',
    width: '100',
    className: 'test4',
    ellipsis: true,
    colKey: 'default',
    title: '默认值',
  },
  {
    align: 'left',
    width: '100',
    className: 'test3',
    ellipsis: true,
    colKey: 'needed',
    title: '是否必传',
  },
  {
    align: 'left',
    width: '100',
    className: 'row',
    ellipsis: true,
    colKey: 'description',
    title: '说明',
  },
]);
const rowKey = ref('property');
const size = ref('small');
// const style = reactive({
//   height: '100px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// });
const renderLoading = () => <div class="t-table--loading-message">这里使用渲染函数定义加载状态</div>;
</script>
