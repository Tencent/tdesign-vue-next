<template>
  <div class="demo-container">
    <t-locale-provider :global-locale="globalLocale">
      <div class="item">
        <div style="margin: 16px">
          <t-checkbox v-model="allowMultipleSort">
            是否允许多字段排序
          </t-checkbox>
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
            <p
              class="status"
              :class="['', 'warning', 'unhealth'][row.status]"
            >
              {{ ['健康', '警告', '异常'][row.status] }}
            </p>
          </template>
        </t-table>
      </div>
    </t-locale-provider>
  </div>
</template>

<script lang="jsx">
import { defineComponent, watch, ref } from 'vue';
import TIconCarretDownSmall from '@tencent/tdesign-vue-next/icon/caret-down-small';

const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  {
    colKey: 'status', title: '状态', width: 100, sortType: 'all', sorter: (a, b) => a.status - b.status,
  },
  {
    colKey: 'survivalTime', title: '存活时间(s)', width: 200, sortType: 'all', sorter: (a, b) => a.survivalTime - b.survivalTime,
  },
  { colKey: 'owner', title: '管理员', width: 100 },
];

// 本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。
const initData = [
  {
    id: 1, instance: 'JQTest1', status: 0, owner: 'jenny;peter', survivalTime: 1000,
  },
  {
    id: 2, instance: 'JQTest2', status: 1, owner: 'jenny', survivalTime: 1000,
  },
  {
    id: 3, instance: 'JQTest3', status: 2, owner: 'jenny', survivalTime: 500,
  },
  {
    id: 4, instance: 'JQTest4', status: 1, owner: 'peter', survivalTime: 1500,
  },
];

export default defineComponent({
  setup() {
    const data = ref([...initData]);
    const sort = ref({});
    const singleSort = ref({
      sortBy: 'status',
      descending: true,
    });

    const multipleSorts = ref([{
      sortBy: 'status',
      descending: true,
    }]);

    const allowMultipleSort = ref(false);
    const globalLocale = ref({
      table: {
        sortIcon: (h) => h && <TIconCarretDownSmall size='16px' />,
      },
    });

    watch(() => allowMultipleSort.value, (val) => {
      sort.value = val ? multipleSorts.value : singleSort.value;
    });

    const sortChange = (sortVal, options) => {
      sort.value = sortVal;
      console.log('#### sortChange:', sortVal, options);
    };

    const dataChange = (dataVal) => {
      data.value = dataVal;
    };

    return {
      data,
      columns,
      sort,
      sortChange,
      dataChange,
      globalLocale,
      allowMultipleSort,
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
