<template>
  <t-space direction="vertical" align="center">
    <t-image
      src="https://tdesign.gtimg.com/demo/demo-image-1.png"
      :srcset="{
        'image/avif': 'https://tdesign.gtimg.com/img/tdesign-image.avif',
        'image/webp': 'https://tdesign.gtimg.com/img/tdesign-image.webp',
      }"
      shape="square"
      :style="{ maxWidth: '100%' }"
      fit="scale-down"
    />
    <span>.avif / .webp</span>
  </t-space>
</template>
