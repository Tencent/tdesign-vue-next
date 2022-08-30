<template>
  <t-space direction="vertical">
    <h3>未评分状态</h3>
    <t-rate />
    <h3>满分状态</h3>
    <t-rate :default-value="5" />
    <h3>半星状态</h3>
    <t-rate :default-value="4.5" allow-half />
  </t-space>
</template>
