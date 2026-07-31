<template>
  <t-space direction="vertical">
    <t-checkbox-group variant="outline" :default-value="['view']">
      <t-checkbox value="view">查看</t-checkbox>
      <t-checkbox value="edit">编辑</t-checkbox>
      <t-checkbox value="export">导出</t-checkbox>
    </t-checkbox-group>

    <t-checkbox-group variant="default-filled" :default-value="['view']">
      <t-checkbox value="view">查看</t-checkbox>
      <t-checkbox value="edit">编辑</t-checkbox>
      <t-checkbox value="export">导出</t-checkbox>
    </t-checkbox-group>

    <t-checkbox-group variant="primary-filled" :default-value="['view']">
      <t-checkbox value="view">查看</t-checkbox>
      <t-checkbox value="edit">编辑</t-checkbox>
      <t-checkbox value="export">导出</t-checkbox>
    </t-checkbox-group>

    <t-checkbox-group variant="outline" direction="vertical" :default-value="['view']">
      <t-checkbox value="view">查看数据</t-checkbox>
      <t-checkbox value="edit">编辑数据</t-checkbox>
      <t-checkbox value="export">导出数据</t-checkbox>
    </t-checkbox-group>
  </t-space>
</template>
