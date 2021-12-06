<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <div class="demo-item">
        <t-popconfirm theme="default">
          <template #content>
            <p class="title">带描述的气泡确认框文字按钮</p>
            <p class="describe">带描述的气泡确认框在主要说明之外增加了操作相关的详细描述</p>
          </template>
          <t-button theme="primary">自定义浮层内容</t-button>
        </t-popconfirm>
      </div>
      <div class="demo-item">
        <t-popconfirm theme="warning">
          <template #content>
            <p class="title">带描述的气泡确认框文字按钮</p>
            <p class="describe">带描述的气泡确认框在主要说明之外增加了操作相关的详细描述</p>
          </template>
          <t-button theme="warning">自定义浮层内容</t-button>
        </t-popconfirm>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: flex-start;
}
.popconfirm-demo .demo-item {
  width: 240px;
  text-align: left;
}
.title {
  font-weight: 500;
  font-size: 14px;
}
.describe {
  margin-top: 10px;
  font-size: 12px;
}
</style>
