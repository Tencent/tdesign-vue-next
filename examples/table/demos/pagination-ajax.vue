<template>
  <t-table
    :data="data"
    :columns="columns"
    :row-key="rowKey"
    :vertical-align="verticalAlign"
    :loading="isLoading"
    :pagination="pagination"
    bordered
    stripe
    @change="rehandleChange"
  />
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';

const columns = [
  {
    width: 200,
    colKey: 'name',
    title: '姓名',
    render(h, { row: { name } }) {
      return name ? `${name.first} ${name.last}` : 'UNKNOW_USER';
    },
  },
  {
    width: 200,
    colKey: 'gender',
    title: '性别',
  },
  {
    width: 200,
    colKey: 'phone',
    title: '联系方式',
    render(h, { row: { phone } }) {
      return phone;
    },
  },
  {
    colKey: 'email',
    title: '邮箱',
  },
];

export default defineComponent({
  setup() {
    const data = ref([]);
    const isLoading = ref(false);

    const pagination = ref({
      current: 1,
      pageSize: 10,
    });

    const fetchData = async (paginationVal = pagination.value) => {
      try {
        isLoading.value = true;
        const { current, pageSize } = pagination;
        // 请求可能存在跨域问题
        const response = await fetch(`https://randomuser.me/api?page=${current}&results=${pageSize}`);
        const { data: results } = await response.json();
        data.value = results;
        pagination.value = {
          ...paginationVal,
          total: 120,
        };
        console.log('分页数据', response.data.results);
      } catch (err) {
        data.value = [];
      }
      isLoading.value = false;
    };

    const rehandleChange = async (changeParams, triggerAndData) => {
      console.log('分页、排序、过滤等发生变化时会触发 change 事件：', changeParams, triggerAndData);
      const { current, pageSize } = changeParams.pagination;
      const pagination = { current, pageSize };
      await fetchData(pagination);
    };

    onMounted(async () => {
      await fetchData(pagination.value);
    });

    return {
      data,
      isLoading,
      columns,
      rowKey: 'property',
      verticalAlign: 'top',
      pagination,
      rehandleChange,
    };
  },
});
</script>
