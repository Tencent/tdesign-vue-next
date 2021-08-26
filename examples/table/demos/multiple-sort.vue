<template>
  <div class="demo-container">
    <div class="item">
      <div style="margin: 16px">
        排序方式：{{ JSON.stringify(sort) }}
      </div>
      <!-- 支持受控用法 ，也支持非受控用法 -->
      <t-table rowKey="id" :columns="columns" :data="data" :sort="sort" @sort-change="sortChange" multipleSort>
        <template #status="{ row }">
          <p v-if="row.status === 0" class="status">健康</p>
          <p v-if="row.status === 1" class="status warning">警告</p>
          <p v-if="row.status === 2" class="status unhealth">异常</p>
        </template>
      </t-table>
    </div>
  </div>
</template>

<script>
const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  { colKey: 'status', title: '状态', width: 100, sortType: 'all', sorter: true },
  { colKey: 'survivalTime', title: '存活时间(s)', width: 200, sortType: 'all', sorter: true },
  { colKey: 'owner', title: '管理员', width: 100 },
];
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
      sort: [{
        sortBy: 'status',
        descending: true,
      }, {
        sortBy: 'survivalTime',
        descending: false,
      }],
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
@import '@common/style/web/_variables.less';
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
