<template>
  <div class="demo-container">
    <div class="item">
      <div style="margin: 16px">
        <t-checkbox v-model="allowMultipleSort">是否允许多字段排序</t-checkbox>
      </div>
      <!-- 非受控用法：不需要传 sort，或者只需要传 defaultSort: { sortBy: 'status', descending: true }），defaultSort 仅第一次有效 -->
      <!-- 非受控用法示例，代码有效，勿删 -->
      <t-table rowKey="id" :columns="columns" :data="data" :multipleSort="allowMultipleSort">
        <t-icon slot='op-column' name="descending-order"/>
        <template #status="{ row }">
          <p v-if="row.status === 0" class="status">健康</p>
          <p v-if="row.status === 1" class="status warning">警告</p>
          <p v-if="row.status === 2" class="status unhealth">异常</p>
        </template>
      </t-table>

      <!-- 受控用法示例，代码有效，勿删 -->
      <!-- <div style="margin: 16px">
        <span> 排序方式：{{ JSON.stringify(sort) }} </span>
      </div>
      <t-table rowKey="id" :columns="columns" :data="data" :sort="sort" @sort-change="sortChange" :multipleSort="allowMultipleSort">
        <t-icon slot='op-column' name="descending-order"/>
        <template #status="{ row }">
          <p v-if="row.status === 0" class="status">健康</p>
          <p v-if="row.status === 1" class="status warning">警告</p>
          <p v-if="row.status === 2" class="status unhealth">异常</p>
        </template>
      </t-table> -->
    </div>
  </div>
</template>

<script>
const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  { colKey: 'status', title: '状态', width: 100, sortType: 'all', sorter: (a, b) => a.status - b.status },
  { colKey: 'survivalTime', title: '存活时间(s)', width: 200, sortType: 'all', sorter: (a, b) => a.survivalTime - b.survivalTime },
  { colKey: 'owner', title: '管理员', width: 100 },
];

// 本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。
const data = [
  { id: 1, instance: 'JQTest1', status: 0, owner: 'jenny;peter', survivalTime: 1000 },
  { id: 2, instance: 'JQTest2', status: 1, owner: 'jenny', survivalTime: 1000 },
  { id: 3, instance: 'JQTest3', status: 2, owner: 'jenny', survivalTime: 500 },
  { id: 4, instance: 'JQTest4', status: 1, owner: 'peter', survivalTime: 1500 },
];

export default {
  data() {
    return {
      data,
      columns,
      sort: {},
      singleSort: {
        sortBy: 'status',
        descending: true,
      },
      multipleSorts: [{
        sortBy: 'status',
        descending: true,
      }],
      allowMultipleSort: false,
    };
  },
  watch: {
    allowMultipleSort: {
      immediate: true,
      handler(val) {
        this.sort = val ? this.multipleSorts : this.singleSort;
      },
    },
  },
  methods: {
    sortChange(sort, options) {
      this.sort = sort;
      console.log('#### sortChange:', sort, options);
    },
  },
};
</script>
<style lang="less">
@import '../../../common/style/web/_variables.less';
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
    color: @success-color;
    margin-left: 10px;
    &::before {
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      content: '';
      background-color: @success-color;
      width: 6px;
      height: 6px;
      margin-left: -10px;
      border-radius: 50%;
    }
  }
  .status.unhealth {
    color: @error-color;
    &::before {
      background-color: @error-color;
    }
  }
  .status.warning {
    color: @warning-color;
    &::before {
      background-color: @warning-color;
    }
  }
}
</style>
