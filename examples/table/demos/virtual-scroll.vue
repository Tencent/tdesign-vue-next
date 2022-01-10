<template>
  <div class="demo-container">
    <div class="item">
      <t-table row-key="id" :columns="columns" :data="data" :height="150" virtual-scroll>
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
  </div>
</template>

<script lang="jsx">
import { defineComponent, watch, ref } from 'vue';
import { CaretDownSmallIcon } from 'tdesign-icons-vue-next';

const columns = [
  {
    colKey: 'instance',
    title: '集群名称',
  },
  {
    colKey: 'status',
    title: '状态',
  },
  {
    colKey: 'survivalTime',
    title: '存活时间(s)',
  },
  { colKey: 'owner', title: '管理员' },
];

// 本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。
const initData = [
  {
    id: 1,
    instance: 'JQTest1当前行高度2行当前行高度2行',
    status: 0,
    owner: 'jenny;peter',
    survivalTime: 1000,
  },
  {
    id: 2,
    instance: 'JQTest2当前行高度多行当前行高度多行当前行高度多行当前行高度多行',
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
  {
    id: 5,
    instance: 'JQTest5',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 6,
    instance: 'JQTest6',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },

  {
    id: 7,
    instance: 'JQTest7',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 8,
    instance: 'JQTest8',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 9,
    instance: 'JQTest9',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 10,
    instance: 'JQTest10',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 11,
    instance: 'JQTest11',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 12,
    instance: 'JQTest12',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 13,
    instance: 'JQTest13',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 14,
    instance: 'JQTest14',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 15,
    instance: 'JQTest15',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 16,
    instance: 'JQTest16',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 17,
    instance: 'JQTest17',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 18,
    instance: 'JQTest18',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 19,
    instance: 'JQTest19',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },

  {
    id: 20,
    instance: 'JQTest20',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
];

export default defineComponent({
  setup() {
    const data = ref([...initData]);
    const sort = ref({});

    return {
      data,
      columns,
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
