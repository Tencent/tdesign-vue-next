<template>
  <div class="tdesign-tooltip-demo">
    <t-tooltip content="文字提示仅展示文本内容">
      <t-button>悬浮时触发（默认）</t-button>
    </t-tooltip>
    <t-tooltip content="文字提示仅展示文本内容" trigger="focus">
      <t-input placeholder="获得焦点时触发" />
    </t-tooltip>
    <t-tooltip content="文字提示仅展示文本内容" trigger="click">
      <t-button>点击时触发</t-button>
    </t-tooltip>
    <t-tooltip content="文字提示仅展示文本内容" trigger="context-menu">
      <t-button>右击时触发</t-button>
    </t-tooltip>
  </div>
</template>
