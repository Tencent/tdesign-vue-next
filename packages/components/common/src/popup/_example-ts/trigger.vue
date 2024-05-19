<template>
  <t-space>
    <t-popup content="文字提示仅展示文本内容" destroy-on-close>
      <t-button variant="outline">悬浮时触发（默认）</t-button>
    </t-popup>
    <t-popup content="文字提示仅展示文本内容" destroy-on-close trigger="click" :on-visible-change="onVisibleChange">
      <t-button variant="outline">点击时触发</t-button>
    </t-popup>
    <t-popup content="文字提示仅展示文本内容" destroy-on-close trigger="focus">
      <t-input placeholder="获得焦点时触发" />
    </t-popup>
    <t-popup content="文字提示仅展示文本内容" destroy-on-close trigger="context-menu">
      <t-button variant="outline">右击时触发</t-button>
    </t-popup>
  </t-space>
</template>

<script lang="ts" setup>
import { PopupProps } from 'tdesign-vue-next';
const onVisibleChange: PopupProps['onVisibleChange'] = (visible, context) => {
  console.log(visible, context);
};
</script>
