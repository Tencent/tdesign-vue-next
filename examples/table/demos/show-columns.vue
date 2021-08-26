<template>
  <div>
    <t-table :columns="columns" :data="data" show-columns>
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status unhealth">异常</p>
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
const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  { colKey: 'status', title: '状态', width: 100, scopedSlots: { col: 'status' } },
  { colKey: 'owner', title: '管理员' },
  { colKey: 'description', title: '描述' },
  { colKey: 'op', width: 200, scopedSlots: { title: 'op-column', col: 'op' } },
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
      columns,
      data,
    };
  },
};
</script>

<style lang="less" scoped>
@import '@common/style/web/_variables.less';
:deep([class*='t-button']) .t-icon {
  background-color: transparent;
}
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
    content: '';
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
