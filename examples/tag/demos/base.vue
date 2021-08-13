<template>
  <div class="tag-demo">
    <t-tag @click="onClick">默认</t-tag>
    <a href="https://www.tencent.com/zh-cn" target="_blank">
      <t-tag>超链接</t-tag>
    </a>
  </div>
</template>

<script>

export default {
  methods: {
    onClick({ e }) {
      e.stopPropagation();
    },
  },
};
</script>

<style lang="less" scoped>
.tag-demo {
  width: 500px;
  display: flex;
  > * {
    margin-right: 30px;
  }
}
</style>
