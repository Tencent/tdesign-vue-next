<template>
  <div>
    <t-drawer :visible="visible" @close="handleClose">
      <div>
        <span>Label A</span>
        <t-input />
      </div>
      <div>
        <span>Label B</span>
        <t-input />
      </div>
      <div>
        <span>Label C</span>
        <t-input />
      </div>
    </t-drawer>
    <t-button theme="primary" @click="handleClick">Open</t-button>
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
</style>
