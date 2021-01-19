<template>
  <div>
    <t-popup
      content="这是popup内容"
      trigger="focus"
    >
      <t-input placeholder="获得焦点时显示popup" />
    </t-popup>
    <t-popup
      :style="{marginLeft: '10px'}"
      content="这是popup内容"
      trigger="context-menu"
    >
      <t-button theme="ghost">click或右键时显示popup</t-button>
    </t-popup>
  </div>
</template>
