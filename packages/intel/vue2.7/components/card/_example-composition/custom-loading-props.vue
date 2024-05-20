<template>
  <t-card bordered :title="title" :loading="isLoading" :style="{ width: '400px' }" :loading-props="customProps">
    {{ infoMessage }}
  </t-card>
</template>

<script setup>
import { ref, reactive } from 'vue';

const title = ref('自定义loadingProps Card');
const isLoading = ref(true);
const customProps = reactive({
  text: 'TDesign努力加载中...',
});
const infoMessage = ref('卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。');
</script>
