<template>
  <div class="tdesign-demo-block-column">
    <div>
      <t-radio-group v-model="asyncLoadingRadio" variant="default-filled">
        <t-radio-button value="load-more"> 加载更多 </t-radio-button>
        <t-radio-button value="loading"> 加载中 </t-radio-button>
        <t-radio-button value="loading-custom"> 自定义加载更多 </t-radio-button>
        <t-radio-button value=""> 加载完成 </t-radio-button>
      </t-radio-group>
    </div>
    <t-list :async-loading="asyncLoading" split @load-more="loadMore">
      <t-list-item v-for="i in listCount" :key="i">
        <t-list-item-meta :image="imageUrl" title="列表标题" description="列表内容的描述性文字" />
      </t-list-item>
    </t-list>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    const listCount = ref(3);
    const asyncLoadingRadio = ref('load-more');

    const loadMore = () => {
      asyncLoadingRadio.value = 'loading';
    };

    const asyncLoading = computed(() => {
      if (asyncLoadingRadio.value === 'loading-custom') {
        return () => <div> 没有更多数据了 </div>;
      }
      return asyncLoadingRadio.value;
    });

    return {
      listCount,
      asyncLoadingRadio,
      asyncLoading,
      loadMore,
      imageUrl: 'https://tdesign.gtimg.com/site/avatar.jpg',
    };
  },
});
</script>
