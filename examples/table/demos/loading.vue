<template>
  <div>
    <div style="margin-bottom: 10px;">设置 loading 为字符串时，可以自定义数据加载时的显示文案。</div>
    <t-table
      :data="data"
      :columns="columns"
      :rowKey="rowKey"
      :size="size"
      :loading="loading">
    </t-table>
    <div style="margin-bottom: 10px;">设置 loading 为对象时，可以通过设置 customRender，来自定义数据加载时的 DOM 结构。</div>
    <t-table
      :data="data"
      :columns="columns"
      :rowKey="rowKey"
      :size="size"
      :loading="customLoading">
      <div slot='loading' :style="style">
        loading....🌹
      </div>
    </t-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'row',
          ellipsis: true,
          colKey: 'type',
          title: '类型',
        },
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'test',
          ellipsis: true,
          colKey: 'platform',
          title: '平台',
        },
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'test2',
          ellipsis: true,
          colKey: 'property',
          title: '属性',
        },
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'test4',
          ellipsis: true,
          colKey: 'default',
          title: '默认值',
        },
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'test3',
          ellipsis: true,
          colKey: 'needed',
          title: '是否必传',
        },
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'row',
          ellipsis: true,
          colKey: 'description',
          title: '说明',
        },
      ],
      rowKey: 'property',
      size: 'small',
      loading: true,
      customLoading: {
        customRender: 'loading',
      },
      style: {
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
  },
};
</script>
