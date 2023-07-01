<template>
  <t-space size="24px">
    <t-descriptions
      width="900px"
      :bordered="true"
      layout="horizontal"
      :columns="3"
      size="medium"
      :colon="true"
      label-align="left"
      content-align="center"
    >
      <t-descriptions-item label="姓名姓名姓名姓名" :span="1">123</t-descriptions-item>
      <t-descriptions-item label="姓名姓名姓名" :span="1">456</t-descriptions-item>
      <t-descriptions-item label="姓名姓名" :span="1">789</t-descriptions-item>
      <t-descriptions-item label="姓名" :span="1">000</t-descriptions-item>
      <t-descriptions-item :span="1">
        <template #label><div>xxxx</div> </template>
        000</t-descriptions-item
      >
    </t-descriptions>
  </t-space>
</template>
