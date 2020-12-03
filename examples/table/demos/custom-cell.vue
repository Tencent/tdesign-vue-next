<template>
  <div>
    <div style="margin-bottom: 10px;">
      columns 中通过定义 scopedSlots 或者 render 方法来实现自定义单元格的渲染。
      其中 key 值为 'title' 时，代表通过插槽的方式自定义表头。其中 key 值为 'customRender' 时，代表通过插槽的方式自定义内容部分的单元格。</div>
    <t-table
      :data="data"
      :columns="columns"
      :rowKey="rowKey"
      :border="border"
      :hover="hover"
      :stripe="stripe"
      :size="size">
      <!-- 自定义表头 支持 slot -->
      <span slot='type'>
        <t-icon name="view-module"/>类型
      </span>
      <!-- 自定义单元格 支持 slot -->
      <span slot='platform' slot-scope='{record}'>
        <t-icon name="attach"/><a href="#" class="link">{{ record.platform }}</a>
      </span>
    </t-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          platform: '公有',
          property: 'data',
          type: 'any[]',
          default: '[]',
          needed: 'Y',
          description: '数据源',
        },
        {
          platform: '公有',
          property: 'rowkey',
          type: 'String',
          default: '-1',
          needed: 'Y',
          description: '指定rowkey',
        },
      ],
      columns: [
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'row',
          ellipsis: true,
          colKey: 'type',
          scopedSlots: {
            title: 'type',
          },
        },
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'test',
          ellipsis: true,
          colKey: 'platform',
          title: '平台',
          scopedSlots: {
            customRender: 'platform',
          },
        },
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'test2',
          ellipsis: true,
          colKey: 'property',
          title: '属性名',
          render({ index, record }) {
            return `${index}: ${record.property}`;
          },
        },
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'test4',
          ellipsis: true,
          colKey: 'default',
          title() {
            return '默认值';
          },
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
      border: true,
      hover: true,
      stripe: true,
      height: 100,
    };
  },
};
</script>
<style scoped>
.link {
  color: #0052d9;
  text-decoration: none;
}
</style>
