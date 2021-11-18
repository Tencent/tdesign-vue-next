<template>
  <div class="popup-demo-container">
    <t-popup content="文字提示仅展示文本内容">
      <t-button variant="outline">
        悬浮时触发（默认）
      </t-button>
    </t-popup>
    <t-popup
      content="文字提示仅展示文本内容"
      trigger="focus"
    >
      <t-input placeholder="获得焦点时触发" />
    </t-popup>
    <t-popup
      content="文字提示仅展示文本内容"
      trigger="click"
    >
      <t-button variant="outline">
        点击时触发
      </t-button>
    </t-popup>
    <t-popup
      content="文字提示仅展示文本内容"
      trigger="context-menu"
    >
      <t-button variant="outline">
        右击时触发
      </t-button>
    </t-popup>
  </div>
</template>
<style lang="less">
.popup-demo-container{
  display: flex;
  align-items: center;

  > div {
    margin-right: 8px;
  }
}
</style>
