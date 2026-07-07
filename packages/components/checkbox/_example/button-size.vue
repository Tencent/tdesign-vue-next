<template>
  <t-space direction="vertical">
    <t-checkbox-group variant="outline" size="small" :default-value="['view']">
      <t-checkbox value="view">查看</t-checkbox>
      <t-checkbox value="edit">编辑</t-checkbox>
      <t-checkbox value="export">导出</t-checkbox>
    </t-checkbox-group>

    <t-checkbox-group variant="outline" :default-value="['view']">
      <t-checkbox value="view">查看</t-checkbox>
      <t-checkbox value="edit">编辑</t-checkbox>
      <t-checkbox value="export">导出</t-checkbox>
    </t-checkbox-group>

    <t-checkbox-group variant="outline" size="large" :default-value="['view']">
      <t-checkbox value="view">查看</t-checkbox>
      <t-checkbox value="edit">编辑</t-checkbox>
      <t-checkbox value="export">导出</t-checkbox>
    </t-checkbox-group>
  </t-space>
</template>
