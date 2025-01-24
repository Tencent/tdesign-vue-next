<template>
  <t-config-provider :global-config="globalConfig">
    <!-- 全局配置：空数据呈现，演示 -->
    <t-table :data="[]" :columns="columns" bordered row-key="property"></t-table>
    <br /><br />

    <!-- 全局配置：自定义展开图标和排序图标，演示 -->
    <t-table
      :data="data"
      :columns="columns"
      :expanded-row="expandedRow"
      expand-on-row-click
      row-key="property"
    ></t-table>
    <br /><br />
  </t-config-provider>
</template>

<script lang="tsx" setup>
import { merge } from 'lodash-es';
import enConfig from 'tdesign-vue-next/es/locale/en_US';
import { TableProps, GlobalConfigProvider } from 'tdesign-vue-next';
import { ChevronRightIcon, CaretDownSmallIcon /** , ChevronDownIcon */ } from 'tdesign-icons-vue-next';
const columns: TableProps['columns'] = [
  {
    colKey: 'type',
    title: 'Type',
    sorter: true,
  },
  {
    colKey: 'platform',
    title: 'Platform',
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
const data: TableProps['data'] = [
  {
    type: 'Array',
    platform: 'Vue(PC)',
    property: 'A',
  },
  {
    type: 'String',
    platform: 'React(PC)',
    property: 'B',
  },
  {
    type: 'Object',
    platform: 'Miniprogram',
    property: 'C',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const expandedRow: TableProps['expandedRow'] = (h) => {
  return <div>This is expanded row info</div>;
};

// 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置

const empty: GlobalConfigProvider = {};
const customConfig: GlobalConfigProvider = {
  table: {
    empty: 'Empty Data',
    // empty can also be a function
    // empty: () => <div class='custom-empty-content'>Empty Data</div>,
    expandIcon: () => <ChevronRightIcon />,
    sortIcon: () => <CaretDownSmallIcon size="18px" />,

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
};
const globalConfig = merge(empty, enConfig, customConfig);
</script>

<style scoped>
.tdesign-demo-item--locale-provider-base {
  margin: 24px -120px 0 0;
}
</style>
