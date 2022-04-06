<template>
  <div class="demo-container">
    <t-config-provider :global-locale="globalLocale">
      <div class="item">
        <div style="margin: 16px">
          <t-checkbox v-model="allowMultipleSort"> 是否允许多字段排序 </t-checkbox>
        </div>
        <!-- 本地数据排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法 -->
        <div style="margin: 16px">
          <span> 排序方式：{{ JSON.stringify(sort) }} </span>
        </div>
        <t-table
          row-key="id"
          :columns="columns"
          :data="data"
          :sort="sort"
          :multiple-sort="allowMultipleSort"
          @sort-change="sortChange"
          @data-change="dataChange"
        >
          <template #op-column>
            <t-icon name="descending-order" />
          </template>
          <template #status="{ row }">
            <p class="status" :class="['', 'warning', 'unhealth'][row.status]">
              {{ ['健康', '警告', '异常'][row.status] }}
            </p>
          </template>
        </t-table>
      </div>
    </t-config-provider>
  </div>
</template>

<script setup lang="jsx">
import { watch, ref } from 'vue';
import { CaretDownSmallIcon } from 'tdesign-icons-vue-next';

const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  {
    colKey: 'status',
    title: '状态',
    width: 100,
    sortType: 'all',
    sorter: (a, b) => a.status - b.status,
  },
  {
    colKey: 'survivalTime',
    title: '存活时间(s)',
    width: 200,
    sortType: 'all',
    sorter: (a, b) => a.survivalTime - b.survivalTime,
  },
  // { colKey: 'owner', title: '管理员', width: 100 },
];

// 本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。
const initData = new Array(4).fill(null).map((_, i) => ({
  id: i + 1,
  instance: `JQTest${i + 1}`,
  status: [0, 1, 2, 1][i % 3],
  owner: ['jenny;peter', 'jenny', 'peter'][i % 3],
  survivalTime: [1000, 1000, 500, 1500][i % 3],
}));

const data = ref([...initData]);
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
