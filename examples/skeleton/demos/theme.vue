<template>
  <t-row class="t-skeleton-demo">
    <t-col v-for="(theme, index) in themes" :key="`theme-${index}`">
      <section class="t-skeleton-demo-card">
        <div class="header">
          {{ theme }}
        </div>
        <div class="content">
          <t-skeleton :theme="theme"></t-skeleton>
        </div>
      </section>
    </t-col>
  </t-row>
</template>

<script>
export default {
  data() {
    return {
      themes: ['text', 'avatar', 'paragraph', 'avatar-text', 'tab', 'article'],
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
.t-skeleton-demo {
  &-card {
    margin: 16px;
    border: 1px solid #eee;
    .header {
      padding: 16px;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 16px;
    }
  }
}
</style>
