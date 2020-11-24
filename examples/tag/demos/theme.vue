<template>
  <div class="tdesign-tag-theme">
    <div class="tdesign-demo-block">
      深色
      <t-tag theme="primary">标签一</t-tag>
      <t-tag theme="success">标签二</t-tag>
      <t-tag theme="info">标签三</t-tag>
      <t-tag theme="warning">标签四</t-tag>
      <t-tag theme="danger">标签五</t-tag>
    </div>
    <div class="tdesign-demo-block light">
      浅色
      <t-tag theme="primary" effect="light">标签一</t-tag>
      <t-tag theme="success" effect="light">标签二</t-tag>
      <t-tag theme="info" effect="light">标签三</t-tag>
      <t-tag theme="warning" effect="light">标签四</t-tag>
      <t-tag theme="danger" effect="light">标签五</t-tag>
    </div>
    <div class="tdesign-demo-block plain">
      朴素
      <t-tag effect="plain" theme="primary">标签一</t-tag>
      <t-tag effect="plain" theme="success">标签二</t-tag>
      <t-tag effect="plain" theme="info">标签三</t-tag>
      <t-tag effect="plain" theme="warning">标签四</t-tag>
      <t-tag effect="plain" theme="danger">标签五</t-tag>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tdesign-tag-theme .tdesign-demo-block {
  width: 600px;
  display: flex;
  justify-content: space-around;
}
</style>
