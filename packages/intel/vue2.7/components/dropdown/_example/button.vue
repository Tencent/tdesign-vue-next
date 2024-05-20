<template>
  <div>
    <t-dropdown :options="options" @click="clickHandler">
      <t-button theme="default" variant="outline" shape="square">
        <t-icon name="ellipsis" size="16" />
      </t-button>
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
      this.$message.success(`选中【${data.content}】`);
    },
  },
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
