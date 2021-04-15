<template>
  <div>
    <t-drawer :visible="visible" @close="handleClose"><p>This is a drawer</p></t-drawer>
    <t-button theme="primary" @click="handleClick">Open</t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
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
