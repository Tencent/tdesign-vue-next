<template>
  <div class="demo-container">
    <!-- 受控用法，示例代码有效，勿删 -->
    <t-table bordered row-key="id" :columns="columns" :data="data" :sort="sort" @sort-change="sortChange">
      <template #op-column>
        <t-icon name="descending-order" />
      </template>
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status warning">警告</p>
        <p v-if="row.status === 2" class="status unhealth">异常</p>
      </template>
    </t-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

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
const initData = [
  {
    id: 1,
    instance: 'JQTest1',
    status: 0,
    owner: 'jenny;peter',
    survivalTime: 1000,
  },
  {
    id: 2,
    instance: 'JQTest2',
    status: 1,
    owner: 'jenny',
    survivalTime: 1000,
  },
  {
    id: 3,
    instance: 'JQTest3',
    status: 2,
    owner: 'jenny',
    survivalTime: 500,
  },
  {
    id: 4,
    instance: 'JQTest4',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
];

export default defineComponent({
  setup() {
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

    return {
      data,
      columns,
      sort,
      sortChange,
    };
  },
});
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
