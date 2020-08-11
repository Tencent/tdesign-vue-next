<template>
  <div>
    <t-dropdown :options="options" @click="clickHandler" @visibleChange="visibleChangeHandler" >
      <t-button>hover我试试</t-button>
    </t-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [{
        text: '选项一',
        id: 1,
      }, {
        text: '选项二',
        id: 2,
      }, {
        text: '选项三',
        id: 3,
      }, {
        text: '选项四',
        id: 4,
      }],
    };
  },
  methods: {
    clickHandler(data) {
      this.$message.success(`选中【${data.text}】`);
    },
    visibleChangeHandler(visible) {
      this.$message.info(`dropdown已${visible ? '显示' : '隐藏'}`);
    },
  },
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
