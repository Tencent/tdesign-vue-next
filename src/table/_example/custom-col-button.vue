<template>
  <div class="tdesign-demo-block-column-large">
    <!-- 按钮操作区域 -->
    <div>
      <t-radio-group v-model="placement" variant="default-filled">
        <t-radio-button value="top-left">左上角</t-radio-button>
        <t-radio-button value="top-right">右上角</t-radio-button>
        <t-radio-button value="bottom-left">左下角</t-radio-button>
        <t-radio-button value="bottom-right">右下角</t-radio-button>
      </t-radio-group>
      <br /><br />
      <t-checkbox v-model="bordered">是否显示边框</t-checkbox>
      <t-checkbox v-model="customText">自定义列配置按钮</t-checkbox>
    </div>

    <!-- 1. defaultDisplayColumns = ['platform'] 设置默认显示哪些列，仅第一次有效 -->
    <!-- 2. displayColumns 动态设置显示哪些列，受控属性，支持 displayColumns.sync 语法糖 -->
    <!-- 3. onDisplayColumnsChange 当前显示列发生变化时触发 -->
    <!-- 4. 如果希望顶部内容 和 列配置按钮 保持在同一行，可将内容放在 topContent，并调整按钮父元素宽度(CSS) -->
    <!-- 受控用法，示例代码有效，勿删  -->
    <t-table
      v-model:displayColumns="displayColumns"
      row-key="index"
      :data="data"
      :columns="columns"
      :column-controller="{
        placement,
        fields: ['platform', 'type', 'default'],
        dialogProps: { preventScrollThrough: true },
        buttonProps: customText ? { content: '显示列控制', theme: 'primary', variant: 'base' } : undefined,
      }"
      :pagination="{ defaultPageSize: 5, defaultCurrent: 1, total: 100 }"
      :bordered="bordered"
      table-layout="auto"
      stripe
      @column-change="onColumnChange"
    ></t-table>

    <!-- 非受控用法，示例代码有效，勿删 -->
    <!-- <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      :column-controller="{ displayType: 'fixed-width', fields: ['platform', 'type', 'default'] }"
      table-layout="auto"
      stripe
      bordered
      @column-change="onColumnChange"
    ></t-table> -->
  </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const placement = ref('top-right');
const bordered = ref(true);
const customText = ref(false);

const initialData = [];
for (let i = 0; i < 100; i++) {
  initialData.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}

const data = ref([...initialData]);

const staticColumn = ['index', 'needed', 'detail.position'];
const displayColumns = ref(staticColumn.concat(['platform', 'type', 'default']));

const columns = [
  {
    align: 'center',
    className: 'row',
    colKey: 'index',
    title: '序号',
  },
  {
    colKey: 'platform',
    title: '平台',
  },
  {
    colKey: 'type',
    title: '类型',
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
    colKey: 'detail.position',
    title: '详情信息',
    ellipsis: true,
  },
];

const onColumnChange = (params) => {
  console.log(params);
};
</script>
