<template>
  <div>
    <div class="table-operations">
      <t-button @click="clearFilters">Clear filters</t-button>
    </div>
    <t-table :columns="columns" :data="data" @filter-change="handleFilterChange" />
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
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

export default {
  data() {
    return {
      data,
      filteredInfo: null,
    };
  },
  computed: {
    columns() {
      let { filteredInfo } = this;
      filteredInfo = filteredInfo || {};
      const columns = [
        {
          title: 'Name',
          colKey: 'name',
          key: 'name',
          filters: [
            { label: 'Joe', value: 'Joe' },
            { label: 'Jim', value: 'Jim' },
          ],
          filteredValue: filteredInfo.name || null,
          onFilter: (value, record) => record.name.includes(value),
          filterMultiple: false,
        },
        {
          title: 'Age',
          colKey: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          colKey: 'address',
          key: 'address',
          filters: [
            { label: 'London', value: 'London' },
            { label: 'New York', value: 'New York' },
          ],
          filteredValue: filteredInfo.address || null,
          onFilter: (value, record) => record.address.includes(value),
        },
      ];
      return columns;
    },
  },
  methods: {
    handleFilterChange(filters) {
      console.log('Various parameters', filters);
      this.filteredInfo = filters;
    },
    clearFilters() {
      this.filteredInfo = null;
    },
  },
};
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
