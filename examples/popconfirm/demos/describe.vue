<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <t-popconfirm theme="default">
        <template slot="content">
          <p class="title">带描述的气泡确认框文字按钮</p>
          <p class="describe">带描述的气泡确认框在主要说明之外增加了操作相关的详细描述</p>
        </template>
        <t-button theme="primary">自定义content</t-button>
      </t-popconfirm>
      <t-popconfirm theme="info">
        <template slot="content">
          <p class="title">带描述的气泡确认框文字按钮</p>
          <p class="describe">带描述的气泡确认框在主要说明之外增加了操作相关的详细描述</p>
        </template>
        <t-button theme="primary">自定义content</t-button>
      </t-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirm() {
      return <h3>带描述的气泡确认框文字按钮</h3>;
    },
  },
};
</script>


<style lang="less" scoped>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
.title {
  font-weight: 500;
  font-size: 16px;
}
.describe {
  margin-top: 10px;
  color: rgb(153, 153, 153);
}
</style>>


