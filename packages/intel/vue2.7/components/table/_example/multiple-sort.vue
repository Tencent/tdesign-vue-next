<template>
  <div class="demo-container">
    <div class="item">
      <p style="margin-left: 24px">排序：{{ sort }}</p>
      <br />
      <!-- 支持受控用法 ，也支持非受控用法 -->
      <t-table
        rowKey="index"
        :columns="columns"
        :data="data"
        :sort="sort"
        @sort-change="sortChange"
        multipleSort
        lazyLoad
      >
        <template #status="{ row }">
          <p v-if="row.status === 0" class="status">健康</p>
          <p v-if="row.status === 1" class="status warning">警告</p>
          <p v-if="row.status === 2" class="status unhealth">异常</p>
        </template>
      </t-table>
    </div>
  </div>
</template>

<script lang="jsx">
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialColumns = [
  { colKey: 'applicant', title: '申请人', width: '100' },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
    sortType: 'all',
    sorter: true,
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
    align: 'center',
    width: '140',
    sortType: 'all',
    sorter: true,
  },
  { colKey: 'channel', title: '签署方式', width: '120' },
  { colKey: 'detail.email', title: '邮箱地址', ellipsis: true },
  { colKey: 'createTime', title: '申请时间' },
];

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
      columns: initialColumns,
      sort: [
        {
          sortBy: 'status',
          descending: true,
        },
        {
          sortBy: 'time',
          descending: false,
        },
      ],
    };
  },
  methods: {
    sortChange(val) {
      this.sort = val;
      // Request: 发起远程请求进行排序
      console.log('发起远程请求进行排序（未模拟请求数据）');
    },
  },
};
</script>
<style lang="less">
/deep/ [class*='t-table-expandable-icon-cell'] .t-icon {
  background-color: transparent;
}
.demo-container {
  .title {
    font-size: 14px;
    line-height: 28px;
    display: block;
    margin: 10px 0;
    i {
      font-style: normal;
    }
  }
}
</style>
