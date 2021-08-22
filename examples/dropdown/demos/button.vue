<template>
  <div>
    <t-dropdown :options="options" @click="clickHandler">
      <t-button><t-icon-more slot="icon"/></t-button>
    </t-dropdown>
  </div>
</template>
<script>
import TIconMore from '@tencent/tdesign-vue-next/lib/icon/more';
export default {
  components: {
    TIconMore,
  },
  data() {
    return {
      options: [{
        text: '选项一',
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
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
