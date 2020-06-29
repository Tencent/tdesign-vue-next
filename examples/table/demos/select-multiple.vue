<template>
  <div>
    <t-table :columns="columns" :data="data" :selected-row-keys="selectedRowKeys"
             @select-change="rehandleSelectChange">
      <template #status="{ text }">
        <p v-if="text === 0" class="status">健康</p>
        <p v-if="text === 1" class="status unhealth">异常</p>
      </template>
      <template #op-column><p>操作</p></template>
      <template #op="slotProps">
        <a class="link" @click="rehandleClickOp(slotProps)">管理</a>
        <a class="link" @click="rehandleClickOp(slotProps)">删除</a>
      </template>
    </t-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRowKeys: [1, '2'],
      columns: [
        { colKey: 'row-selection', type: 'multiple', width: 50 },
        { colKey: 'instance', title: '集群名称', width: 150 },
        { colKey: 'status', title: '状态', width: 100 },
        { colKey: 'owner', title: '管理员' },
        { colKey: 'description', title: '描述' },
        { colKey: 'op', width: 200, slots: { title: 'op-column' } },
      ],
      data: [
        { id: 1, instance: 'JQTest1', status: 0, owner: 'jenny;peter', description: 'test' },
        { id: '2', instance: 'JQTest2', status: 1, owner: 'jenny', description: 'test' },
        { id: 3, instance: 'JQTest3', status: 0, owner: 'jenny', description: 'test' },
        { id: 4, instance: 'JQTest4', status: 1, owner: 'peter', description: 'test' },
      ],
    };
  },
  methods: {
    rehandleClickOp({ text, record }) {
      console.log(text, record);
    },
    rehandleSelectChange({ selectedRowKeys, selectedRowData }) {
      this.selectedRowKeys = selectedRowKeys;
      console.log(selectedRowKeys, selectedRowData);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../common/style/web/index";
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
