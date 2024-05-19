<template>
  <!-- 注意组件父元素的宽度 -->
  <div class="tdesign-demo-block-column-large tdesign-demo__table tdesign-demo__table-affix" style="width: 830px">
    <t-space>
      <t-checkbox v-model="headerAffixedTop">表头吸顶</t-checkbox>
      <t-checkbox v-model="footerAffixedBottom">表尾吸底</t-checkbox>
      <t-checkbox v-model="horizontalScrollAffixedBottom">滚动条吸底</t-checkbox>
      <t-checkbox v-model="paginationAffixedBottom">分页器吸底</t-checkbox>
      <t-checkbox v-model="fixedLeftColumn">固定左侧列</t-checkbox>
      <t-checkbox v-model="fixedRightColumn">固定右侧列</t-checkbox>
    </t-space>
    <t-table
      rowKey="index"
      :data="data"
      :columns="columns"
      :footData="footData"
      :rowClassName="rowClassName"
      :pagination="pagination"
      :header-affixed-top="headerAffixedTopProps"
      :footer-affixed-bottom="footerAffixedBottomProps"
      :horizontal-scroll-affixed-bottom="horizontalScrollAffixedBottomProps"
      :paginationAffixedBottom="paginationAffixedBottom"
      table-layout="fixed"
      dragSort="col"
      bordered
      resizable
      lazyLoad
      @drag-sort="onDragSortChange"
    >
      <template #t-foot-required> 插槽渲染表尾 </template>
    </t-table>
  </div>
</template>
<script lang="jsx">
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

function getData(count) {
  const initialColumns = [];
  for (let i = 0; i < count; i++) {
    initialColumns.push({
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
  return initialColumns;
}

const TOTAL = 38;

function getColumns(h, { fixedLeftColumn, fixedRightColumn }) {
  return [
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
    { colKey: 'channel', title: '签署方式', width: '120' },
    { colKey: 'detail.email', title: '邮箱地址', width: '180' },
    { colKey: 'matters', title: '申请事项', width: '180' },
    { colKey: 'createTime', title: '申请时间', width: '120' },
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
}

export default {
  data() {
    return {
      data: getData(TOTAL),
      // 重要：如果在预渲染场景下，初次渲染的表格宽度和最终呈现宽度不一样，请异步设置表头吸顶
      headerAffixedTop: true,
      footerAffixedBottom: false,
      fixedLeftColumn: true,
      fixedRightColumn: true,
      horizontalScrollAffixedBottom: true,
      paginationAffixedBottom: true,
      // 表尾有一行数据
      footData: [{ index: 'footer-row-1', type: '全部类型', description: '-' }],
      columns: [],
      pagination: { defaultCurrent: 1, defaultPageSize: 5, total: TOTAL },
    };
  },

  computed: {
    headerAffixedTopProps() {
      if (this.headerAffixedTop) {
        return {
          offsetTop: 87,
          zIndex: 1000,
          // container used to set scroll container, default container is body
          // container: () => document.body,
        };
      }
      return false;
    },
    footerAffixedBottomProps() {
      if (this.footerAffixedBottom) {
        return {
          offsetBottom: this.paginationAffixedBottom ? 64 : 0,
          zIndex: 1000,
        };
      }
      return false;
    },
    horizontalScrollAffixedBottomProps() {
      if (this.horizontalScrollAffixedBottom) {
        return {
          // height of pagination component is 64
          offsetBottom: this.paginationAffixedBottom ? 64 : 0,
          zIndex: 1000,
        };
      }
      return false;
    },
  },

  watch: {
    // 左侧固定列发生变化时
    fixedLeftColumn: {
      handler(val) {
        this.columns = getColumns(this.$createElement, {
          fixedLeftColumn: val,
          fixedRightColumn: this.fixedRightColumn,
        });
      },
      immediate: true,
    },
    // 右侧固定列发生变化时
    fixedRightColumn(val) {
      this.columns = getColumns(this.$createElement, {
        fixedLeftColumn: this.fixedLeftColumn,
        fixedRightColumn: val,
      });
    },
  },

  methods: {
    // type 可选值：foot 和 body
    rowClassName({ type }) {
      if (type === 'foot') return 't-tdesign__custom-footer-tr';
      return 't-tdesign__custom-body-tr';
    },
    onDragSortChange({ newData }) {
      this.columns = newData;
    },
  },
};
</script>
