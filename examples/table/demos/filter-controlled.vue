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

<script lang="jsx">
const data = [
  {
    key: '1',
    firstName: 'Eric',
    lastName: 'Spinke',
    email: 'espinke0@apache.org',
  },
  {
    key: '2',
    firstName: 'Gilberta',
    lastName: 'Purves',
    email: 'gpurves1@issuu.com',
  },
  {
    key: '3',
    firstName: 'Heriberto',
    lastName: 'Kment',
    email: 'hkment2@nsw.gov.au',
  },
  {
    key: '4',
    firstName: 'Lazarus',
    lastName: 'Skures',
    email: 'lskures3@apache.org',
  },
  {
    key: '5',
    firstName: 'Zandra',
    lastName: 'Croson',
    email: 'zcroson5@virginia.edu',
  },
];


export default {
  data() {
    return {
      data,
      filterValue: {},
      columns: [
        {
          title: 'FirstName',
          colKey: 'firstName',
          // 单选过滤配置
          filter: {
            type: 'single',
            list: [
              { label: 'anyone', value: '' },
              { label: 'Heriberto', value: 'Heriberto' },
              { label: 'Eric', value: 'Eric' },
            ],
          },
        },
        {
          title: 'LastName',
          colKey: 'lastName',
          // 多选过滤配置
          filter: {
            type: 'multiple',
            list: [
              { label: 'All', checkAll: true },
              { label: 'Skures', value: 'Skures' },
              { label: 'Purves', value: 'Purves' },
            ],
          },
        },
        {
          title: 'Email',
          colKey: 'email',
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
          if (filters.firstName) {
            result = item.firstName === filters.firstName;
          }
          if (result && filters.lastName && filters.lastName.length) {
            result = filters.lastName.includes(item.lastName);
          }
          if (result && filters.email) {
            result = item.email.indexOf(filters.email) !== -1;
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
