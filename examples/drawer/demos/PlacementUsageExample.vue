<template>
  <div>
    <t-drawer :visible="visible" @close="handleClose" v-bind:placement="placement"><p>This is a drawer</p></t-drawer>
    <div class="tdesign-radio-button">
      <t-radio-group :defaultValue="placement" v-model="placement">
        <t-radio-button value="left">left</t-radio-button>
        <t-radio-button value="right">right</t-radio-button>
        <t-radio-button value="top">top</t-radio-button>
        <t-radio-button value="bottom">bottom</t-radio-button>
      </t-radio-group>
      <t-button theme="primary" @click="handleClick" class="t-button">Open</t-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      visible: false,
      placement: 'right',
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
  margin-left: 20px;
}
</style>
