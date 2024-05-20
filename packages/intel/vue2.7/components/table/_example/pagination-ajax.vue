<template>
  <t-table
    :data="data"
    :columns="columns"
    :rowKey="rowKey"
    :loading="isLoading"
    :pagination="pagination"
    :selected-row-keys="selectedRowKeys"
    @change="rehandleChange"
    @page-change="onPageChange"
    @select-change="onSelectChange"
    bordered
    stripe
    lazyLoad
  >
  </t-table>
</template>

<script lang="jsx">
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

export default {
  data() {
    return {
      data: [],
      isLoading: false,
      selectedRowKeys: [],
      columns: [
        {
          colKey: 'row-select',
          type: 'multiple',
          width: 46,
        },
        {
          width: 200,
          colKey: 'name',
          title: '姓名',
          render(h, { type, row: { name } }) {
            if (type === 'title') return '申请人';
            return name ? `${name.first} ${name.last}` : 'UNKNOWN_USER';
          },
        },
        {
          colKey: 'status',
          title: '申请状态',
          width: '150',

          cell: (h, { rowIndex }) => {
            const statusNameListMap = {
              0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
              1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
              2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
            };
            const status = rowIndex % 3;
            return (
              <t-tag shape="round" theme={statusNameListMap[status].theme} variant="light-outline">
                {statusNameListMap[status].icon}
                {statusNameListMap[status].label}
              </t-tag>
            );
          },
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
          width: 180,
          ellipsis: true,
        },
      ],
      rowKey: 'phone',
      // tableLayout: 'auto',
      // rowClassName: 'property-class',
      pagination: {
        current: 1,
        pageSize: 10,
        // defaultCurrent: 1,
        // defaultPageSize: 10,
        showJumper: true,
        onChange: (pageInfo) => {
          console.log('pagination.onChange', pageInfo);
        },
      },
    };
  },
  async mounted() {
    await this.fetchData({
      current: this.pagination.current || this.pagination.defaultCurrent,
      pageSize: this.pagination.pageSize || this.pagination.defaultPageSize,
    });
  },
  methods: {
    async fetchData(pagination = this.pagination) {
      try {
        this.isLoading = true;
        const { current, pageSize } = pagination;
        // 请求可能存在跨域问题
        const url = new URL('https://randomuser.me/api');
        const params = { page: current, results: pageSize };
        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
        const response = await fetch(url).then((x) => x.json());
        this.data = response.results;
        // 数据加载完成，设置数据总条数
        this.pagination.total = 120;
      } catch (err) {
        this.data = [];
      }
      this.isLoading = false;
    },

    // BaseTable 中只有 page-change 事件，没有 change 事件
    rehandleChange(changeParams, triggerAndData) {
      console.log('分页、排序、过滤等发生变化时会触发 change 事件：', changeParams, triggerAndData);
    },

    // BaseTable 中只有 page-change 事件，没有 change 事件
    async onPageChange(pageInfo) {
      console.log('page-change', pageInfo);
      this.pagination.current = pageInfo.current;
      this.pagination.pageSize = pageInfo.pageSize;
      await this.fetchData(pageInfo);
    },

    onSelectChange(value, { selectedRowData }) {
      this.selectedRowKeys = value;
      console.log(value, selectedRowData);
    },
  },
};
</script>
