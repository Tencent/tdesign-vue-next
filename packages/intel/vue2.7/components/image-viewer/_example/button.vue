<template>
  <div>
    <t-image-viewer v-model="visible" :trigger="trigger" :images="['https://tdesign.gtimg.com/demo/demo-image-1.png']">
    </t-image-viewer>
  </div>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      visible: false,
      trigger: (h, { open }) => <t-button onClick={open}>预览单张图片</t-button>,
    };
  },
};
</script>
