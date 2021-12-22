<template>
  <div>
    <t-table :data="data" :columns="columns" row-key="property">
      <!-- 插槽方式 自定义单元格：cell 的值为插槽名称，参数有：{col, colIndex, row, rowIndex}  -->
      <template #type-slot-name="{ col, row }">
        {{ row[col.colKey] }}
      </template>

      <!-- 插槽方式 自定义单元格， colKey 的值默认为插槽名称  -->
      <template #platform="{ row }">
        <attach-icon /><a href="#" class="link">{{ row.platform }}</a
        >（插槽自定义单元格）
      </template>
    </t-table>
  </div>
</template>
<script lang="jsx">
import { defineComponent } from 'vue';
import { AttachIcon } from 'tdesign-icons-vue-next';

const data = [
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
    needed: 'N',
    description: '指定rowkey',
  },
];

const columns = [
  {
    colKey: 'type',
    title: '类型',
    // type-slot-name 会被用于自定义单元格的插槽名称
    cell: 'type-slot-name',
    width: 100,
  },
  {
    // 没有 cell 的情况下， platform 会被用作自定义单元格的插槽名称
    colKey: 'platform',
    title: '平台',
    width: 236,
  },
  {
    colKey: 'property',
    title: '属性名',
    cell: (h, { col, row }) => <div>使用 cell 方法自定义单元格：{row[col.colKey]}</div>,
    width: 290,
  },
  {
    colKey: 'description',
    // render 即可渲染表头，也可以渲染单元格。但 cell 只能渲染单元格，title 只能渲染表头
    render(h, context) {
      const { type, rowIndex, colIndex } = context;
      if (type === 'title') return 'render';
      return `render 方法渲染单元格: ${rowIndex}-${colIndex}`;
    },
    width: 235,
  },
];

export default defineComponent({
  components: {
    AttachIcon,
  },
  setup() {
    return {
      data,
      columns,
    };
  },
});
</script>
<style scoped>
.link {
  color: #0052d9;
  text-decoration: none;
}
</style>
