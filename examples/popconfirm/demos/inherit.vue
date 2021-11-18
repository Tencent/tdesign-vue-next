<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <t-popconfirm
        theme="default"
        content="直接使用 placement 进行设置"
        placement="bottom"
      >
        <t-button variant="outline">
          浮层出现在下方
        </t-button>
      </t-popconfirm>
      <t-popconfirm
        theme="default"
        content="透传属性到 Popup 组件进行设置"
        :popup-props="{ placement: 'right' }"
      >
        <t-button variant="outline">
          浮层出现在右侧
        </t-button>
      </t-popconfirm>
    </div>
  </div>
</template>

<style scoped>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
