<template>
  <div>
    <t-tooltip content="文字提示仅展示文本内容">
      <t-button>默认hover触发</t-button>
    </t-tooltip>
    <t-tooltip content="文字提示仅展示文本内容" trigger="focus">
      <t-input placeholder="获得焦点时触发" />
    </t-tooltip>
    <t-tooltip content="文字提示仅展示文本内容" trigger="click">
      <t-button>click或右键时触发</t-button>
    </t-tooltip>
  </div>
</template>
