<template>
  <div>
    <div style="margin: 16px;">
      <ul>
        <li>单元格默认使用 row[colKey] 渲染数据内容，自定义单元格有以下 3 种方式</li>
        <li>1) 使用 cell 作为渲染函数，函数参数为：cell(h, {col, colIndex, row, rowIndex})</li>
        <li>2) 插槽，使用 cell 的值作为插槽名称；如果 cell 值为空，则默认取 colKey 作为插槽名称</li>
        <li>3)【不推荐使用】使用 render 渲染函数，函数参数为：render(h, {col, colIndex, row, rowIndex, type})，单元格的 type 值为 cell，标题的 type 值为 title</li>
      </ul><br>
    </div>
    <t-table :data="data" :columns="columns" rowKey="property">

      <!-- 插槽方式 自定义单元格：cell 的值为插槽名称，参数有：{col, colIndex, row, rowIndex}  -->
      <template #type-slot-name="{ col, row }">
        {{ row[col.colKey] }}
      </template>

      <!-- 插槽方式 自定义单元格， colKey 的值默认为插槽名称  -->
      <template #platform="{ row }">
        <t-icon-attach /><a href="#" class="link">{{ row.platform }}</a>（插槽自定义单元格）
      </template>

    </t-table>
  </div>
</template>
<script lang="jsx">
import TIconAttach from '@tencent/tdesign-vue-next/lib/icon/attach';

export default {
  components: {
    TIconAttach,
  },
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
          needed: 'N',
          description: '指定rowkey',
        },
      ],
      columns: [
        {
          colKey: 'type',
          title: '类型',
          // type-slot-name 会被用于自定义单元格的插槽名称
          cell: 'type-slot-name',
          // scopedSlots: {
          //   col: 'type-slot-name',
          // },
          width: 80,
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
      ],
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
