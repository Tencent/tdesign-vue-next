<template>
  <t-space size="80px">
    <t-popconfirm theme="default">
      <template slot="content">
        <p class="title">带描述的气泡确认框文字按钮</p>
        <p class="describe">带描述的气泡确认框在主要说明之外增加了操作相关的详细描述</p>
      </template>
      <t-button theme="primary">自定义浮层内容</t-button>
    </t-popconfirm>

    <t-popconfirm theme="warning">
      <template slot="content">
        <p class="title">带描述的气泡确认框文字按钮</p>
        <p class="describe">带描述的气泡确认框在主要说明之外增加了操作相关的详细描述</p>
      </template>
      <t-button theme="warning">自定义浮层内容</t-button>
    </t-popconfirm>
  </t-space>
</template>

<style lang="less" scoped>
.title {
  font-weight: 500;
  font-size: 14px;
}
.describe {
  margin-top: 8px;
  font-size: 12px;
  color: var(--td-text-color-secondary);
}
</style>
