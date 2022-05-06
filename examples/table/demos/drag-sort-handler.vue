<template>
  <div class="demo-container t-table-demo-sort">
    <div>
      <t-checkbox v-model="loading"> 加载状态 </t-checkbox>
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

const onDragSort = ({ currentIndex, targetIndex, current, target, currentData, e }) => {
  console.log('交换行', currentIndex, targetIndex, current, target, currentData, e);
  data.value = currentData;
};
</script>
