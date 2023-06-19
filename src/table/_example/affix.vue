<template>
  <!-- 注意组件父元素的宽度 -->
  <div class="tdesign-demo-block-column-large tdesign-demo__table-affix" style="width: 100%">
    <div>
      <t-checkbox v-model="headerAffixedTop">表头吸顶</t-checkbox>
      <t-checkbox v-model="footerAffixedBottom" style="margin-left: 32px">表尾吸底</t-checkbox>
      <t-checkbox v-model="horizontalScrollAffixedBottom" style="margin-left: 32px">滚动条吸底</t-checkbox>
      <t-checkbox v-model="paginationAffixedBottom" style="margin-left: 32px">分页器吸底</t-checkbox>
      <t-checkbox v-model="fixedLeftColumn" style="margin-left: 32px">固定左侧列</t-checkbox>
      <t-checkbox v-model="fixedRightColumn" style="margin-left: 32px">固定右侧列</t-checkbox>
    </div>

    <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      :foot-data="footData"
      :row-class-name="rowClassName"
      :pagination="{ defaultCurrent: 1, defaultPageSize: 5, total: TOTAL }"
      :header-affixed-top="headerAffixedTop ? { offsetTop: 87, zIndex: 1000 } : undefined"
      :footer-affixed-bottom="
        footerAffixedBottom ? { offsetBottom: paginationAffixedBottom ? 60 : 0, zIndex: 1000 } : false
      "
      :horizontal-scroll-affixed-bottom="
        horizontalScrollAffixedBottom ? { offsetBottom: paginationAffixedBottom ? 61 : 0, zIndex: 1000 } : false
      "
      :pagination-affixed-bottom="paginationAffixedBottom"
      table-layout="fixed"
      drag-sort="col"
      bordered
      resizable
      @drag-sort="onDragSortChange"
    >
      <template #t-foot-required> 插槽渲染表尾 </template>
    </t-table>
  </div>
</template>
<script setup lang="jsx">
import { ref, watch, h } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

const statusNameListMap = {
  0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
  1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
  2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
};

function getData(count) {
  const data = [];
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
        return (
          <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
            {statusNameListMap[row.status].icon}
            {statusNameListMap[row.status].label}
          </t-tag>
        );
      },
    },
    { colKey: 'channel', title: '签署方式', width: '120' },
    { colKey: 'detail.email', title: '邮箱地址', ellipsis: true },
    { colKey: 'matters', title: '申请事项', ellipsis: true },
    { colKey: 'createTime', title: '申请时间' },
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

const data = getData(TOTAL);
// 表尾有一行数据
const footData = [{ index: 'footer-row-1', type: '全部类型', description: '-' }];
const columns = ref([]);

// 重要：如果在预渲染场景下，初次渲染的表格宽度和最终呈现宽度不一样，请异步设置表头吸顶
const headerAffixedTop = ref(true);
const footerAffixedBottom = ref(true);
const fixedLeftColumn = ref(true);
const fixedRightColumn = ref(true);
const horizontalScrollAffixedBottom = ref(false);
const paginationAffixedBottom = ref(false);

// type 可选值：foot 和 body
function rowClassName({ type }) {
  if (type === 'foot') return 't-tdesign__custom-footer-tr';
  return 't-tdesign__custom-body-tr';
}

function onDragSortChange({ newData }) {
  columns.value = newData;
}

// 表尾吸顶和底部滚动条，二选一即可，也只能二选一
watch(horizontalScrollAffixedBottom, (val) => {
  val && (footerAffixedBottom.value = false);
});

// 表尾吸顶和底部滚动条，二选一即可，也只能二选一
watch(footerAffixedBottom, (val) => {
  val && (horizontalScrollAffixedBottom.value = false);
});

// 左侧固定列发生变化时
watch(
  fixedLeftColumn,
  (val) => {
    columns.value = getColumns(h, {
      fixedLeftColumn: val,
      fixedRightColumn: fixedRightColumn.value,
    });
  },
  { immediate: true },
);

// 右侧固定列发生变化时
watch(
  fixedRightColumn,
  (val) => {
    columns.value = getColumns(h, {
      fixedLeftColumn: fixedLeftColumn.value,
      fixedRightColumn: val,
    });
  },
  { immediate: true },
);
</script>

<style>
/*
 * table-layout: auto 模式下，table 元素的宽度设置很重要很重要。
 * 如果不设置，列多了之后会挤在一起（如果使用了列宽调整调整功能，切勿设置 min-width 一类模糊宽度）
 * **/
.tdesign-demo__table-affix table {
  width: 1200px;
}

.tdesign-demo__table-affix .t-table {
  max-width: 800px;
}
</style>
