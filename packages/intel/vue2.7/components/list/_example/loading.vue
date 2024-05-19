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

<script lang="jsx">
export default {
  data() {
    return {
      asyncLoadingRadio: 'load-more',
      asyncLoading: 'load-more',
      listCount: 3,
      imageUrl: 'https://tdesign.gtimg.com/site/avatar.jpg',
    };
  },
  watch: {
    // 也可以使用插槽自定义加载内容
    asyncLoadingRadio(val) {
      if (val === 'loading-custom') {
        this.asyncLoading = () => <div> 没有更多数据了 </div>;
      } else {
        this.asyncLoading = this.asyncLoadingRadio;
      }
    },
  },
  methods: {
    // 点击加载更多，状态切换为「加载中」
    loadMore() {
      this.asyncLoadingRadio = 'loading';
    },
  },
};
</script>
