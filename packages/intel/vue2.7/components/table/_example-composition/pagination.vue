<template>
  <t-space direction="vertical">
    <!-- 按钮操作区域 -->
    <t-radio-group v-model="reserveSelectedRowOnPaginate" variant="default-filled">
      <t-radio-button :value="true">跨分页选中</t-radio-button>
      <t-radio-button :value="false">当前页选中</t-radio-button>
    </t-radio-group>

    <t-table
      rowKey="index"
      :data="data"
      :columns="columns"
      :pagination="pagination"
      :selected-row-keys.sync="selectedRowKeys"
      :reserve-selected-row-on-paginate="reserveSelectedRowOnPaginate"
      lazyLoad
      @change="onChange"
      @page-change="onPageChange"
      @select-change="onSelectChange"
    ></t-table>
  </t-space>
</template>
<script setup lang="jsx">
import { ref, reactive } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialData = [];
const TOTAL = 59;
for (let i = 0; i < TOTAL; i++) {
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
const reserveSelectedRowOnPaginate = ref(true);
const selectedRowKeys = ref([]);
const columns = ref([
  {
    colKey: 'serial-number',
    width: 80,
    title: '序号',
  },
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
    width: '120',
  },
  // { colKey: 'detail.email', title: '邮箱地址', ellipsis: true },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
]);
/**
 * 1. 本地分页方式一（非受控用法）：使用 defaultCurrent 和 defaultPageSize 设置默认分页信息，仅第一次有效
 *
 * 2. 本地分页方式二（受控用法）：使用 current 和 pageSize 设置分页信息，任何时候有效，
 *    此时，注意需要在 onPageChange 中对 pagination.current 和 pagination.pageSize 进行赋值
 * */
const pagination = reactive({
  current: 2,
  pageSize: 5,
  // defaultCurrent: 2,
  // defaultPageSize: 5,
  total: TOTAL,
  showJumper: true,
});
// 分页、排序、过滤等操作触发均会触发 change 事件
const onChange = (params, context) => {
  console.log('change:', params, context);
};
// 分页变化时触发该事件
const onPageChange = (pageInfo, newData) => {
  if (!pagination.defaultCurrent) {
    // 受控用法所需，即使用 pagination.current 和 pagination.pageSize 时，必须保留恢复下面 2 行代码
    pagination.current = pageInfo.current;
    pagination.pageSize = pageInfo.pageSize;
  }
  console.log('page-change:', pageInfo, newData);
};
const onSelectChange = (selectedRowKeys, context) => {
  console.log(selectedRowKeys, context);
};
</script>
