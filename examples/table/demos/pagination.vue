<template>
  <div>
    <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      :pagination="pagination"
      @page-change="onPageChange"
      @change="onChange"
    />
  </div>
</template>
<script setup>
import { reactive } from 'vue';

const data = [];
const TOTAL = 60;
for (let i = 0; i < TOTAL; i++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}

const columns = [
  {
    align: 'center',
    width: '100',
    className: 'row',
    colKey: 'index',
    title: '序号',
  },
  {
    width: 100,
    colKey: 'platform',
    title: '平台',
  },
  {
    colKey: 'type',
    title: '类型',
  },
  {
    colKey: 'default',
    title: '默认值',
  },
  {
    colKey: 'needed',
    title: '是否必传',
  },
  {
    colKey: 'detail.position',
    title: '详情信息',
    width: 200,
    ellipsis: true,
  },
  {
    colKey: 'description',
    title: '说明',
  },
];

// 非受控用法
const pagination = reactive({
  // current: 2,
  // pageSize: 5,
  defaultCurrent: 2,
  defaultPageSize: 5,
  total: TOTAL,
  showJumper: true,
});

const onChange = (params, context) => {
  console.log('change', params, context);
};

const onPageChange = (pageInfo, context) => {
  console.log('page-change', pageInfo, context);
  // 受控用法需要下面两行代码
  // pagination.current = pageInfo.current;
  // pagination.pageSize = pageInfo.pageSize;
};
</script>
