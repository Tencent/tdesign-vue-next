<template>
  <t-space :size="32">
    <t-space direction="vertical">
      <strong :style="{ fontSize: '20px' }">有遮罩</strong>
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :style="{ width: '284px', height: '160px' }"
        :overlay-content="renderMask"
      />
    </t-space>
    <t-space direction="vertical">
      <strong :style="{ fontSize: '20px' }">无遮罩</strong>
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :style="{ width: '284px', height: '160px' }"
        :overlay-content="renderButton"
      />
    </t-space>

    <t-space direction="vertical">
      <strong :style="{ fontSize: '20px' }">插槽使用</strong>
      <t-image src="https://tdesign.gtimg.com/demo/demo-image-1.png" :style="{ width: '284px', height: '160px' }">
        <template #overlayContent>
          <Tag
            shape="mark"
            theme="primary"
            variant="light"
            :style="{ position: 'absolute', right: '8px', bottom: '8px', borderRadius: '3px' }"
          >
            <PrintIcon size="16" /> 高清
          </Tag>
        </template>
      </t-image>
    </t-space>
  </t-space>
</template>

<script lang="tsx" setup>
import { Tag, ImageProps } from 'tdesign-vue-next';
import { PrintIcon } from 'tdesign-icons-vue-next';
const renderMask: ImageProps['overlayContent'] = () => (
  <div
    style={{
      background: 'rgba(0,0,0,.4)',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      lineHeight: '22px',
    }}
  >
    <Tag
      shape="mark"
      theme="warning"
      style={{
        borderRadius: '3px',
        background: 'transparent',
        color: '#fff',
      }}
    >
      <PrintIcon size="16" /> 高清
    </Tag>
  </div>
);
const renderButton: ImageProps['overlayContent'] = () => (
  <Tag
    shape="mark"
    theme="primary"
    variant="light"
    style={{
      position: 'absolute',
      right: '8px',
      bottom: '8px',
      borderRadius: '3px',
    }}
  >
    <PrintIcon size="16" /> 高清
  </Tag>
);
</script>
