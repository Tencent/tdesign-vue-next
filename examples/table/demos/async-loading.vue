<template>
  <div>
    <t-table
      style="overflow: auto;"
      :columns="columns"
      :data="data"
      :asyncLoading="asyncLoadingHandler"
      :busy="busy"
      :height="200"
    ></t-table>
  </div>
</template>

<script>
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 20,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 31,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const columns = [
  {
    title: 'Name',
    colKey: 'name',
    width: '100',
  },
  {
    title: 'Age',
    colKey: 'age',
    width: '100',
  },
  {
    title: 'Address',
    colKey: 'address',
    width: '250',
  },
];

export default {
  data() {
    return {
      data,
      columns,
      busy: false,
    };
  },
  methods: {
    asyncLoadingHandler() {
      return new Promise((resolve) => {
        if (this.data.length > 20) {
          this.busy = true;
          resolve();
          return;
        }
        // mock api
        setTimeout(() => {
          this.data.push(...data);
          resolve();
        }, 1000);
      });
    },
  },
};
</script>
