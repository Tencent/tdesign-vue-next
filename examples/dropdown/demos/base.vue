<template>
  <div>
    <t-dropdown :options="options" @click="clickHandler">
      <t-button variant="text" class="tdesign-demo-dropdown"
      >更多 <t-icon name="chevron-down" class="tdesign-demo-arrow"
      /></t-button>
    </t-dropdown>
  </div>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      options: [
        {
          text: '操作一',
          id: 1,
        },
        {
          text: '操作二',
          id: 2,
        },
        {
          text: '操作三',
          id: 3,
        },
        {
          text: '操作四',
          id: 4,
        },
      ],
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
.tdesign-demo-dropdown:hover .tdesign-demo-arrow {
  transition: all 0.2s;
  transform: rotateZ(-180deg);
}
.t-button {
  margin-right: 20px;
}
</style>
