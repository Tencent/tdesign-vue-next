<template>
  <div class="demo-container">
    <div class="item">
      <t-table row-key="id" :columns="columns" :data="data" :height="200" :scroll="{ type: 'lazy', bufferSize: 10 }">
        <template #op-column>
          <t-icon name="descending-order" />
        </template>
        <template #status="{ row }">
          <p class="status" :class="['', 'warning', 'unhealth'][row.status]">
            {{ ['健康', '警告', '异常'][row.status] }}
          </p>
        </template>
      </t-table>
      <t-button theme="default" style="margin-top: 10px" @click="reset"> 列表恢复初始状态 </t-button>
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent, watch, ref } from 'vue';

const columns = [
  {
    colKey: 'id',
    title: 'id',
  },
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
];
const times = Array.from(new Array(1000), () => ''); // 测试共计1k条数据
const testData = [];
times.forEach((item, i) => {
  const k = i % 10;
  testData[i] = { ...initData[k], id: i + 1 };
});
export default defineComponent({
  setup() {
    const data = ref([...testData]);
    const reset = () => {
      data.value = [];
      setTimeout(() => {
        data.value = testData;
      });
    };

    return {
      data,
      columns,
      reset,
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
