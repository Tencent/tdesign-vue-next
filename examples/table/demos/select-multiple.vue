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
        <p
          v-if="row.status === 0"
          class="status"
        >
          健康
        </p>
        <p
          v-if="row.status === 1"
          class="status unhealth"
        >
          异常
        </p>
      </template>
      <template #op-column>
        <p>操作</p>
      </template>
      <template #op="slotProps">
        <a
          class="link"
          @click="rehandleClickOp(slotProps)"
        >管理</a>
        <a
          class="link"
          @click="rehandleClickOp(slotProps)"
        >删除</a>
      </template>
    </t-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
    // disabled 参数：{row: RowData; rowIndex: number })
    disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,
    width: 50,
  },
  { colKey: 'instance', title: '集群名称', width: 150 },
  {
    colKey: 'status', title: '状态', width: 100, cell: 'status',
  },
  { colKey: 'owner', title: '管理员' },
  { colKey: 'description', title: '描述' },
  {
    colKey: 'op', width: 200, title: 'op-column', cell: 'op',
  },
];
const data = [
  {
    tid: 1, instance: 'JQTest1', status: 0, owner: 'jenny;peter', description: 'test',
  },
  {
    tid: '2', instance: 'JQTest2', status: 1, owner: 'jenny', description: 'test',
  },
  {
    tid: 3, instance: 'JQTest3', status: 0, owner: 'jenny', description: 'test',
  },
  {
    tid: 4, instance: 'JQTest4', status: 1, owner: 'peter', description: 'test',
  },
];
export default defineComponent({
  setup() {
    const selectedRowKeys = ref([1, '2']);

    const rehandleClickOp = ({ text, row }) => {
      console.log(text, row);
    };

    const rehandleSelectChange = (value, { selectedRowData }) => {
      selectedRowKeys.value = value;
      console.log(value, selectedRowData);
    };

    return {
      selectedRowKeys,
      columns,
      data,
      rehandleClickOp,
      rehandleSelectChange,
    };
  },
});
</script>

<style lang="less" scoped>
@import "@common/style/web/index";
.link {
  cursor: pointer;
  margin-right: 15px;
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
    content: "";
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
</style>
