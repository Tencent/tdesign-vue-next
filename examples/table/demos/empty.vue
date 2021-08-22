<template>
  <div>
    <t-table
      :data="data"
      :columns="columns"
      :rowKey="rowKey"
    ></t-table>
    <br/><br/>
    <t-table
      :data="data"
      :columns="columns"
      :empty="empty"
      :rowKey="rowKey"
    ></t-table>
  </div>
</template>
<script lang="jsx">
export default {
  data() {
    return {
      data: [],
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
      empty: () => (
        <span style="display:flex;align-items:center;justify-content:center;height:100px;color: rgba(0, 0, 0, 0.26)">
          😊 我是自定义的空内容 😊
        </span>
      ),
    };
  },
};
</script>
