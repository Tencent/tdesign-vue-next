<template>
  <t-table
    :data="data"
    :columns="columns"
    :rowKey="rowKey"
    :verticalAlign="verticalAlign"
    :bordered="bordered"
    :hover="hover"
    :stripe="stripe"
    :size="size"
    :loading="isLoading"
    :pagination="pagination"
    @page-change="rehandlePageChange"
    @change="rehandleChange">
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
          align: 'center',
          width: 200,
          colKey: 'name',
          title: '姓名',
          render({ record: { name } }) {
            return name ? `${name.first} ${name.last}` : 'UNKNOW_USER';
          },
        },
        {
          align: 'left',
          width: 200,
          colKey: 'gender',
          title: '性别',
        },
        {
          align: 'left',
          width: 200,
          colKey: 'phone',
          title: '联系方式',
          render({ record: { phone } }) {
            return phone;
          },
        },
        {
          align: 'left',
          colKey: 'email',
          title: '邮箱',
        },
      ],
      rowKey: 'property',
      tableLayout: 'auto',
      verticalAlign: 'top',
      size: 'small',
      bordered: true,
      hover: true,
      stripe: true,
      rowClassName: rowKey => `${rowKey}-class`,
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
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
    },
    async rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
      const { curr, pageSize } = changeParams.pagination;
      const pagination = { current: curr, pageSize  };
      await this.fetchData(pagination);
    },
  },
};
</script>
