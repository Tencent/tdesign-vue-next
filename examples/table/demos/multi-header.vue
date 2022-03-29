<template>
  <!-- 注意控制父元素宽度 -->
  <div style="width: 100%" class="tdesign-demo-block-column-large tdesign-demo-table-multi-header">
    <!-- 按钮操作区域 -->
    <div>
      <t-checkbox v-model="bordered">显示表格边框</t-checkbox>
      <t-checkbox v-model="fixedHeader">显示固定表头</t-checkbox>
      <!-- 为保证组件收益最大化，当数据量小于 `100` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动 -->
      <t-checkbox v-model="virtualScroll">虚拟滚动</t-checkbox>
      <t-checkbox v-model="fixedLeftCol">固定左侧列</t-checkbox>
      <t-checkbox v-model="fixedRightCol">固定右侧列</t-checkbox>
      <t-checkbox v-model="headerAffixedTop">表头吸顶</t-checkbox>
    </div>

    <!-- tableContentWidth 必须大于表格的外层宽度，否则请设置 width: 100% -->
    <!-- 多级表头中，如果要使用固定列功能，则必须设置 colKey 和 fixed -->
    <t-table
      row-key="index"
      :data="data"
      :v-model:sort="sortInfo"
      :columns="columns"
      :bordered="bordered"
      :max-height="fixedHeader ? 380 : undefined"
      :column-controller="{ displayType: 'auto-width' }"
      :filter-row="() => null"
      :header-affix-props="{ offsetTop: 0 }"
      :header-affixed-top="headerAffixedTop"
      :scroll="virtualScroll ? { type: 'virtual', threshold: 100, rowHeight: 48, bufferSize: 10 } : undefined"
      @data-change="onDataChange"
      @filter-change="onFilterChange"
    ></t-table>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';

const initialData = [];
for (let i = 0; i < 600; i++) {
  initialData.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    property: ['A', 'B', 'C'][i % 3],
    default: i,
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    type_default: '-',
    description: '数据源',
    field1: '字段1',
    field2: '字段2',
    field3: '字段3',
    field4: '字段4',
    field5: '字段5',
    field6: '字段6',
    field7: '字段7',
    field8: '字段8',
    text: '这是一段很长很长很长的文本',
  });
}

function getColumns(fixedLeftCol, fixedRightCol) {
  return [
    {
      title: '序号',
      colKey: 'index',
      fixed: fixedLeftCol && 'left',
      width: 100,
    },
    {
      title: '汇总属性',
      fixed: fixedLeftCol && 'left',
      width: 100,
      colKey: 'total_info',
      children: [
        {
          align: 'left',
          colKey: 'platform',
          title: '平台',
          fixed: fixedLeftCol && 'left',
          width: 100,
        },
        {
          title: '类型及默认值',
          colKey: 'type_default',
          fixed: fixedLeftCol && 'left',
          width: 100,
          children: [
            {
              align: 'left',
              colKey: 'type',
              title: '类型',
              fixed: fixedLeftCol && 'left',
              width: 110,
            },
            {
              align: 'left',
              colKey: 'default',
              title: '默认值',
              fixed: fixedLeftCol && 'left',
              width: 100,
              sorter: (a, b) => a.default - b.default,
            },
            {
              align: 'left',
              colKey: 'needed',
              title: '是否必传',
              fixed: fixedLeftCol && 'left',
              width: 100,
            },
          ],
        },
      ],
    },
    {
      colKey: 'field1',
      title: '字段1',
      width: 100,
    },
    {
      colKey: 'field2',
      title: '字段2',
      width: 100,
    },

    {
      colKey: 'field3',
      title: '字段3',
      width: 100,
    },
    {
      colKey: 'field4',
      title: '字段4',
      width: 100,
    },
    {
      title: '属性及说明',
      colKey: 'instruction',
      fixed: fixedRightCol && 'right',
      width: 100,
      children: [
        {
          align: 'left',
          colKey: 'property',
          title: '属性',
          fixed: fixedRightCol && 'right',
          width: 110,
          filter: {
            type: 'single',
            list: [
              { label: 'any', value: '' },
              { label: 'A', value: 'A' },
              { label: 'B', value: 'B' },
              { label: 'D', value: 'D' },
            ],
          },
        },
        {
          align: 'left',
          ellipsis: true,
          colKey: 'description',
          title: '说明',
          fixed: fixedRightCol && 'right',
          width: 100,
          children: [
            {
              colKey: 'field6',
              title: '字段6',
              fixed: fixedRightCol && 'right',
              width: 100,
            },
            {
              colKey: 'field7',
              title: '字段7',
              fixed: fixedRightCol && 'right',
              width: 100,
            },
            {
              colKey: 'text',
              title: '描述',
              fixed: fixedRightCol && 'right',
              ellipsis: true,
              width: 100,
            },
          ],
        },
      ],
    },
    {
      colKey: 'field5',
      title: '字段5',
      fixed: fixedRightCol && 'right',
      width: 100,
    },
  ];
}

const data = ref([...initialData]);
const sortInfo = ref({});
const bordered = ref(true);
const fixedHeader = ref(true);
const fixedLeftCol = ref(false);
const fixedRightCol = ref(false);
const headerAffixedTop = ref(false);
const virtualScroll = ref(true);

const columns = computed(() => getColumns(fixedLeftCol.value, fixedRightCol.value));

const onDataChange = (val) => {
  data.value = val.concat();
};

const onFilterChange = (filterValue) => {
  data.value = initialData.filter((t) => !filterValue.property || filterValue.property === t.property);
};
</script>
