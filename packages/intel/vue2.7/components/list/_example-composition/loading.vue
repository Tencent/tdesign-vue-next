<template>
  <t-space direction="vertical">
    <t-radio-group v-model="asyncLoadingRadio" variant="default-filled">
      <t-radio-button value="load-more">加载更多</t-radio-button>
      <t-radio-button value="loading">加载中</t-radio-button>
      <t-radio-button value="loading-custom">自定义加载更多</t-radio-button>
      <t-radio-button value="">加载完成</t-radio-button>
    </t-radio-group>

    <t-list :async-loading="asyncLoading" @load-more="loadMore" split>
      <t-list-item v-for="i in listCount" :key="i">
        <t-list-item-meta :image="imageUrl" title="列表标题" description="列表内容的描述性文字"></t-list-item-meta>
      </t-list-item>
    </t-list>
  </t-space>
</template>

<script setup lang="jsx">
import { ref, watch } from 'vue';

const asyncLoadingRadio = ref('load-more');
const asyncLoading = ref('load-more');
const listCount = ref(3);
const imageUrl = ref('https://tdesign.gtimg.com/site/avatar.jpg');
// 点击加载更多，状态切换为「加载中」
const loadMore = () => {
  asyncLoadingRadio.value = 'loading';
};
// 也可以使用插槽自定义加载内容
watch(asyncLoadingRadio, (val) => {
  if (val === 'loading-custom') {
    asyncLoading.value = () => <div> 没有更多数据了 </div>;
  } else {
    asyncLoading.value = asyncLoadingRadio.value;
  }
});
</script>
