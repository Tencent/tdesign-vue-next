<template>
  <div class="tdesign-demo-block-column-large tdesign-demo__table">
    <div>
      <t-radio-group v-model="asyncLoading" variant="default-filled">
        <t-radio-button value="load-more">加载更多</t-radio-button>
        <t-radio-button value="loading">加载中</t-radio-button>
        <t-radio-button value="loading-custom">自定义加载更多</t-radio-button>
        <t-radio-button value="">加载完成</t-radio-button>
      </t-radio-group>
    </div>

    <t-table
      rowKey="key"
      :columns="columns"
      :data="data"
      :asyncLoading="loadingNode"
      lazyLoad
      @async-loading-click="onAsyncLoadingClick"
    ></t-table>
  </div>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue';
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
const initialColumns = [
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
  {
    colKey: 'detail.email',
    title: '邮箱地址',
    ellipsis: true,
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
];
const data = ref(initialData);
const columns = ref(initialColumns);
const asyncLoading = ref('loading');
// eslint-disable-next-line
const loadingNode = computed(() => {
  return asyncLoading.value === 'loading-custom' ? customLoadingNode : asyncLoading.value;
});
// eslint-disable-next-line
const customLoadingNode = (h) => {
  return <div class="t-table__async-loading">这是自定义加载状态和内容</div>;
};
const onAsyncLoadingClick = ({ status }) => {
  if (status === 'load-more') {
    asyncLoading.value = 'loading';
  }
};
</script>
