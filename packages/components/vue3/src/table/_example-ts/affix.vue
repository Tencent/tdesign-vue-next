<template>
  <!-- 注意组件父元素的宽度 -->
  <div style="width: 830px" class="tdesign-demo-block-column-large tdesign-demo__table-affix">
    <t-space>
      <t-checkbox v-model="headerAffixedTop">表头吸顶</t-checkbox>
      <t-checkbox v-model="footerAffixedBottom">表尾吸底</t-checkbox>
      <t-checkbox v-model="horizontalScrollAffixedBottom">滚动条吸底</t-checkbox>
      <t-checkbox v-model="paginationAffixedBottom">分页器吸底</t-checkbox>
      <t-checkbox v-model="fixedLeftColumn">固定左侧列</t-checkbox>
      <t-checkbox v-model="fixedRightColumn">固定右侧列</t-checkbox>
    </t-space>

    <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      :foot-data="footData"
      :row-class-name="rowClassName"
      :pagination="pagination"
      :header-affixed-top="headerAffixedTopProps"
      :footer-affixed-bottom="footerAffixedBottomProps"
      :horizontal-scroll-affixed-bottom="horizontalScrollAffixedBottomProps"
      :pagination-affixed-bottom="paginationAffixedBottom"
      table-layout="fixed"
      drag-sort="col"
      bordered
      resizable
      lazy-load
      @drag-sort="onDragSortChange"
    >
      <template #t-foot-required> 插槽渲染表尾 </template>
    </t-table>
  </div>
</template>
<script lang="tsx" setup>
import { ref, watch, computed } from 'vue';
import { TableProps, RowClassNameParams, TableRowData, DragSortContext } from 'tdesign-vue-next';
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
function getData(count: number) {
  const data: TableProps['data'] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      index: i + 1,
      applicant: ['贾明', '张三', '王芳'][i % 3],
      status: i % 3,
      channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
      detail: {
        email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
      },
      matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
      time: [2, 3, 1, 4][i % 4],
      createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    });
  }
  return data;
}
const TOTAL = 38;
function getColumns({ fixedLeftColumn, fixedRightColumn }: { fixedLeftColumn: boolean; fixedRightColumn: boolean }) {
  const columns: TableProps['columns'] = [
    {
      align: 'left',
      colKey: 'applicant',
      title: '申请人',
      foot: () => <b style="font-weight: bold">表尾信息</b>,
      width: '120',
      fixed: fixedLeftColumn ? 'left' : undefined,
    },
    {
      colKey: 'status',
      title: '申请状态',
      width: '150',
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
      colKey: 'channel',
      title: '签署方式',
      width: '120',
    },
    {
      colKey: 'detail.email',
      title: '邮箱地址',
      width: '180',
      ellipsis: true,
    },
    {
      colKey: 'matters',
      title: '申请事项',
      width: '180',
      ellipsis: true,
    },
    {
      colKey: 'createTime',
      title: '申请时间',
      width: '120',
    },
    {
      colKey: 'operation',
      title: '操作',
      cell: (h, { row }) => (
        <t-link hover="color" theme="primary">
          {row.status === 0 ? '查看详情' : '再次申请'}
        </t-link>
      ),
      width: 120,
      foot: '-',
      fixed: fixedRightColumn ? 'right' : undefined,
    },
  ];
  return columns;
}
const data: TableProps['data'] = getData(TOTAL);
// 表尾有一行数据
const footData: TableProps['footData'] = [
  {
    index: 'footer-row-1',
    type: '全部类型',
    description: '-',
  },
];
const columns = ref<TableProps['columns']>([]);

// 重要：如果在预渲染场景下，初次渲染的表格宽度和最终呈现宽度不一样，请异步设置表头吸顶
const headerAffixedTop = ref(true);
const footerAffixedBottom = ref(false);
const fixedLeftColumn = ref(true);
const fixedRightColumn = ref(true);
const horizontalScrollAffixedBottom = ref(true);
const paginationAffixedBottom = ref<TableProps['paginationAffixedBottom']>(true);

// type 可选值：foot 和 body
function rowClassName({ type }: RowClassNameParams<TableRowData>) {
  if (type === 'foot') return 't-tdesign__custom-footer-tr';
  return 't-tdesign__custom-body-tr';
}
function onDragSortChange({ newData }: DragSortContext<TableRowData>) {
  columns.value = newData;
}
const pagination = ref<TableProps['pagination']>({
  defaultCurrent: 1,
  defaultPageSize: 5,
  total: TOTAL,
});

// 注意保证对象引用不会发生变化，数据的变更始终保持为同一个对象。以免造成表格重新渲染问题
const headerAffixedTopProps = computed<TableProps['headerAffixedTop']>(() => {
  if (headerAffixedTop.value) {
    return {
      offsetTop: 87,
      zIndex: 1000,
      // container used to set scroll container, default container is body
      // container: () => document.body,
    };
  }
  return false;
});
const footerAffixedBottomProps = computed<TableProps['footerAffixedBottom']>(() => {
  if (footerAffixedBottom.value) {
    return {
      offsetBottom: paginationAffixedBottom.value ? 64 : 0,
      zIndex: 1000,
    };
  }
  return false;
});
const horizontalScrollAffixedBottomProps = computed<TableProps['horizontalScrollAffixedBottom']>(() => {
  if (horizontalScrollAffixedBottom.value) {
    return {
      // height of pagination component is 64
      offsetBottom: paginationAffixedBottom.value ? 64 : 0,
      zIndex: 1000,
    };
  }
  return false;
});

// 左侧固定列发生变化时
watch(
  fixedLeftColumn,
  (val) => {
    // @ts-ignore
    columns.value = getColumns({
      fixedLeftColumn: val,
      fixedRightColumn: fixedRightColumn.value,
    });
  },
  {
    immediate: true,
  },
);

// 右侧固定列发生变化时
watch(
  fixedRightColumn,
  (val) => {
    columns.value = getColumns({
      fixedLeftColumn: fixedLeftColumn.value,
      fixedRightColumn: val,
    });
  },
  {
    immediate: true,
  },
);
</script>
