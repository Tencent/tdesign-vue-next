<template>
  <div class="demo-container t-table-demo-sort tdesign-demo__table">
    <!-- t-locale-provider 一般用于全局配置某个组件的特性，此代码示例 示范了如何对表格排序图标进行统一配置 -->
    <t-config-provider :globalConfig="globalLocale">
      <div class="item">
        <div style="margin: 16px">
          <t-checkbox v-model="allowMultipleSort">是否允许多字段排序</t-checkbox>
        </div>
        <div style="margin: 16px">排序：{{ JSON.stringify(sort) || '暂无' }}</div>

        <!-- 本地数据排序涉及到 data 的变更，相对比较慎重，因此仅支持受控用法 -->
        <!-- 1. 支持语法糖：sort.sync，效果同 :sort="sort" + onSortChange。2. 支持非受控属性 defaultSort -->
        <!-- 2. 支持语法糖：data.sync，效果同 :data="data" + onDataChange -->
        <!-- 语法糖用法示例代码，有效勿删 -->
        <!-- <t-table
          rowKey="id"
          :columns="columns"
          :data.sync="data"
          :sort.sync="sort"
        > -->

        <t-table
          rowKey="index"
          :columns="columns"
          :data="data"
          :sort="sort"
          @sort-change="sortChange"
          @data-change="dataChange"
          :multipleSort="allowMultipleSort"
          lazyLoad
        >
          <icon slot="op-column" name="descending-order" />
          <template #status="{ row }">
            <p class="status" :class="['', 'warning', 'unhealth'][row.status]">
              {{ ['健康', '警告', '异常'][row.status] }}
            </p>
          </template>
        </t-table>
      </div>
    </t-config-provider>
  </div>
</template>

<script lang="jsx">
import {
  CaretDownSmallIcon,
  Icon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  CloseCircleFilledIcon,
} from 'tdesign-icons-vue';

const initialColumns = [
  { colKey: 'applicant', title: '申请人', width: '100' },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
    sortType: 'all',
    sorter: (a, b) => a.status - b.status,
    cell: (h, { row }) => {
      const statusNameListMap = {
        0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
        1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
        2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
      };
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
          {statusNameListMap[row.status].icon}
          {statusNameListMap[row.status].label}
        </t-tag>
      );
    },
  },
  {
    title: '申请耗时(天)',
    colKey: 'time',
    width: '140',
    align: 'center',
    sortType: 'all',
    sorter: (a, b) => a.time - b.time,
  },
  { colKey: 'channel', title: '签署方式', width: '120' },
  { colKey: 'detail.email', title: '邮箱地址', ellipsis: true },
  { colKey: 'createTime', title: '申请时间' },
];

// 本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。
const initialData = new Array(4).fill(null).map((_, i) => ({
  index: i + 1,
  applicant: ['贾明', '张三', '王芳'][i % 3],
  status: i % 3,
  channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
  detail: {
    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
  },
  matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
  time: [2, 3, 1, 4][i % 4],
  createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
}));

export default {
  components: {
    Icon,
  },
  data() {
    return {
      data: initialData,
      columns: initialColumns,
      sort: {},
      singleSort: {
        sortBy: 'status',
        descending: true,
      },
      multipleSorts: [
        {
          sortBy: 'status',
          descending: true,
        },
      ],
      allowMultipleSort: false,
      globalLocale: {
        table: {
          sortIcon: (h) => h && <CaretDownSmallIcon size="16px" />,
        },
      },
    };
  },
  watch: {
    allowMultipleSort: {
      immediate: true,
      handler(val) {
        this.sort = val ? this.multipleSorts : this.singleSort;
      },
    },
  },
  methods: {
    // 除了监听 sortChange 事件调整排序，也可以监听 change 事件
    sortChange(sortInfo, options) {
      console.log('sort-change', sortInfo, options);
      // 受控操作当中，this.sort 和 this.data 的赋值都是必须
      this.sort = sortInfo;
      // this.data = options.currentDataSource;
    },
    dataChange(newData) {
      // 除了 sortChange，也可以在这里对 data.value 进行赋值
      this.data = newData;
      console.log('data-change', newData);
    },
  },
};
</script>
<style lang="less">
/deep/ [class*='t-table-expandable-icon-cell'] .t-icon {
  background-color: transparent;
}
</style>
