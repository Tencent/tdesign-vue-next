<template>
  <div>
    <div class="table-operations" style="margin: 16px">
      <t-button @click="setFilters">清除筛选条件</t-button>
      <span style="padding-left: 36px">已选筛选条件：{{ filterValue }}</span>
    </div>

    <!-- 可以使用语法糖 .sync ，此处代码有效，勿删！ 其中，filterIcon 用于自定义筛选图标-->
    <!-- <t-table
      rowKey='key'
      :columns="columns"
      :data="data"
      :filter-value.sync="filterValue"
      :filterIcon="filterIcon"
    /> -->

    <!-- filter-value.sync 等同于 filter-value + filter-change -->
    <t-table
      rowKey='key'
      :columns="columns"
      :data="data"
      :filter-value="filterValue"
      @filter-change="onFilterChange"
    />

  </div>
</template>

<script>
// TODO: 在此处处理 Data，尽量使用和 antd 不同的数据，数据处理完成后，删除该条注释
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 62,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 12,
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
      filterValue: {},
      columns: [
        {
          title: 'Name',
          colKey: 'name',
          // 单选过滤配置
          filter: {
            type: 'single',
            list: [
              { label: 'anyone', value: '' },
              { label: 'Joe Black', value: 'Joe Black' },
              { label: 'John Brown', value: 'John Brown' },
            ],
          },
        },
        {
          title: 'Age',
          colKey: 'age',
          // 多选过滤配置
          filter: {
            type: 'multiple',
            list: [
              { label: 'All', checkAll: true },
              { label: '32', value: 32 },
              { label: '12', value: 12 },
            ],
          },
        },
        {
          title: 'Address',
          colKey: 'address',
          // 输入框过滤配置
          filter: {
            type: 'input',
            props: { placeholder: '输入关键词过滤' },
          },
        },
      ],
    };
  },
  methods: {
    onFilterChange(filters) {
      this.filterValue = filters;
      // 模拟异步请求进行数据过滤
      this.request(filters);
    },
    setFilters() {
      this.filterValue = {};
      this.data = data;
    },
    filterIcon(h) {
      console.log(h);
      return <i>icon</i>;
    },
    request(filters) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.data = data.filter((item) => {
          let result = true;
          if (filters.name) {
            result = item.name === filters.name;
          }
          if (result && filters.age && filters.age.length) {
            result = filters.age.includes(item.age);
          }
          if (result && filters.address) {
            result = item.address.indexOf(filters.address) !== -1;
          }
          return result;
        });
      }, 100);
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
