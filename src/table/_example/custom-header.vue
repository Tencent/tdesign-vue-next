<template>
  <div>
    <t-table :data="data" :columns="columns" row-key="property">
      <!-- 自定义表头，title值为插槽名称  -->
      <template #title-slot-name> <app-icon /> 类型 </template>
    </t-table>
  </div>
</template>
<script setup lang="jsx">
import { AppIcon } from 'tdesign-icons-vue-next';

const data = [
  {
    platform: '标题使用 title 方法自定义',
    property: 'data',
    type: '标题是用插槽自定义',
    default: '[]',
    needed: 'Y',
    description: '数据源',
  },
  {
    platform: '标题使用 title 方法自定义',
    property: 'rowkey',
    type: '插槽名称为 title 的值',
    default: '-1',
    needed: 'N',
    description: '指定rowkey',
  },
];

const columns = [
  {
    colKey: 'type',
    title: 'title-slot-name',
  },
  {
    colKey: 'platform',
    // 使用 title 自定义标题
    title: (h, { colIndex }) => <b style="color: #0052d9">{['', '标题'][colIndex]}</b>,
  },
  {
    colKey: 'property',
    // render 可以渲染表头，也可以渲染单元格。但 title 只能渲染表头，cell 只能渲染单元格
    render(h, context) {
      const { type, row, col } = context;
      return {
        title: '属性名',
        cell: row && row[col.colKey],
      }[type];
    },
  },
];
</script>
<style scoped>
.link {
  color: #0052d9;
  text-decoration: none;
}
.t-icon {
  font-size: 16px;
}
</style>
