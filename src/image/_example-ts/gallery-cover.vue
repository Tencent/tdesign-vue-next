<template>
  <t-image
    src="https://tdesign.gtimg.com/demo/demo-image-1.png"
    :style="{ width: '284px', height: '160px' }"
    :gallery="true"
    :overlay-content="label"
  />
</template>

<script lang="tsx" setup>
import { Tag, ImageProps } from 'tdesign-vue-next';
const label: ImageProps['overlayContent'] = () => (
  <Tag
    shape="mark"
    theme="warning"
    style={{
      margin: '8px',
      borderRadius: '3px',
      background: 'rgba(236,242,254,1)',
      color: 'rgba(0,82,217,1)',
    }}
  >
    标签一
  </Tag>
);
</script>
