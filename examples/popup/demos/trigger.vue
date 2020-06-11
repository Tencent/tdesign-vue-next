<template>
  <div>
    <t-popup
      content="这是popup内容"
      trigger="focus"
    >
      <input placeholder="获得焦点时、右键时显示popup" />
    </t-popup>
    <t-popup
      :style="{marginLeft: '10px'}"
      content="这是popup内容"
      trigger="click contextMenu"
    >
      click或右键时显示popup
    </t-popup>
  </div>
</template>
