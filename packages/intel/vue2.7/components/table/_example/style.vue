<template>
  <div class="t-demo__style">
    <!-- row-class-name 设置行类名 -->
    <t-table row-key="index" :data="data" :columns="columns" :row-class-name="getRowClassName">
      <template #footerSummary>
        <div class="t-table__row-filter-inner">汇总：近期数据波动较大</div>
      </template>
    </t-table>
  </div>
</template>

<script lang="jsx">
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialData = [];
const total = 5;
for (let i = 0; i < total; i++) {
  initialData.push({
    index: i,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    },
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 10, 1][i % 3],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  });
}
export default {
  data() {
    return {
      data: initialData,
      columns: [
        { colKey: 'applicant', title: '申请人', width: 100 },
        {
          colKey: 'status',
          title: '审批状态',
          width: 120,
          cell: (h, { row }) => {
            const statusNameListMap = {
              0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
              1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
              2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
            };
            return (
              <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
                {statusNameListMap[row.status].icon}
                {statusNameListMap[row.status].label}
              </t-tag>
            );
          },
        },
        {
          colKey: 'time',
          title: '申请耗时(天)',
          width: 120,
          align: 'center',
          // 设置单元格类名
          className: ({ row }) => {
            if (row.time >= 9) {
              return 'custom-cell-class-name';
            }
            return '';
          },
          attrs: ({ row }) => {
            if (row.time >= 9) {
              return {
                style: {
                  fontWeight: 600,
                  backgroundColor: 'var(--td-warning-color-light)',
                },
              };
            }
          },
        },
        {
          colKey: 'channel',
          title: '签署方式',
          width: 120,
          align: 'right',
          className: () => 'custom-cell-class-name',
        },
        {
          colKey: 'detail.email',
          title: '邮箱地址',
          width: 160,
          ellipsis: true,
        },
        { colKey: 'createTime', title: '申请时间' },
      ],
    };
  },

  methods: {
    getRowClassName({ rowIndex }) {
      if (rowIndex === 2) return 'custom-third-class-name';
      return '';
    },
  },
};
</script>

<style>
.t-demo__style .t-table .custom-third-class-name > td {
  color: green;
  font-weight: bold;
}

.t-demo__style .t-table td.last-column-class-name {
  color: orange;
  font-weight: bold;
}

.t-table td.custom-cell-class-name {
  color: orange;
  font-size: 18px;
  font-weight: bold;
}
</style>
