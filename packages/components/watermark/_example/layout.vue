<template>
  <h3>横平竖直的水印</h3>
  <t-watermark
    :watermark-content="{
      text: '文字水印',
    }"
    :width="120"
    :height="60"
    :y="120"
    :x="80"
  >
    <div style="height: 300px" />
  </t-watermark>

  <h3>错位的水印</h3>
  <t-watermark
    :watermark-content="{
      text: '文字水印',
    }"
    :width="120"
    :height="60"
    :y="120"
    :x="80"
    layout="hexagonal"
  >
    <div style="height: 300px" />
  </t-watermark>

  <!-- 下方代码用于测试新特性功能，cr完毕后删除 -->
  <h3>Watermark Test</h3>
  <t-watermark
    :watermark-content="[
      {
        text: '文字水印',
        fontColor: '#0052D9',
      },
      {
        text: '水印水印水印水印',
        fontColor: '#0052D9',
      },
    ]"
    :width="120"
    :height="60"
    :y="120"
    :x="80"
    layout="hexagonal"
  >
    <div style="height: 300px" />
  </t-watermark>

  多行水印
  <t-watermark
    :watermark-content="[
      { text: '水印文本', fontColor: '#0052D9' },
      { text: '水印水印水印水印', fontColor: '#0052D9' },
      { text: '文本文本文本文本文本文本', fontColor: '#0052D9' },
      { url: 'https://tdesign.gtimg.com/starter/brand-logo-light.png' },
    ]"
    :line-space="24"
    :x="100"
    :y="120"
    :width="158"
    :height="22"
    layout="hexagonal"
  >
    <div style="height: 300px" />
  </t-watermark>

  多行水印-奇怪用法
  <t-watermark
    :watermark-content="[
      { text: '水印文本', fontColor: '#0052D9' },
      { url: 'https://tdesign.gtimg.com/starter/brand-logo-light.png' },
      { text: '水印文本', fontColor: '#0052D9' },
      { url: 'https://tdesign.gtimg.com/starter/brand-logo-light.png' },
    ]"
    :line-space="24"
    :x="100"
    :y="120"
    :width="158"
    :height="22"
    layout="hexagonal"
  >
    <div style="height: 300px" />
  </t-watermark>

  多行灰度水印
  <t-watermark
    :watermark-content="[
      { text: '水印文本', fontColor: '#0052D9' },
      { url: 'https://tdesign.gtimg.com/starter/brand-logo-light.png', isGrayscale: true },
    ]"
    :line-space="24"
    :x="100"
    :y="120"
    :width="158"
    :height="22"
    layout="hexagonal"
  >
    <div style="height: 300px" />
  </t-watermark>
</template>
