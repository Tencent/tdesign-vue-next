<template>
  <div>
    <div style="margin: 16px">
      <ul>
        <li>标题默认使用 title 渲染，自定义标题则有以下几种方式</li>
        <li>1) 使用 title 作为渲染函数，函数参数为：title({ col, colIndex })</li>
        <li>2) 插槽，使用 title 的值作为插槽名称</li>
        <li>
          3)【不推荐使用】使用 render 作为渲染函数，函数参数为：render({col, colIndex, row, rowIndex, type})，单元格的
          type 值为 cell，标题的 type 值为 title。使用排序、过滤等功能时不能使用该方法
        </li>
      </ul>
      <br />
    </div>
    <t-table :data="data" :columns="columns" row-key="property">
      <!-- 自定义表头，title值为插槽名称  -->
      <template #title-slot-name> <app-icon /> 类型 </template>
    </t-table>
  </div>
</template>
<script lang="jsx">
import { defineComponent } from 'vue';
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

export default defineComponent({
  components: {
    AppIcon,
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
.t-icon {
  font-size: 16px;
}
</style>
