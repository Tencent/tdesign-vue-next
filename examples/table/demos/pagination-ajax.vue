<template>
  <t-table
    :data="data"
    :columns="columns"
    :rowKey="rowKey"
    :verticalAlign="verticalAlign"
    :loading="isLoading"
    :pagination="pagination"
    @change="rehandleChange">
    bordered
    stripe
  </t-table>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      isLoading: false,
      columns: [
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
      ],
      rowKey: 'property',
      tableLayout: 'auto',
      verticalAlign: 'top',
      rowClassName: 'property-class',
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
  },
  async mounted() {
    await this.fetchData(this.pagination);
  },
  methods: {
    async fetchData(pagination = this.pagination) {
      try {
        this.isLoading = true;
        const { current, pageSize } = pagination;
        // 请求可能存在跨域问题
        const response = await axios.get('https://randomuser.me/api', {
          params: {
            page: current,
            results: pageSize,
          },
          responseType: 'json',
        });
        this.data = response.data.results;
        this.pagination = {
          ...pagination,
          total: 120,
        };
        console.log('分页数据', response.data.results);
      } catch (err) {
        this.data = [];
      }
      this.isLoading = false;
    },
    // 也可以使用 page-change 事件
    async rehandleChange(changeParams, triggerAndData) {
      console.log('分页、排序、过滤等发生变化时会触发 change 事件：', changeParams, triggerAndData);
      const { current, pageSize } = changeParams.pagination;
      const pagination = { current, pageSize  };
      await this.fetchData(pagination);
    },
  },
};
</script>
