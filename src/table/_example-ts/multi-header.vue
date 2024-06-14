<template>
  <!-- 注意控制父元素宽度 -->
  <div style="width: 100%" class="tdesign-demo-block-column-large tdesign-demo-table-multi-header">
    <!-- 按钮操作区域 -->
    <t-space>
      <t-checkbox v-model="bordered">显示表格边框</t-checkbox>
      <t-checkbox v-model="fixedHeader">显示固定表头</t-checkbox>
      <!-- 为保证组件收益最大化，当数据量小于 `100` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动 -->
      <!-- <t-checkbox v-model="virtualScroll">虚拟滚动</t-checkbox> -->
      <t-checkbox v-model="fixedLeftCol">固定左侧列</t-checkbox>
      <t-checkbox v-model="fixedRightCol">固定右侧列</t-checkbox>
      <t-checkbox v-model="headerAffixedTop">表头吸顶</t-checkbox>
    </t-space>

    <!-- tableContentWidth 必须大于表格的外层宽度，否则请设置 width: 100% -->
    <!-- 多级表头中，如果要使用固定列功能，则必须设置 colKey 和 fixed -->
    <!-- :scroll="{ type: 'virtual' }" -->
    <t-table
      v-model:sort="sortInfo"
      row-key="index"
      :data="data"
      :columns="columns"
      :bordered="bordered"
      :max-height="fixedHeader ? 380 : undefined"
      :column-controller="{ displayType: 'auto-width' }"
      :filter-row="filterRowMethod"
      :header-affix-props="{ offsetTop: 0 }"
      :header-affixed-top="headerAffixedTop"
      :scroll="{ type: 'virtual' }"
      lazy-load
      @data-change="onDataChange"
      @filter-change="onFilterChange"
    ></t-table>
  </div>
</template>
<script lang="tsx" setup>
import { computed, ref } from 'vue';
import { TableProps } from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
const statusNameListMap = {
  0: {
    label: '审批通过',
    theme: 'success',
    icon: <CheckCircleFilledIcon />,
  },
  1: {
    label: '审批失败',
    theme: 'danger',
    icon: <CloseCircleFilledIcon />,
  },
  2: {
    label: '审批过期',
    theme: 'warning',
    icon: <ErrorCircleFilledIcon />,
  },
};
const initialData: TableProps['data'] = [];
for (let i = 0; i < 1900; i++) {
  initialData.push({
    index: i + 1,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    time: [3, 2, 4, 1][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    property: ['组长审批', '部门审批', '财务审批'][i % 3],
    default: i,
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    type_default: '-',
    description: '数据源',
    field1: [100, 200, 400, 500][i % 4],
    field2: [100, 200, 400, 500][i % 4],
    field3: [100, 200, 400, 500][i % 4],
    field4: [100, 200, 400, 500][i % 4],
    field5: '字段5',
    field6: '字段6',
    field7: `审批单号00${i + 1}`,
  });
}
function getColumns(fixedLeftCol: boolean, fixedRightCol: boolean) {
  const columns: TableProps['columns'] = [
    {
      title: '申请人',
      colKey: 'applicant',
      fixed: fixedLeftCol ? 'left' : undefined,
      width: 100,
    },
    {
      title: '申请汇总',
      fixed: fixedLeftCol ? 'left' : undefined,
      width: 100,
      colKey: 'total_info',
      children: [
        {
          align: 'left',
          colKey: 'platform',
          title: '申请状态',
          fixed: fixedLeftCol ? 'left' : undefined,
          width: 120,
          sorter: (a, b) => a.default - b.default,
          cell: (h, { row }) => {
            return (
              <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
                {statusNameListMap[row.status].icon}
                {statusNameListMap[row.status].label}
              </t-tag>
            );
          },
        },
        {
          title: '申请渠道和金额',
          colKey: 'type_default',
          fixed: fixedLeftCol ? 'left' : undefined,
          width: 100,
          children: [
            {
              align: 'left',
              colKey: 'channel',
              title: '类型',
              fixed: fixedLeftCol ? 'left' : undefined,
              width: 110,
            },
            {
              align: 'center',
              colKey: 'time',
              title: '申请耗时(天)',
              fixed: fixedLeftCol ? 'left' : undefined,
              width: 150,
            },
          ],
        },
      ],
    },
    {
      colKey: 'field1',
      title: '住宿费',
      width: 100,
    },
    {
      colKey: 'field3',
      title: '交通费',
      width: 100,
    },
    {
      colKey: 'field4',
      title: '物料费',
      width: 100,
    },
    {
      colKey: 'field2',
      title: '奖品激励费',
      width: 120,
    },
    {
      title: '审批汇总',
      colKey: 'instruction',
      fixed: fixedRightCol ? 'right' : undefined,
      width: 100,
      children: [
        {
          align: 'left',
          colKey: 'property',
          title: '审批状态',
          fixed: fixedRightCol ? 'right' : undefined,
          width: 120,
          filter: {
            type: 'single',
            list: [
              {
                label: '所有状态',
                value: '',
              },
              {
                label: '组长审批',
                value: '组长审批',
              },
              {
                label: '部门审批',
                value: '部门审批',
              },
              {
                label: '财务审批',
                value: '财务审批',
              },
            ],
          },
        },
        {
          align: 'left',
          ellipsis: true,
          colKey: 'description',
          title: '说明',
          fixed: fixedRightCol ? 'right' : undefined,
          width: 100,
          children: [
            {
              colKey: 'field7',
              title: '审批单号',
              fixed: fixedRightCol ? 'right' : undefined,
              width: 120,
            },
            {
              colKey: 'detail.email',
              title: '邮箱地址',
              fixed: fixedRightCol ? 'right' : undefined,
              ellipsis: true,
              width: 150,
            },
          ],
        },
      ],
    },
    {
      colKey: 'createTime',
      title: '申请时间',
      fixed: fixedRightCol ? 'right' : undefined,
      width: '120',
    },
  ];
  return columns;
}
const data = ref<TableProps['data']>([...initialData]);
const sortInfo = ref<TableProps['sort']>();
const bordered = ref(true);
const fixedHeader = ref(true);
const fixedLeftCol = ref(false);
const fixedRightCol = ref(false);
const headerAffixedTop = ref<TableProps['headerAffixedTop']>(false);
const columns = computed<TableProps['columns']>(() => getColumns(fixedLeftCol.value, fixedRightCol.value));
const onDataChange: TableProps['onDataChange'] = (val) => {
  data.value = val.concat();
};
const onFilterChange: TableProps['onFilterChange'] = (filterValue) => {
  data.value = initialData.filter((t) => !filterValue.property || filterValue.property === t.property);
};
const filterRowMethod: TableProps['filterRow'] = () => null;
</script>
