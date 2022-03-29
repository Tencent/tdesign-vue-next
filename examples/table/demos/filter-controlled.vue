<template>
  <div>
    <div>
      <t-radio-group v-model="align" variant="default-filled">
        <t-radio-button value="left">左对齐</t-radio-button>
        <t-radio-button value="center">居中对齐</t-radio-button>
        <t-radio-button value="right">右对齐</t-radio-button>
      </t-radio-group>
      <t-button variant="text" style="margin-left: 36px" @click="setFilters">清除筛选条件</t-button>
      <span style="padding-left: 36px">已选筛选条件：{{ filterValue }}</span>
    </div>
    <div style="margin: 16px">
      <t-checkbox v-model="bordered">是否显示表格边框</t-checkbox>
    </div>

    <!-- 1. 此处代码有效，勿删！支持语法糖 filter-value.sync ， 支持非受控属性 defaultfilterValue -->
    <!-- 2. 其中，filterIcon 用于自定义筛选图标，支持渲染函数 props.filterIcon，支持插槽 filterIcon。 -->
    <!-- 3. filterRow={() => null}，则不会显示过滤行 -->
    <!-- <t-table
      rowKey='key'
      :columns="columns"
      :data="data"
      :filter-value.sync="filterValue"
      :filterIcon="filterIcon"
    >
      <template #filterRow>自定义过滤行信息</template>
    </t-table> -->

    <!-- filter-value.sync 等同于 filter-value + filter-change -->
    <!-- :filter-row="() => null" 用于隐藏过滤结果行 -->
    <t-table
      row-key="key"
      :columns="columns"
      :data="data"
      :filter-value="filterValue"
      :bordered="bordered"
      @filter-change="onFilterChange"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue';

const initData = new Array(5).fill(null).map((_, i) => ({
  key: String(i + 1),
  firstName: ['Eric', 'Gilberta', 'Heriberto', 'Lazarus', 'Zandra'][i % 4],
  lastName: ['Spinke', 'Purves', 'Kment', 'Skures', 'Croson'][i % 4],
  email: [
    'espinke0@apache.org',
    'gpurves1@issuu.com',
    'hkment2@nsw.gov.au',
    'lskures3@apache.org',
    'zcroson5@virginia.edu',
  ][i % 4],
  createTime: ['2021-11-01', '2021-12-01', '2022-01-01', '2022-02-01', '2022-03-01'][i % 4],
}));

const align = ref('left');

const columns = computed(() => [
  {
    title: 'FirstName',
    colKey: 'firstName',
    align: align.value,
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
      // 是否显示重置取消按钮，一般情况不需要显示
      showConfirmAndReset: true,
    },
  },
  {
    title: 'Email',
    colKey: 'email',
    // 输入框过滤配置
    filter: {
      type: 'input',
      props: { placeholder: '输入关键词过滤' },
      // 是否显示重置取消按钮，一般情况不需要显示
      showConfirmAndReset: true,
    },
  },
  {
    title: 'Date',
    colKey: 'createTime',
    // 用于查看同时存在排序和过滤时的图标显示是否正常
    sorter: true,
    // 自定义过滤组件：日期过滤配置，请确保自定义组件包含 value 和 onChange 属性
    filter: {
      type: 'custom',
      component: () => <t-date-picker clearable />,
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
