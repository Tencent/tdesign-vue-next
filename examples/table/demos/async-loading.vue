<template>
  <div>
    <t-radio-group v-model="asyncLoading">
      <t-radio-button value="load-more">加载更多</t-radio-button>
      <t-radio-button value="loading">加载中</t-radio-button>
      <t-radio-button value="loading-custom">自定义加载更多</t-radio-button>
    </t-radio-group>

    <t-table
      rowKey="key"
      :columns="columns"
      :data="data"
      :asyncLoading="loadingNode"
      @async-loading-click="onAsyncLoadingClick"
    ></t-table>
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

const columns = [
  {
    title: 'FirstName',
    colKey: 'firstName',
    width: '100',
  },
  {
    title: 'LastName',
    colKey: 'lastName',
    width: '100',
  },
  {
    title: 'Email',
    colKey: 'email',
    width: '250',
  },
];

export default {
  data() {
    return {
      data,
      columns,
      asyncLoading: 'loading',
    };
  },
  computed: {
    loadingNode() {
      return this.asyncLoading === 'loading-custom'
        ? this.customLoadingNode
        : this.asyncLoading;
    },
  },
  methods: {
    customLoadingNode(h) {
      return <div class='t-table--loading-async'>这是自定义加载状态和内容</div>;
    },
    onAsyncLoadingClick({ status }) {
      if (status === 'load-more') {
        this.asyncLoading = 'loading';
      }
    },
  },
};
</script>
