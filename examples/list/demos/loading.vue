<template>
  <div>
    <t-list :split="true" async-loading="loading" :onLoadMore="onLoadMore">
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
      </t-list-item>
    </t-list>

    <div style="margin-bottom:16px"></div>

    <t-list :split="true" async-loading="loading-more" @load-more="loadMore">
      <t-list-item v-for="i in listCount" :key="i">
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
      </t-list-item>
    </t-list>

    <p style="margin:16px 0;">
      loading 除了使用内置的 props 外，也可以通过 slot 自行定义内容。
    </p>

    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
      </t-list-item>
      <template #asyncLoading>DIY 的正在加载……</template>
    </t-list>

    <div style="margin-bottom:16px"></div>

    <t-list :split="true" @load-more="loadMore">
      <t-list-item v-for="i in listCount" :key="i">
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
      </t-list-item>
      <template #asyncLoading>DIY 的加载更多</template>
    </t-list>

    <div style="margin:16px 0;">
      loading 还可以传入自定义函数，优先级高于slot。
    </div>

    <t-list :async-loading="renderLoading" :split="true" @load-more="loadMore">
      <t-list-item v-for="i in listCount" :key="i">
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
      </t-list-item>
      <template #asyncLoading>DIY 的加载更多</template>
    </t-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listCount: 1,
      avatarUrl: 'https://tdesign.gtimg.com/list-icon.png',
    };
  },
  methods: {
    loadMore() {
      this.listCount += 1;
    },
    renderLoading() {
      return '自定义loading（function）';
    },
    onLoadMore(e) {
      console.log('onLoadMore触发', e);
    },
  },
};
</script>
