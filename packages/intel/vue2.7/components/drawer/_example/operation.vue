<template>
  <div>
    <t-drawer :visible="visible" @close="handleClose" :onConfirm="handleClose" header="抽屉标题">
      <div class="t-drawer-demo-div">
        <span>标签 A</span>
        <t-input />
      </div>
      <div class="t-drawer-demo-div">
        <span>标签 B</span>
        <t-input />
      </div>
      <div class="t-drawer-demo-div">
        <span>标签 C</span>
        <t-input />
      </div>
    </t-drawer>
    <t-button variant="outline" @click="handleClick">打开抽屉</t-button>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    setVisible(state) {
      this.visible = state;
    },
    handleClick() {
      this.setVisible(true);
    },
    handleClose() {
      this.setVisible(false);
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
.t-drawer-demo-div {
  margin-bottom: 24px;
}
</style>
