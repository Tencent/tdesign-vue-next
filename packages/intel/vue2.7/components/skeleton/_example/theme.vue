<template>
  <t-row class="t-skeleton-demo">
    <t-col v-for="(theme, index) in themes" :key="`theme-${index}`">
      <section class="t-skeleton-demo-card">
        <div class="header">
          {{ theme.label }}
        </div>
        <div class="content">
          <t-skeleton :theme="theme.value"></t-skeleton>
        </div>
      </section>
    </t-col>
  </t-row>
</template>

<script>
export default {
  data() {
    return {
      themes: [
        { label: '文本', value: 'text' },
        { label: '头像', value: 'avatar' },
        { label: '段落', value: 'paragraph' },
        { label: '头像描述', value: 'avatar-text' },
        { label: '选项卡', value: 'tab' },
        { label: '文章', value: 'article' },
      ],
    };
  },
};
</script>
