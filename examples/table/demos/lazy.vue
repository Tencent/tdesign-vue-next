<template>
  <div class="demo-container">
    <div class="item">
      <t-button theme="default" style="margin-top: 10px" @click="reset"> 列表恢复初始状态 </t-button><br /><br />
      <t-table
        row-key="id"
        :columns="columns"
        :data="data"
        :height="300"
        :scroll="{ type: 'lazy', bufferSize: 10 }"
        bordered
      />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue';

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
    colKey: 'survivalTime',
    title: '存活时间(s)',
  },
  { colKey: 'owner', title: '管理员' },
];

// 本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。
const initData = [
  {
    id: 1,
    instance: '当前行高度2行,当前行高度2行,当前行高度2行,当前行高度2行',
    status: 0,
    owner: 'jenny;peter',
    survivalTime: 1000,
  },
  {
    id: 2,
    instance: '当前行高度2行,当前行高度2行,当前行高度2行,当前行高度2行',
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

const data = ref([...testData]);
const reset = () => {
  data.value = [];
  setTimeout(() => {
    data.value = testData;
  });
};
</script>
