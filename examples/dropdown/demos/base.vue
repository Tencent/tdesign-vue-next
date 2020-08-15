<template>
  <div>
    <t-dropdown :options="options" @click="clickHandler">
      <t-button>hover我试试</t-button>
    </t-dropdown>
  </div>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      options: [{
        text: '选项一选项一选项一选项一',
        id: 1,
        iconName: 'android',
      }, {
        text: '选项二',
        id: 2,
        iconName: 'apple',
      }, {
        text: '选项三',
        id: 3,
        iconName: 'books',
      }, {
        text: '选项四',
        id: 4,
        iconName: 'cloud',
      }],
    };
  },
  methods: {
    clickHandler(data) {
      this.$message.success(`选中【${data.text}】`);
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
