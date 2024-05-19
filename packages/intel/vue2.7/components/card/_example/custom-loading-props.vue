<template>
  <t-card bordered :title="title" :loading="isLoading" :style="{ width: '400px' }" :loading-props="customProps">
    {{ infoMessage }}
  </t-card>
</template>

<script>
export default {
  data() {
    return {
      title: '自定义loadingProps Card',
      isLoading: true,
      customProps: {
        text: 'TDesign努力加载中...',
      },
      infoMessage: '卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。',
    };
  },
};
</script>
