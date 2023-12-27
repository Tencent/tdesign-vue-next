<template>
  <h3>整体左右布局，item 左右布局</h3>
  <t-row justify="center">
    <t-descriptions title="我是张跑跑" bordered>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名"><div>zhangpaopao0609</div></t-descriptions-item>
    </t-descriptions>
  </t-row>

  <h3>整体左右布局，item 上下布局</h3>
  <t-row justify="center">
    <t-descriptions title="我是张跑跑" item-direction="vertical" bordered>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名"><div>zhangpaopao0609</div></t-descriptions-item>
    </t-descriptions>
  </t-row>

  <h3>整体上下布局，item 左右布局</h3>
  <t-row justify="center">
    <t-descriptions title="我是张跑跑" direction="vertical" bordered>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名"><div>zhangpaopao0609</div></t-descriptions-item>
    </t-descriptions>
  </t-row>

  <h3>整体上下布局，item 上下布局</h3>
  <t-row justify="center">
    <t-descriptions title="我是张跑跑" direction="vertical" item-direction="vertical" bordered>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名">zhangpaopao0609</t-descriptions-item>
      <t-descriptions-item label="姓名"><div>zhangpaopao0609</div></t-descriptions-item>
    </t-descriptions>
  </t-row>
</template>

<script setup lang="jsx"></script>

<style scoped>
h3 {
  text-align: center;
}
</style>
