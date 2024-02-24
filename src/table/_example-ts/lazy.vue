<template>
  <div class="demo-container">
    <div class="item">
      <t-button theme="default" style="margin-top: 10px" @click="reset"> 列表恢复初始状态 </t-button><br /><br />
      <t-table
        row-key="id"
        :columns="columns"
        :data="data"
        :height="300"
        :scroll="{ type: 'lazy', bufferSize: 10 }"
        bordered
        lazy-load
      />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TableProps, ButtonProps } from 'tdesign-vue-next';
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
const columns: TableProps['columns'] = [
  {
    colKey: 'applicant',
    title: '申请人',
    width: '100',
  },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
    cell: (h, { rowIndex }) => {
      const status = rowIndex % 3;
      return (
        <t-tag shape="round" theme={statusNameListMap[status].theme} variant="light-outline">
          {statusNameListMap[status].icon}
          {statusNameListMap[status].label}
        </t-tag>
      );
    },
  },
  {
    colKey: 'matters',
    title: '申请事项',
    width: '140',
  },
  {
    colKey: 'detail.email',
    title: '邮箱地址',
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
];

// 本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。
const initialData: TableProps['data'] = [];
for (let i = 0; i < 10; i++) {
  initialData.push({
    id: i + 1,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    },
    matters: ['部分宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 3, 1, 4][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  });
}

// 为了使得表格滚动更加平稳，建议指定row-height参数值为接近表格的平均行高
const times = Array.from(new Array(1000), () => ''); // 测试共计1k条数据
const testData: TableProps['data'] = [];
times.forEach((item, i) => {
  const k = i % 10;
  testData[i] = {
    ...initialData[k],
    id: i + 1,
  };
});
const data = ref<TableProps['data']>([...testData]);
const reset: ButtonProps['onClick'] = () => {
  data.value = [];
  setTimeout(() => {
    data.value = testData;
  });
};
</script>
