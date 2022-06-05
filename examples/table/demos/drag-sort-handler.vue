<template>
  <div class="demo-container t-table-demo-sort">
    <div>
      <t-checkbox v-model="loading"> 加载状态 </t-checkbox>
      <t-button size="small" variant="base" @click="resetData">重置数据</t-button>
    </div>
    <div class="item">
      <!-- 拖拽排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法 -->
      <t-table
        row-key="id"
        :columns="columns"
        :data="data"
        :loading="loading"
        drag-sort="row-handler"
        @drag-sort="onDragSort"
      >
        <template #status="{ row }">
          <p class="status" :class="['', 'warning', 'unhealth'][row.status]">
            {{ ['健康', '警告', '异常'][row.status] }}
          </p>
        </template>
      </t-table>
    </div>
  </div>
</template>

<script lang="jsx" setup>
import { ref } from 'vue';
import { MoveIcon } from 'tdesign-icons-vue-next';

// 拖拽排序场景中：调整某个元素的顺序
function swapDragArrayElement(data, currentIndex, targetIndex) {
  const newData = [...data];
  if (targetIndex - currentIndex > 0) {
    newData.splice(targetIndex + 1, 0, newData[currentIndex]);
    newData.splice(currentIndex, 1);
  } else {
    newData.splice(targetIndex, 0, newData[currentIndex]);
    newData.splice(currentIndex + 1, 1);
  }
  return newData;
}

const columns = [
  {
    colKey: 'drag', // 列拖拽排序必要参数
    title: '排序',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (h) => (
      <span>
        <MoveIcon />
      </span>
    ),
    width: 80,
  },
  { colKey: 'instance', title: '集群名称' },
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

const initialData = new Array(4).fill(5).map((_, i) => ({
  id: i + 1,
  instance: `JQTest${i + 1}`,
  status: [0, 1, 2, 1][i % 4],
  owner: ['jenny;peter', 'jenny', 'jenny', 'peter'][i % 4],
  survivalTime: [1000, 1000, 500, 1500][i % 4],
}));

const loading = ref(false);
const data = ref([...initialData]);

const resetData = () => {
  data.value = [];
};

// currentData is going to be deprecated
const onDragSort = ({ currentIndex, targetIndex, current, target, data, newData, e }) => {
  console.log('交换行', currentIndex, targetIndex, current, target, data, newData, e);
  data.value = newData;
};
</script>
