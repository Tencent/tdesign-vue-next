<template>
  <div class="demo-container t-table-demo-sort">
    <div class="item">
      <!-- 拖拽排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法 -->

      <t-table
        row-key="id"
        :columns="columns"
        :data="data"
        sort-on-row-draggable
        @drag-sort="onDragSort"
      >
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
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  {
    colKey: 'status', title: '状态', width: 100,
  },
  {
    colKey: 'survivalTime', title: '存活时间(s)', width: 200,
  },
  { colKey: 'owner', title: '管理员', width: 100 },
];

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

    const onDragSort = ({ currentIndex, targetIndex }) => {
      const temp = data.value[currentIndex];
      data.value[currentIndex] = data.value[targetIndex];
      data.value[targetIndex] = temp;
    };

    return {
      data,
      columns,
      onDragSort,
    };
  },
});
</script>
<style scoped lang="less">
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
    color: #00A870;
    margin-left: 10px;
    &::before {
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      content: '';
      background-color: #00A870;
      width: 6px;
      height: 6px;
      margin-left: -10px;
      border-radius: 50%;
    }
  }
  .status.unhealth {
    color: #E34D59;
    &::before {
      background-color: #E34D59;
    }
  }
  .status.warning {
    color: #ED7B2F;
    &::before {
      background-color: #ED7B2F;
    }
  }
}
</style>
