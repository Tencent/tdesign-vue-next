<template>
  <t-popup
    content="这是popup内容"
    trigger="click"
    :overlayStyle="{background: 'green'}"
    overlayClassName="custom-popup"
  >
    <t-button>click我试试</t-button>
  </t-popup>
</template>

<style>
  .custom-popup {
    font-weight: bold;
    color: yellow !important;
  }
</style>
