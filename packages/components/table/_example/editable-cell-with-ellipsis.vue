<template>
  <div>
    <h3>Editable Cell with Ellipsis Test</h3>
    <p>This example tests that cells with ellipsis enabled can enter edit mode properly when content is long.</p>
    <t-table
      ref="tableRef"
      row-key="key"
      :columns="columns"
      :data="data"
      bordered
      table-layout="fixed"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue';
import { Input, MessagePlugin } from 'tdesign-vue-next';

const initData = [
  {
    key: '1',
    name: 'John Doe',
    description: 'This is a very long description that should trigger ellipsis display when the cell width is limited. The content is intentionally long to test the interaction between ellipsis and editable cell functionality.',
  },
  {
    key: '2',
    name: 'Jane Smith',
    description: 'Short description',
  },
  {
    key: '3',
    name: 'Bob Johnson',
    description: 'Another very long description that will be truncated with ellipsis. This tests whether the cell can properly enter edit mode when the content is long enough to trigger the ellipsis display.',
  },
];

const data = ref([...initData]);

const columns = computed(() => [
  {
    title: 'Name',
    colKey: 'name',
    width: 150,
    edit: {
      component: Input,
      props: {
        clearable: true,
      },
      onEdited: (context) => {
        const newData = [...data.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        data.value = newData;
        MessagePlugin.success('Name updated successfully');
      },
    },
  },
  {
    title: 'Description (with ellipsis)',
    colKey: 'description',
    width: 250,
    // Enable ellipsis
    ellipsis: true,
    edit: {
      component: Input,
      props: {
        clearable: true,
      },
      onEdited: (context) => {
        const newData = [...data.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        data.value = newData;
        MessagePlugin.success('Description updated successfully');
      },
    },
  },
]);
</script>

<style scoped>
h3 {
  margin-bottom: 16px;
}
p {
  margin-bottom: 16px;
  color: #666;
}
</style>
