<template>
  <div>
    <t-table :columns="columns" :data="data" :row-expand="rowExpand">
      <template #status="text">
        <p v-if="text === 0" class="status">健康</p>
        <p v-if="text === 1" class="status unhealth">异常</p>
      </template>
      <template #op-column><p>操作</p></template>
      <template #op="text, record">
        <a class="link" @click="clickOp({text, record})">管理</a>
        <a class="link" @click="clickOp({text, record})">删除</a>
      </template>
    </t-table>
  </div>
</template>

<script>
const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  { colKey: 'status', title: '状态', width: 100 },
  { colKey: 'owner', title: '管理员' },
  { colKey: 'description', title: '描述' },
  { colKey: 'op', width: 200, slots: { title: 'op-column' } },
];
const data = [
  { id: 1, instance: 'JQTest1', status: 0, owner: 'jenny;peter', description: 'test' },
  { id: '2', instance: 'JQTest2', status: 1, owner: 'jenny', description: 'test' },
  { id: 3, instance: 'JQTest3', status: 0, owner: 'jenny', description: 'test' },
  { id: 4, instance: 'JQTest4', status: 1, owner: 'peter', description: 'test' },
];
export default {
  data() {
    return {
      columns, data,
      rowExpand: {
        defaultExpandedRowKeys: [1, '2'],
        // expandedRowKeys: [1, '2'],
        expandedRowRender: record => <div class="more-detail">
          <p class="title"><b>集群名称:</b></p><p class="content">{record.instance}</p><br/>
          <p class="title"><b>管理员:</b></p><p class="content">{record.owner}</p><br/>
          <p class="title"><b>描述:</b></p><p class="content">{record.description}</p>
        </div>,
        onChange(record = {}, index, expanded) {
          console.log(record, index, expanded);
        },
      },
    };
  },
  methods: {
    clickOp({ text, record }) {
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
.more-detail {
  margin: 0px 100px;
  > p {
    display: inline-block;
    margin: 5px;
  }
  > p.title {
    width: 100px;
  }
}
</style>
