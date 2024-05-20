<template>
  <t-config-provider :globalConfig="globalConfig" style="padding: 16px">
    <!-- 全局配置：空数据呈现，演示 -->
    <t-table :data="[]" :columns="columns" bordered rowKey="property"></t-table>
    <br /><br />

    <!-- 全局配置：自定义展开图标和排序图标，演示 -->
    <t-table :data="data" :columns="columns" :expandedRow="expandedRow" expandOnRowClick rowKey="property"></t-table>
    <br /><br />
  </t-config-provider>
</template>

<script lang="jsx">
import { ChevronRightIcon, CaretDownSmallIcon /** , ChevronDownIcon */ } from 'tdesign-icons-vue';
import { merge } from 'lodash-es'
import enConfig from 'tdesign-vue/es/locale/en_US';

const columns = [
  {
    colKey: 'type',
    title: 'Type',
    sorter: true,
  },
  {
    colKey: 'platform',
    title: 'Platform',
    filter: {
      type: 'single',
    },
  },
  {
    colKey: 'property',
    title: 'Property',
    sorter: true,
    filter: {
      type: 'single',
    },
  },
];

const data = [
  { type: 'Array', platform: 'Vue(PC)', property: 'A' },
  { type: 'String', platform: 'React(PC)', property: 'B' },
  { type: 'Object', platform: 'Miniprogram', property: 'C' },
];

export default {
  data() {
    return {
      // 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
      globalConfig: merge(enConfig, {
        table: {
          // 支持 String 和 Function 两种数据类型
          empty: 'Empty Data',
          // empty can also be a function
          // empty: (h) => h && <div class='custom-empty-content'>Empty Data</div>,
          expandIcon: (h) => h && <ChevronRightIcon />,
          sortIcon: (h) => h && <CaretDownSmallIcon size="18px" />,

          // More config
          // filterIcon: () => <span>Filter</span>,
          // filterInputPlaceholder: 'Enter Keyword',
          // loadingMoreText: 'Load More',
          // loadingText: 'Loading',
          // sortAscendingOperationText: 'ascending sort',
          // sortCancelOperationText: 'cancel sort',
          // sortDescendingOperationText: 'descending sort',
          // treeExpandAndFoldIcon: (h, { type }) => type === 'expand' ? <ChevronRightIcon /> : <ChevronDownIcon />,
        },
      }),
      columns,
      data,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expandedRow(h) {
      return <div>This is expanded row info</div>;
    },
  },
};
</script>
<style scoped>
.tdesign-demo-item--locale-provider-base {
  margin: 24px -120px 0 0;
}
</style>
