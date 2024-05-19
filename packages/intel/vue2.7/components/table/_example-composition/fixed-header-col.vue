<template>
  <!-- 父元素宽度不能超过 100% -->
  <div class="tdesign-demo-block-column tdesign-demo__table" style="width: 100%">
    <div>
      <t-radio-group v-model="tableLayout" variant="default-filled">
        <t-radio-button value="fixed">table-layout: fixed</t-radio-button>
        <t-radio-button value="auto">table-layout: auto</t-radio-button>
      </t-radio-group>
    </div>

    <div>
      <t-space>
        <t-checkbox v-model="fixedTopAndBottomRows">是否冻结首尾两行</t-checkbox>
        <t-checkbox v-model="stripe">是否显示斑马纹</t-checkbox>
      </t-space>
      <!-- TODO：虚拟滚动开启与关闭支持动态响应 -->
      <!-- <t-checkbox v-model="virtualScroll">开启虚拟滚动</t-checkbox> -->
    </div>

    <!-- 如果希望表格列宽自适应，设置 `table-layout: auto` 即可。需同时设置 table-content-width -->
    <!-- fixedRows: [2, 2] 表示冻结表格的头两行和尾两行 -->
    <!-- footData 可以是多行，均支持固定在底部 -->
    <t-table
      rowKey="index"
      :data="data"
      :footData="[{}]"
      :columns="columns"
      :table-layout="tableLayout"
      :table-content-width="tableLayout === 'fixed' ? undefined : '1600px'"
      :max-height="fixedTopAndBottomRows ? 500 : 300"
      :fixedRows="fixedTopAndBottomRows ? [2, 2] : undefined"
      :scroll="virtualScroll ? { type: 'virtual' } : undefined"
      :stripe="stripe"
      bordered
      lazyLoad
    >
      <template #operation="{ row }">
        <t-link theme="primary" hover="color" @click="rehandleClickOp(row)">
          {{ row.status === 0 ? '查看详情' : '再次申请' }}
        </t-link>
      </template>
    </t-table>
  </div>
</template>
<script setup lang="jsx">
import { ref, watch } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

function getData(count) {
  const initialData = [];
  for (let i = 0; i < count; i++) {
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
  return initialData;
}
const virtualScroll = ref(false);
const fixedTopAndBottomRows = ref(false);
const stripe = ref(false);
const tableLayout = ref('fixed');
const data = ref(getData(14));
const columns = ref([
  {
    colKey: 'applicant',
    title: '申请人',
    width: '100',
    foot: '共20条',
    fixed: 'left',
  },
  {
    colKey: 'status',
    title: '审批状态',
    width: 120,
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
    foot: '-',
  },
  {
    colKey: 'matters',
    title: '申请事项',
    width: '150',
    foot: '-',
  },
  {
    colKey: 'detail.email',
    title: '邮箱地址',
    width: '180',
    foot: '-',
  },
  {
    colKey: 'createTime',
    title: '申请日期',
    width: '120',
    foot: '-',
  },
  {
    colKey: 'operation',
    title: '操作',
    width: '150',
    foot: '-',
    fixed: 'right',
  },
]);
const rehandleClickOp = (context) => {
  console.log(context);
};
watch(virtualScroll, (val) => {
  data.value = val ? getData(2000) : getData(15);
});
</script>

<style lang="less" scoped>
.link {
  cursor: pointer;
}
</style>
