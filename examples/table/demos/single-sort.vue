<template>
  <div class="demo-container">
    <!-- 非受控用法：不需要传 sort，或者只需要传 defaultSort: { sortBy: 'status', descending: true }），defaultSort 仅第一次有效 -->
    <!-- 非受控用法，示例代码有效，勿删 -->
    <!-- <t-table rowKey="id" :columns="columns" :data="data" @sort-change="defaultSortChange">
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status warning">警告</p>
        <p v-if="row.status === 2" class="status unhealth">异常</p>
      </template>
    </t-table> -->

    <!-- 受控用法，示例代码有效，勿删 -->
    <p>排序：{{ sort }}</p>
    <br /><br />
    <t-table
      row-key="id"
      :columns="columns"
      :data="data"
      :sort="sort"
      bordered
      @sort-change="sortChange"
      @change="onChange"
    >
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status warning">警告</p>
        <p v-if="row.status === 2" class="status unhealth">异常</p>
      </template>
    </t-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  {
    colKey: 'status',
    title: '状态',
    width: 100,
    sortType: 'all',
    sorter: true,
  },
  {
    colKey: 'survivalTime',
    title: '存活时间(s)',
    width: 200,
    sortType: 'all',
    sorter: true,
  },
  { colKey: 'owner', title: '管理员', width: 100 },
];

const initData = new Array(4).fill(null).map((_, i) => ({
  id: i + 1,
  instance: `JQTest${i + 1}`,
  status: [0, 1, 2, 1][i % 3],
  owner: ['jenny;peter', 'jenny', 'peter'][i % 3],
  survivalTime: [1000, 1000, 500, 1500][i % 3],
}));

const sort = ref({
  sortBy: 'status',
  descending: true,
});

const data = ref([...initData]);

const request = (sort) => {
  // 模拟异步请求，进行数据排序
  const timer = setTimeout(() => {
    if (sort) {
      data.value = data.value
        .concat()
        .sort((a, b) => (sort.descending ? b[sort.sortBy] - a[sort.sortBy] : a[sort.sortBy] - b[sort.sortBy]));
    } else {
      data.value = data.value.concat();
    }
    clearTimeout(timer);
  }, 100);
};

const sortChange = (val) => {
  sort.value = val;
  request(val);
};

// 排序、分页、过滤等发生变化时会出发 change 事件
const onChange = (info, context) => {
  console.log('change', info, context);
};

// 非受控用法，不需要传递 sort 给 Table 组件，因而此处无需执行 this.sort = sort 进行赋值
const defaultSortChange = (sort) => {
  this.request(sort);
};
</script>

<style lang="less">
:deep([class*='t-table-expandable-icon-cell']) .t-icon {
  background-color: transparent;
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
