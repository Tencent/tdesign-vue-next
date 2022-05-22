<template>
  <div>
    <!-- 当前示例包含：输入框、单选、多选、日期 等场景 -->
    <t-table row-key="key" :columns="columns" :data="data" :bordered="bordered" />
  </div>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue';
import { Input, Select, DatePicker, MessagePlugin } from 'tdesign-vue-next';

const initData = new Array(5).fill(null).map((_, i) => ({
  key: String(i + 1),
  firstName: ['Eric', 'Gilberta', 'Heriberto', 'Lazarus', 'Zandra'][i % 4],
  framework: ['Vue', 'React', 'Miniprogram', 'Flutter'][i % 4],
  email: [
    'espinke0@apache.org',
    'gpurves1@issuu.com',
    'hkment2@nsw.gov.au',
    'lskures3@apache.org',
    'zcroson5@virginia.edu',
  ][i % 4],
  letters: [['A'], ['B', 'E'], ['C'], ['D', 'G', 'H']][i % 4],
  createTime: ['2021-11-01', '2021-12-01', '2022-01-01', '2022-02-01', '2022-03-01'][i % 4],
}));

const align = ref('left');

const columns = computed(() => [
  {
    title: 'FirstName',
    colKey: 'firstName',
    align: align.value,
    edit: {
      // 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      component: Input,
      abortOnEvent: 'onBlur',
      // props, 透传全部属性到 Input 组件
      props: {
        clearable: true,
        onBlur: (val, context) => {
          console.log('edit firstName:', val, context);
          MessagePlugin.success('Success');
        },
      },
    },
  },
  {
    title: 'Framework',
    colKey: 'framework',
    edit: {
      component: Select,
      // props, 透传全部属性到 Select 组件
      props: {
        clearable: true,
        onChange: (context) => {
          console.log('edit Framework:', context);
          MessagePlugin.success('Success');
        },
        options: [
          { label: 'Vue', value: 'Vue' },
          { label: 'React', value: 'React' },
          { label: 'Miniprogram', value: 'Miniprogram' },
          { label: 'Flutter', value: 'Flutter' },
        ],
      },
    },
  },
  {
    title: 'Letters',
    colKey: 'letters',
    cell: (h, { row }) => row.letters.join('、'),
    edit: {
      component: Select,
      abortOnEvent: 'onAbort',
      // props, 透传全部属性到 Select 组件
      props: {
        multiple: true,
        minCollapsedNum: 1,
        onAbort: (context) => {
          console.log('edit Framework:', context);
          MessagePlugin.success('Success');
        },
        options: [
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'C', value: 'C' },
          { label: 'D', value: 'D' },
          { label: 'E', value: 'E' },
          { label: 'G', value: 'G' },
          { label: 'H', value: 'H' },
        ],
      },
    },
  },
  {
    title: 'Date',
    colKey: 'createTime',
    // props, 透传全部属性到 DatePicker 组件
    edit: {
      component: DatePicker,
      props: {
        mode: 'date',
        onChange: (context) => {
          console.log('edit Framework:', context);
          MessagePlugin.success('Success');
        },
      },
    },
  },
]);

const filterValue = ref({});
const data = ref([...initData]);
const bordered = ref(true);

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
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
