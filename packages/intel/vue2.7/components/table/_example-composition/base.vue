<template>
  <t-space direction="vertical">
    <!-- 按钮操作区域 -->
    <div>
      <t-radio-group v-model="size" variant="default-filled">
        <t-radio-button value="small">小尺寸</t-radio-button>
        <t-radio-button value="medium">中尺寸</t-radio-button>
        <t-radio-button value="large">大尺寸</t-radio-button>
      </t-radio-group>
    </div>

    <t-space>
      <t-checkbox v-model="stripe">显示斑马纹</t-checkbox>
      <t-checkbox v-model="bordered">显示表格边框</t-checkbox>
      <t-checkbox v-model="hover">显示悬浮效果</t-checkbox>
      <t-checkbox v-model="tableLayout">宽度自适应</t-checkbox>
      <t-checkbox v-model="showHeader">显示表头</t-checkbox>
    </t-space>

    <!-- 当数据为空需要占位时，会显示 cellEmptyContent -->
    <t-table
      rowKey="index"
      :data="data"
      :columns="columns"
      :stripe="stripe"
      :bordered="bordered"
      :hover="hover"
      :size="size"
      :table-layout="tableLayout ? 'auto' : 'fixed'"
      :pagination="pagination"
      :showHeader="showHeader"
      cellEmptyContent="-"
      resizable
    ></t-table>
  </t-space>
</template>
<script setup lang="jsx">
import { ref, reactive } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialData = [];
const total = 28;
for (let i = 0; i < total; i++) {
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
const data = ref(initialData);
const size = ref('medium');
const tableLayout = ref(false);
const stripe = ref(true);
const bordered = ref(true);
const hover = ref(false);
const showHeader = ref(true);
const columns = ref([
  {
    colKey: 'applicant',
    title: '申请人',
    width: '100',
  },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
    cell: (h, { row }) => {
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
  },
  {
    colKey: 'detail.email',
    title: '邮箱地址',
    ellipsis: true,
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
]);
/** 非受控用法：与分页组件对齐 */
const pagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 5,
  total,
});
</script>
<style lang="less">
.t-table__body .t-tag span {
  display: inline-flex;
  align-items: center;
}
</style>
