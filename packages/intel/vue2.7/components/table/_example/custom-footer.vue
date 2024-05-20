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
      rowKey="index"
      bordered
      :data="data"
      :columns="columns"
      :foot-data="['normal', 'custom'].includes(footerType) ? footData : []"
      :rowClassName="rowClassName"
      :rowspanAndColspanInFooter="footerType === 'custom' ? rowspanAndColspanInFooter : undefined"
      lazyLoad
    >
      <!-- 如果是通栏表尾，只需设置 footerSummary，支持同名 Props 属性 footerSummary -->
      <!-- 通栏表尾和普通表尾，允许同时存在 -->
      <template #footerSummary>
        <div class="t-table__row-filter-inner" v-if="footerType === 'full'">表尾信息</div>
      </template>
      <template #t-foot-required> <div style="text-align: left; font-weight: bold">表尾信息</div> </template>
    </t-table>
  </div>
</template>
<script lang="jsx">
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialData = [];

for (let i = 0; i < 5; i++) {
  initialData.push({
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
export default {
  data() {
    return {
      data: initialData,
      footerType: 'normal',
      // 表尾有一行数据
      footData: [
        {
          index: '123',
          type: '全部类型',
          default: '',
          description: '-',
        },
      ],
      columns: [
        {
          align: 'left',
          colKey: 'applicant',
          title: '申请人',
          foot: () => <b style="font-weight: bold">表尾信息</b>,
          width: '120',
        },
        {
          colKey: 'matters',
          title: (h, { colIndex }) => <b style="font-wight: bold">{['', '申请事项'][colIndex]}</b>,
          foot: '-',
        },
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
          foot: '-',
        },
        {
          title: '邮箱地址',
          colKey: 'detail.email',
          width: 200,
          foot: '-',
        },
        {
          colKey: 'createTime',
          // render 可以渲染表头，也可以渲染单元格。但 title 只能渲染表头，cell 只能渲染单元格
          render(h, context) {
            const { type, row, col } = context;
            return {
              title: '申请时间',
              cell: row && row[col.colKey],
            }[type];
          },
          foot: '-',
        },
      ],
    };
  },

  methods: {
    // type 可选值：foot 和 body
    rowClassName({ type }) {
      if (type === 'foot') return 't-tdesign__custom-footer-tr';
      return 't-tdesign__custom-body-tr';
    },

    rowspanAndColspanInFooter({ rowIndex, colIndex }) {
      // 中间列合并，收尾两列不合并
      if (rowIndex === 0 && colIndex === 1) return { colspan: this.columns.length - 2 };
      return {};
    },
  },
};
</script>
