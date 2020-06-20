<template>
  <t-table :columns="columns" :data="data" :row-expand="rowExpand"></t-table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { colKey: 'instance', title: '集群名称' },
        { colKey: 'status', title: '状态' },
        { colKey: 'owner', title: '管理员' },
        { colKey: 'description', title: '描述' },
        { colKey: 'op', title: '操作' },
      ],
      data: [
        { id: 1, instance: 'JQTest1', status: 0, owner: 'jenny;peter', description: 'test' },
        { id: '2', instance: 'JQTest2', status: 1, owner: 'jenny', description: 'test' },
        { id: 3, instance: 'JQTest3', status: 0, owner: 'jenny', description: 'test' },
        { id: 4, instance: 'JQTest4', status: 1, owner: 'peter', description: 'test' },
      ],
      rowExpand: {
        expandedRowKeys: [1, '2'],
        expandedRowRender(record, index) {
          return <p>{index}:{record.description}</p>;
        },
      },
    };
  },
};
</script>
