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
    date: '2021-10-27 17:19:12',
  },
  {
    key: '2',
    firstName: 'Gilberta',
    lastName: 'Purves',
    email: 'gpurves1@issuu.com',
    date: '2021-10-22 17:19:12',
  },
  {
    key: '3',
    firstName: 'Heriberto',
    lastName: 'Kment',
    email: 'hkment2@nsw.gov.au',
    date: '2021-10-12 17:19:12',
  },
  {
    key: '4',
    firstName: 'Lazarus',
    lastName: 'Skures',
    email: 'lskures3@apache.org',
    date: '2021-01-27 17:19:12',
  },
  {
    key: '5',
    firstName: 'Zandra',
    lastName: 'Croson',
    email: 'zcroson5@virginia.edu',
    date: '2021-01-27 15:19:12',
  },
];

const columns = [
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
  {
    title: 'Date',
    colKey: 'date',
    // 日期过滤配置
    filter: {
      type: 'custom',
      component: () => <t-date-picker theme="primary" range mode="month" />,
    },
  },
];

export default defineComponent({
  setup() {
    const filterValue = ref({});
    const data = ref([...initData]);

    const request = (filters) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        data.value = initData.filter((item) => {
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
          if (result && filters.date?.length) {
            const [start, end] = filters.date;
            result = new Date(start) < new Date(item.date) && new Date(end) > new Date(item.date);
          }
          return result;
        });
      }, 100);
    };

    const onFilterChange = (filters) => {
      filterValue.value = filters;
      request(filters);
    };

    const setFilters = () => {
      filterValue.value = {};
      data.value = ref([...initData]);
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
