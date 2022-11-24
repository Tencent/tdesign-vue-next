<template>
  <div class="demo-container">
    <t-config-provider :global-config="globalLocale">
      <div class="item">
        <div style="margin: 16px">
          <t-checkbox v-model="allowMultipleSort"> 是否允许多字段排序 </t-checkbox>
        </div>
        <!-- 本地数据排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法 -->
        <div style="margin: 16px">
          <span> 排序方式：{{ JSON.stringify(sort) }} </span>
        </div>
        <t-table
          row-key="index"
          :columns="columns"
          :data="data"
          :sort="sort"
          :multiple-sort="allowMultipleSort"
          @sort-change="sortChange"
          @data-change="dataChange"
        >
        </t-table>
      </div>
    </t-config-provider>
  </div>
</template>

<script setup lang="jsx">
import { watch, ref } from 'vue';
import {
  CheckCircleFilledIcon,
  CaretDownSmallIcon,
  ErrorCircleFilledIcon,
  CloseCircleFilledIcon,
} from 'tdesign-icons-vue-next';

const statusNameListMap = {
  0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
  1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
  2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
};

const initialData = [];
for (let i = 0; i < 5; i++) {
  initialData.push({
    index: i,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 3, 1, 4][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  });
}

const columns = ref([
  { colKey: 'applicant', title: '申请人', width: '100' },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
    sortType: 'all',
    sorter: (a, b) => a.status - b.status,
    cell: (h, { col, row }) => {
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
          {statusNameListMap[row.status].icon}
          {statusNameListMap[row.status].label}
        </t-tag>
      );
    },
  },
  {
    title: '申请耗时(天)',
    colKey: 'time',
    width: '140',
    align: 'center',
    sortType: 'all',
    sorter: (a, b) => a.money - b.money,
  },
  { colKey: 'channel', title: '签署方式', width: '120' },
  { colKey: 'email', title: '邮箱地址', ellipsis: true },
  { colKey: 'createTime', title: '申请时间', width: '150' },
]);

const data = ref([...initialData]);
const sort = ref({});
const singleSort = ref({
  sortBy: 'status',
  descending: true,
});

const multipleSorts = ref([
  {
    sortBy: 'status',
    descending: true,
  },
]);

const allowMultipleSort = ref(false);
const globalLocale = ref({
  table: {
    sortIcon: (h) => h && <CaretDownSmallIcon size="16px" />,
  },
});

watch(
  () => allowMultipleSort.value,
  (val) => {
    sort.value = val ? multipleSorts.value : singleSort.value;
  },
);

const sortChange = (sortVal, options) => {
  console.log('sort-change', sortVal, options);
  // sort.value 和 data.value 的赋值都是必须
  sort.value = sortVal;
  data.value = options.currentDataSource;
};

const dataChange = (data) => {
  // 除了 sortChange，也可以在这里对 data.value 进行赋值
  // data.value = data;
  console.log('data-change', data);
};
</script>

<style lang="less">
:deep([class*='t-table-expandable-icon-cell']) .t-icon {
  background-color: transparent;
}
/** 修正自定义排序图标位置 */
.t-table-demo-sort .t-table-sort-desc {
  margin-top: -12px;
}

.demo-container {
  .title {
    font-size: 14px;
    line-height: 28px;
    display: block;
    margin: 10px 0px;
    i {
      font-style: normal;
    }
  }
  .status {
    position: relative;
    color: #00a870;
    margin-left: 10px;
    &::before {
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      content: '';
      background-color: #00a870;
      width: 6px;
      height: 6px;
      margin-left: -10px;
      border-radius: 50%;
    }
  }
  .status.unhealth {
    color: #e34d59;
    &::before {
      background-color: #e34d59;
    }
  }
  .status.warning {
    color: #ed7b2f;
    &::before {
      background-color: #ed7b2f;
    }
  }
}
</style>
