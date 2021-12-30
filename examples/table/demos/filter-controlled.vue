<template>
  <div>
    <div class="table-operations" style="margin: 16px">
      <t-button @click="setFilters"> 清除筛选条件 </t-button>
      <span style="padding-left: 36px">已选筛选条件：{{ filterValue }}</span>
    </div>

    <!-- filter-value.sync 等同于 filter-value + filter-change -->
    <t-table
      row-key="key"
      :columns="columns"
      :data="data"
      :filter-value="filterValue"
      @filter-change="onFilterChange"
    />
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

const initData = [
  {
    key: '1',
    firstName: 'Eric',
    lastName: 'Spinke',
    email: 'espinke0@apache.org',
    createTime: '2021-11-01',
  },
  {
    key: '2',
    firstName: 'Gilberta',
    lastName: 'Purves',
    email: 'gpurves1@issuu.com',
    createTime: '2021-12-01',
  },
  {
    key: '3',
    firstName: 'Heriberto',
    lastName: 'Kment',
    email: 'hkment2@nsw.gov.au',
    createTime: '2022-01-01',
  },
  {
    key: '4',
    firstName: 'Lazarus',
    lastName: 'Skures',
    email: 'lskures3@apache.org',
    createTime: '2022-02-01',
  },
  {
    key: '5',
    firstName: 'Zandra',
    lastName: 'Croson',
    email: 'zcroson5@virginia.edu',
    createTime: '2022-03-01',
  },
];

const columns = [
  {
    title: 'FirstName',
    colKey: 'firstName',
    // 单选过滤配置
    // filter: {
    //   type: 'single',
    //   list: [
    //     { label: 'anyone', value: '' },
    //     { label: 'Heriberto', value: 'Heriberto' },
    //     { label: 'Eric', value: 'Eric' },
    //   ],
    // },
  },
  {
    title: 'LastName',
    colKey: 'lastName',
    // 多选过滤配置
    // filter: {
    //   type: 'multiple',
    //   list: [
    //     { label: 'All', checkAll: true },
    //     { label: 'Skures', value: 'Skures' },
    //     { label: 'Purves', value: 'Purves' },
    //   ],
    // },
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
  {
    title: 'Date',
    colKey: 'createTime',
    // 日期过滤配置
    // filter: {
    //   type: 'custom',
    //   component: () => <t-date-picker defaultValue={''} clearable />,
    // },
  },
];

export default defineComponent({
  setup() {
    const filterValue = ref({});
    const data = ref([]);

    const request = (filters) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        const newData = initData.filter((item) => {
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
          if (result && filters.createTime) {
            result = item.createTime === filters.createTime;
          }
          return result;
        });
        data.value = newData;
      }, 100);
    };

    const onFilterChange = (filters) => {
      filterValue.value = filters;
      console.log(filters);
      request(filters);
    };

    const setFilters = () => {
      filterValue.value = {};
      data.value = [...initData];
    };

    return {
      filterValue,
      data,
      columns,
      onFilterChange,
      setFilters,
    };
  },
});
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
