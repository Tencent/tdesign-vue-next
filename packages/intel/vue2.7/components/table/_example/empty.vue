<template>
  <div class="tdesign-demo-block-column-large">
    <!-- 默认空内容 -->
    <t-table :data="[]" :columns="columns" :rowKey="rowKey"></t-table>

    <!-- 使用插槽自定义的空内容 -->

    <t-table :data="[]" :columns="columns" :rowKey="rowKey">
      <template #empty>
        <span>😊 使用插槽自定义的空内容 😊</span>
      </template>
    </t-table>

    <!-- 使用渲染函数自定义的空内容 -->
    <t-table :data="[]" :columns="columns" :empty="empty" :rowKey="rowKey"></t-table>
  </div>
</template>
<script lang="jsx">
export default {
  data() {
    return {
      columns: [
        {
          colKey: 'type',
          title: '类型',
        },
        {
          colKey: 'platform',
          title: '平台',
        },
        {
          colKey: 'property',
          title: '属性',
        },
        {
          colKey: 'default',
          title: '默认值',
        },
        {
          colKey: 'needed',
          title: '是否必传',
        },
        {
          colKey: 'description',
          title: '说明',
        },
      ],
      rowKey: 'property',
      empty: () => <span>😊 使用渲染函数自定义的空内容 😊</span>,
    };
  },
};
</script>
