<template>
  <div>
    <t-table :columns="columns" :data="data" :row-expand="rowExpand">
      <template #status="text">
        <p v-if="text === 0" class="status">健康</p>
        <p v-if="text === 1" class="status unhealth">异常</p>
      </template>
      <template #op="text, record">
        <a class="link" @click="clickButton({text, record})">管理</a>
        <a class="link" @click="clickButton({text, record})">删除</a>
      </template>
    </t-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { colKey: 'instance', title: '集群名称', width: 150 },
        { colKey: 'status', title: '状态', width: 100 },
        { colKey: 'owner', title: '管理员' },
        { colKey: 'description', title: '描述' },
        { colKey: 'op', title: '操作', width: 200 },
      ],
      data: [
        { id: 1, instance: 'JQTest1', status: 0, owner: 'jenny;peter', description: 'test' },
        { id: '2', instance: 'JQTest2', status: 1, owner: 'jenny', description: 'test' },
        { id: 3, instance: 'JQTest3', status: 0, owner: 'jenny', description: 'test' },
        { id: 4, instance: 'JQTest4', status: 1, owner: 'peter', description: 'test' },
      ],
      rowExpand: {
        expandedRowKeys: [1, '2'],
        expandedRowRender: (record, index) => <p>{index}:{record.description}</p>,

      },
    };
  },
  methods: {
    clickButton({ text, record }) {
      console.log(text, record);
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
