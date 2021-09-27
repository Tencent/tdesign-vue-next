<template>
  <div>
    <t-dropdown :options="options" @click="clickHandler">
      <t-button theme="primary" variant="outline">
        <template #icon>
          <t-icon-ellipsis size="12"/>
        </template>
      </t-button>
    </t-dropdown>
  </div>
</template>
<script>
import TIconEllipsis from '@tencent/tdesign-vue-next/icon/ellipsis';

export default {
  components: {
    TIconEllipsis,
  },
  data() {
    return {
      options: [{
        content: '选项一',
        value: 1,
      }, {
        content: '选项二',
        value: 2,
      }, {
        content: '选项三',
        value: 3,
      }, {
        content: '选项四',
        value: 4,
      }],
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
