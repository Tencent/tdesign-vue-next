<template>
  <div>
    <!-- expanded-row-keys 为受控属性 -->
    <!-- default-expanded-row-keys 为非受控属性 -->
    <t-table
      row-key='id'
      :columns="columns"
      :data="data"
      :expanded-row-keys="expandedRowKeys"
      :expanded-row="expandedRow"
      @expand-change="rehandleExpandChange"
    >
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
  { colKey: 'status', title: '状态', width: 100, cell: 'status' },
  { colKey: 'owner', title: '管理员' },
  { colKey: 'description', title: '描述' },
  { colKey: 'op', width: 200, title: 'op-column', cell: 'op' },
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
      expandedRowKeys: [1],
      // defaultExpandedRowKeys: ['2', 4],
      expandedRow: (h, { row }) => (
        <div class="more-detail">
          <p class="title"><b>集群名称:</b></p><p class="content">{row.instance}</p><br/>
          <p class="title"><b>管理员:</b></p><p class="content">{row.owner}</p><br/>
          <p class="title"><b>描述:</b></p><p class="content">{row.description}</p>
        </div>
      ),
    };
  },
  methods: {
    rehandleClickOp({ text, row }) {
      console.log(text, row);
    },
    rehandleExpandChange(value, { expandedRowData }) {
      this.expandedRowKeys = value;
      console.log('rehandleExpandChange', value, expandedRowData);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../../common/style/web/_variables.less';
/deep/ [class*='t-table-expandable-icon-cell'] .t-icon {
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
  > p {
    display: inline-block;
    margin: 5px;
  }
  > p.title {
    width: 100px;
  }
}
</style>
