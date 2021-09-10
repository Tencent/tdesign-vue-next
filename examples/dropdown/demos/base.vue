<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options" @click="clickHandler">
      <div class="tdesign-demo-dropdown-trigger" >
        <t-button variant="text">
          更多 <t-icon name="chevron-down" size="14" />
        </t-button>
      </div>
    </t-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          content: '操作一',
          value: 1,
        },
        {
          content: '操作二',
          value: 2,
        },
        {
          content: '操作三',
          value: 3,
        },
        {
          content: '操作四',
          value: 4,
        },
      ],
    };
  },
  methods: {
    clickHandler(data) {
      console.log(data)
      this.$message.success(`选中【${data.content}】`);
    },
  },
};
</script>
<style lang="less" scoped>
.tdesign-demo-dropdown {
  .t-button__text {
    display: flex;
  }
}
</style>
