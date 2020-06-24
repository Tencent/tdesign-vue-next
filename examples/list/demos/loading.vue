<template>
  <div>
    <t-list :split="true" loading="loading">
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
      </t-list-item>
    </t-list>

    <div style="margin-bottom:16px"></div>

    <t-list :split="true" loading="load-more" @loadMore="loadMore">
      <t-list-item v-for="i in listCount" :key="i">
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
      </t-list-item>
    </t-list>

    <p style="margin:16px 0;">
      loading 除了使用内置的 props 外，也可以通过 slot 自行定义内容。
    </p>

    <t-list loading="loading" :split="true">
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
      </t-list-item>
      <template #loading>DIY 的正在加载……</template>
    </t-list>

    <div style="margin-bottom:16px"></div>

    <t-list loading="load-more" :split="true" @loadMore="loadMore">
      <t-list-item v-for="i in listCount" :key="i">
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
      </t-list-item>
      <template #loading>DIY 的加载更多</template>
    </t-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listCount: 1,
    };
  },
  methods: {
    loadMore() {
      this.listCount += 1;
    },
  },
};
</script>
