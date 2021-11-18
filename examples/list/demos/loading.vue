<template>
  <div>
    <t-list
      :split="true"
      async-loading="loading"
      :on-load-more="onLoadMore"
    >
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
    </t-list>

    <div style="margin-bottom:16px" />

    <t-list
      :split="true"
      async-loading="loading-more"
      @load-more="loadMore"
    >
      <t-list-item
        v-for="i in listCount"
        :key="i"
      >
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
    </t-list>

    <p style="margin:16px 0;">
      loading 除了使用内置的 props 外，也可以通过 slot 自行定义内容。
    </p>

    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
      <template #asyncLoading>
        DIY 的正在加载……
      </template>
    </t-list>

    <div style="margin-bottom:16px" />

    <t-list
      :split="true"
      @load-more="loadMore"
    >
      <t-list-item
        v-for="i in listCount"
        :key="i"
      >
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
      <template #asyncLoading>
        DIY 的加载更多
      </template>
    </t-list>

    <div style="margin:16px 0;">
      loading 还可以传入自定义函数，优先级高于slot。
    </div>

    <t-list
      :async-loading="renderLoading"
      :split="true"
      @load-more="loadMore"
    >
      <t-list-item
        v-for="i in listCount"
        :key="i"
      >
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
      <template #asyncLoading>
        DIY 的加载更多
      </template>
    </t-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const listCount = ref(1);

    const loadMore = () => {
      listCount.value += 1;
    };

    const renderLoading = () => '自定义loading（function）';

    const onLoadMore = (e) => {
      console.log('onLoadMore触发', e);
    };

    return {
      listCount,
      renderLoading,
      onLoadMore,
      loadMore,
      avatarUrl: 'https://tdesign.gtimg.com/list-icon.png',
    };
  },
});
</script>
