<template>
  <t-watermark
    :watermark-content="[
      { text: '水印文本', fontColor: 'black' },
      { url: 'https://tdesign.gtimg.com/starter/brand-logo-light.png' },
    ]"
    :line-space="24"
    :x="100"
    :y="120"
    :width="158"
    :height="22"
    :alpha="0.3"
  >
    <div style="height: 300px" />
  </t-watermark>
</template>
