<template>
  <div>
    <!-- 支持非受控属性 default-selected-row-keys -->
    <!-- 支持语法糖 selected-row-keys.sync -->
    <t-table
      row-key="tid"
      :columns="columns"
      :data="data"
      :selected-row-keys="selectedRowKeys"
      @select-change="rehandleSelectChange"
    >
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status unhealth">异常</p>
      </template>
      <template #op-column>
        <p>操作</p>
      </template>
      <template #op="slotProps">
        <a class="link" @click="rehandleClickOp(slotProps)">管理</a>
        <a class="link" @click="rehandleClickOp(slotProps)">删除</a>
      </template>
    </t-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
    // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删）。disabled 参数：{row: RowData; rowIndex: number })
    // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
    // disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,

    // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删）
    // 这种方式禁用行选中，行文本不会变灰
    checkProps: ({ rowIndex }) => ({ disabled: rowIndex % 2 !== 0 }),
    width: 50,
  },
  { colKey: 'instance', title: '集群名称', width: 150 },
  {
    colKey: 'status',
    title: '状态',
    width: 100,
    cell: 'status',
  },
  { colKey: 'owner', title: '管理员' },
  { colKey: 'description', title: '描述' },
  {
    colKey: 'op',
    width: 200,
    title: 'op-column',
    cell: 'op',
  },
];

const data = new Array(5).fill(null).map((item, index) => ({
  tid: index + 100,
  instance: `JQTest${index + 1}`,
  status: index % 2,
  owner: 'jenny;peter',
  description: 'test',
}));

const selectedRowKeys = ref([3, '2']);

const rehandleClickOp = ({ text, row }) => {
  console.log(text, row);
};

const rehandleSelectChange = (value, { selectedRowData }) => {
  selectedRowKeys.value = value;
  console.log(value, selectedRowData);
};
</script>

<style lang="less" scoped>
.link {
  cursor: pointer;
  margin-right: 15px;
}
.status {
  position: relative;
  color: #00a870;
  margin-left: 10px;
  &::before {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    content: '';
    background-color: #00a870;
    width: 6px;
    height: 6px;
    margin-left: -10px;
    border-radius: 50%;
  }
}
.status.unhealth {
  color: #e34d59;
  &::before {
    background-color: #e34d59;
  }
}
</style>
