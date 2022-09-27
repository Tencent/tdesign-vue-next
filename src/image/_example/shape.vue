<template>
  <t-space>
    <t-space direction="vertical" align="center">
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        shape="square"
        :style="{ width: '160px', height: '160px' }"
        fit="cover"
      />
      <span>square</span>
    </t-space>
    <t-space direction="vertical" align="center">
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :style="{ width: '160px', height: '160px' }"
        fit="cover"
        shape="round"
      />
      <span>round</span>
    </t-space>
    <t-space direction="vertical" align="center">
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :style="{ width: '160px', height: '160px' }"
        shape="circle"
        fit="cover"
      />
      <span>circle</span>
    </t-space>
  </t-space>
</template>
