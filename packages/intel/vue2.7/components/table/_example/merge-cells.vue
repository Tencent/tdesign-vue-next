<template>
  <t-table
    rowKey="i"
    :bordered="true"
    :data="data"
    :columns="columns"
    :rowspanAndColspan="rowspanAndColspan"
    table-layout="fixed"
    resizable
    lazyLoad
  >
  </t-table>
</template>
<script lang="jsx">
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialData = new Array(6).fill(null).map((_, i) => ({
  i,
  status: i % 3,
  applicant: ['贾明', '张三', '王芳'][i % 3],
  channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
  type: ['审批通过', '已过期', '审批失败', '审批中'][i % 4],
  detail: {
    email: [
      'w.cezkdudy@lhll.au',
      'r.nmgw@peurezgn.sl',
      'p.cumx@rampblpa.ru',
      'b.nmgw@peurezgn.sl',
      'd.cumx@rampblpa.ru',
    ][i % 5],
  },
  needed: ['Y', 'N'][i % 1],
  description: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
  createTime: '2021-11-01',
}));
export default {
  data() {
    return {
      data: initialData,
      columns: [
        { colKey: 'applicant', title: '申请人', width: '100' },
        {
          colKey: 'status',
          title: '申请状态',
          width: '150',
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
          colKey: 'description',
          title: '审批事项',
          width: 150,
        },
        {
          colKey: 'detail.email',
          title: '邮箱地址',
        },
        {
          colKey: 'channel',
          // 多行表头合并请参考「多级表头示例」
          title: '其他信息',
          // 仅适用于单行表头合并列
          colspan: 2,
          // 设置列样式，注释的示例代码有效
          // attrs: ({ type, col, row, colIndex, rowIndex }) => ({
          //   style: {
          //     color: 'blue',
          //   },
          // }),
        },
        {
          colKey: 'createTime',
          title: '创建时间',
        },
      ],
    };
  },
  methods: {
    rowspanAndColspan({ col, rowIndex, colIndex }) {
      if (colIndex === 0 && rowIndex % 2 === 0) {
        return {
          rowspan: 2,
        };
      }
      if (col.colKey === 'description' && rowIndex === 1) {
        return {
          colspan: 2,
          rowspan: 2,
        };
      }
      if (col.colKey === 'email' && rowIndex === 4) {
        return {
          colspan: 2,
          rowspan: 2,
        };
      }
    },
  },
};
</script>
