<template>
  <t-watermark
    :watermark-content="{
      text: '文字水印',
    }"
    :width="120"
    :height="60"
    :y="200"
    :x="210"
    movable
  >
    <div style="height: 300px" />
  </t-watermark>
</template>
