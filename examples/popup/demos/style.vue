<template>
  <div>
    <t-popup
      content="这是popup内容"
      trigger="click"
      :overlayStyle="{background: 'green', margin: '0px', zIndex: 5600}"
      overlayClassName="custom-popup"
      placement="bottom-left"
    >
      <t-button variant="outline">click我试试</t-button>
    </t-popup>
    <t-popup
      :style="{marginLeft: '10px'}"
      content="与 trigger 等宽"
      trigger="click"
      :overlayStyle="triggerElem => ({ width: `${triggerElem.offsetWidth}px` })"
      placement="bottom-left"
    >
      <t-button variant="outline">根据 trigger 元素定制 overlayStyle</t-button>
    </t-popup>
  </div>
</template>

<style>
  .custom-popup {
    font-weight: bold;
    color: yellow !important;
  }
</style>
