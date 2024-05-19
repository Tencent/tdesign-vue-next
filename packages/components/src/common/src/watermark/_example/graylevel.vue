<template>
  <t-watermark
    :watermark-content="{
      url: 'https://tdesign.gtimg.com/starter/brand-logo-light.png',
      isGrayscale: true,
    }"
    :x="100"
    :y="140"
    :width="158"
    :height="22"
    :alpha="0.3"
  >
    <div style="height: 300px" />
  </t-watermark>
</template>
