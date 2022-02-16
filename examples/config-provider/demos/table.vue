<template>
  <t-config-provider :global-config="globalConfig" style="padding: 16px">
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

<script setup lang="jsx">
import { ChevronRightIcon, CaretDownSmallIcon } from 'tdesign-icons-vue-next';

const columns = [
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
  },
];

const data = [
  { type: 'Array', platform: 'Vue(PC)', property: 'A' },
  { type: 'String', platform: 'React(PC)', property: 'B' },
  { type: 'Object', platform: 'Miniprogram', property: 'C' },
];

const expandedRow = (h) => {
  return <div>This is expanded row info</div>;
};

const globalConfig = {
  table: {
    empty: 'Empty Data',
    expandIcon: (h) => h && <ChevronRightIcon />,
    sortIcon: (h) => h && <CaretDownSmallIcon size="18px" />,
  },
};
</script>
<style scoped>
.tdesign-demo-item--locale-provider-base {
  margin: 24px -120px 0 0;
}
</style>
