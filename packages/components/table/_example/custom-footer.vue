<template>
  <div class="tdesign-demo-block-column-large tdesign-demo__table">
    <div>
      <!-- 表尾有 3 种方式 -->
      <t-radio-group v-model="footerType" variant="default-filled">
        <t-radio-button value="normal">普通表尾</t-radio-button>
        <t-radio-button value="full">通栏表尾</t-radio-button>
        <t-radio-button value="custom">自定义表尾合并列</t-radio-button>
      </t-radio-group>
    </div>
    <!-- footData 之所以是数组，是为了支持多行表尾数据 -->
    <t-table
      row-key="index"
      bordered
      :data="data"
      :columns="columns"
      :foot-data="['normal', 'custom'].includes(footerType) ? footData : []"
      :row-class-name="rowClassName"
      :rowspan-and-colspan-in-footer="footerType === 'custom' ? rowspanAndColspanInFooter : undefined"
      lazy-load
    >
      <!-- 如果是通栏表尾，只需设置 footer-summary，支持同名 Props 属性 footerSummary -->
      <!-- 通栏表尾和普通表尾，允许同时存在 -->
      <template v-if="footerType === 'full'" #footerSummary>
        <div class="t-table__row-filter-inner">表尾信息</div>
      </template>
      <template #t-foot-required> <div style="text-align: left; font-weight: bold">表尾信息</div> </template>
    </t-table>
  </div>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { TableProps, RowClassNameParams, TableRowData } from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
const data: TableProps['data'] = [];
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
for (let i = 0; i < 5; i++) {
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

// 表尾有一行数据
const footData = [
  {
    status: '审批状态汇总',
    createTime: '-',
  },
];
// 自定义表尾的方式
const footerType = ref('normal');
const columns: TableProps['columns'] = [
  {
    align: 'left',
    colKey: 'applicant',
    title: '申请人',
    foot: () => <b style="font-weight: bold">表尾信息</b>,
    width: '120',
  },
  {
    title: '审批状态',
    colKey: 'status',
    width: '150',
    // 使用 cell 方法自定义单元格：
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
    foot: 't-foot-required',
  },
  {
    colKey: 'detail.email',
    title: '邮箱地址',
    ellipsis: true,
    foot: () => <div>表尾信息</div>,
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
];
const rowspanAndColspanInFooter: TableProps['rowspanAndColspanInFooter'] = ({ rowIndex, colIndex }) => {
  // 中间列合并，收尾两列不合并
  if (rowIndex === 0 && colIndex === 1)
    return {
      colspan: columns.length - 2,
    };
  return {};
};

// type 可选值：foot 和 body
function rowClassName({ type }: RowClassNameParams<TableRowData>) {
  if (type === 'foot') return 't-tdesign__custom-footer-tr';
  return 't-tdesign__custom-body-tr';
}
</script>
