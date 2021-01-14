<template>
  <div>
    <t-popup
      content="这是popup内容"
      trigger="manual"
      placement="bottom-left"
      visibleArrow
      :visible="true"
    >
      <textarea placeholder="拖动修改输入框尺寸" />
    </t-popup>
  </div>
</template>
