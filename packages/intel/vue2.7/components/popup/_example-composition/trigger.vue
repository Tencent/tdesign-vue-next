<template>
  <t-space>
    <t-popup content="文字提示仅展示文本内容" destroyOnClose>
      <t-button variant="outline">悬浮时触发（默认）</t-button>
    </t-popup>
    <t-popup content="文字提示仅展示文本内容" destroyOnClose trigger="click">
      <t-button variant="outline">点击时触发</t-button>
    </t-popup>
    <t-popup content="文字提示仅展示文本内容" destroyOnClose trigger="focus">
      <t-input placeholder="获得焦点时触发" />
    </t-popup>
    <t-popup content="文字提示仅展示文本内容" destroyOnClose trigger="context-menu">
      <t-button variant="outline">右击时触发</t-button>
    </t-popup>
  </t-space>
</template>
