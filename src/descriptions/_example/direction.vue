<template>
  <t-space direction="vertical">
    <t-space direction="vertical">
      <h3>整体左右布局，item 左右布局</h3>
      <t-descriptions title="Shipping address" bordered>
        <t-descriptions-item label="Name">TDesign</t-descriptions-item>
        <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>
        <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>
        <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>
      </t-descriptions>
    </t-space>

    <t-space direction="vertical">
      <h3>整体左右布局，item 上下布局</h3>
      <t-descriptions title="Shipping address" bordered item-layout="vertical">
        <t-descriptions-item label="Name">TDesign</t-descriptions-item>
        <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>
        <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>
        <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>
      </t-descriptions>
    </t-space>

    <t-space direction="vertical">
      <h3>整体上下布局，item 左右布局</h3>
      <t-descriptions title="Shipping address" bordered layout="vertical">
        <t-descriptions-item label="Name">TDesign</t-descriptions-item>
        <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>
        <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>
        <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>
      </t-descriptions>
    </t-space>

    <t-space direction="vertical">
      <h3>整体上下布局，item 上下布局</h3>
      <t-descriptions title="Shipping address" bordered layout="vertical" item-layout="vertical">
        <t-descriptions-item label="Name">TDesign</t-descriptions-item>
        <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>
        <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>
        <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>
      </t-descriptions>
    </t-space>
  </t-space>
</template>
