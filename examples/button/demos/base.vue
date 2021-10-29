<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="default" variant="base">填充按钮</t-button>
      <t-button theme="default" variant="outline">描边按钮</t-button>
      <t-button theme="default" variant="dashed">虚框按钮</t-button>
      <t-button theme="default" variant="text">文字按钮</t-button>
      <t-button theme="default" variant="base" loading>加载中</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" variant="base">填充按钮</t-button>
      <t-button theme="primary" variant="outline">描边按钮</t-button>
      <t-button theme="primary" variant="dashed">虚框按钮</t-button>
      <t-button theme="primary" variant="text">文字按钮</t-button>
      <t-button theme="primary" variant="base" loading>加载中</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="success" variant="base">填充按钮</t-button>
      <t-button theme="success" variant="outline">描边按钮</t-button>
      <t-button theme="success" variant="dashed">虚框按钮</t-button>
      <t-button theme="success" variant="text">文字按钮</t-button>
      <t-button theme="success" variant="base" loading>加载中</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="warning" variant="base">填充按钮</t-button>
      <t-button theme="warning" variant="outline">描边按钮</t-button>
      <t-button theme="warning" variant="dashed">虚框按钮</t-button>
      <t-button theme="warning" variant="text">文字按钮</t-button>
      <t-button theme="warning" variant="base" loading>加载中</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="danger" variant="base">填充按钮</t-button>
      <t-button theme="danger" variant="outline">描边按钮</t-button>
      <t-button theme="danger" variant="dashed">虚框按钮</t-button>
      <t-button theme="danger" variant="text">文字按钮</t-button>
      <t-button theme="danger" variant="base" loading>加载中</t-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tdesign-demo-item__body {
  .t-button + .t-button {
    margin-left: 32px;
  }
  .tdesign-demo-block {
    margin-top: 16px;
  }
}
.tdesign-wrap {
  display: inline-block;
  background-color: #bbbbbb;
  padding: 10px;
  margin-right: 10px;

}
</style>
