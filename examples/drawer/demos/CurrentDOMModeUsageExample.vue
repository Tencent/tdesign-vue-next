<template>
  <div class="t-container">
    <div class="t-suf-container">
      <t-drawer :visible="visible" @close="handleClose" v-bind:placement="placement" :attach="true" :mode="'push'">
        <p>This is a drawer</p>
      </t-drawer>
      <div class="tdesign-radio-button">
        渲染在当前元素中。
        <t-radio-group :defaultValue="placement" v-model="placement">
          <t-radio-button value="left">left</t-radio-button>
          <t-radio-button value="right">right</t-radio-button>
          <t-radio-button value="top">top</t-radio-button>
          <t-radio-button value="bottom">bottom</t-radio-button>
        </t-radio-group>
        <t-button theme="primary" @click="handleClick" class="t-button">Open</t-button>
      </div>
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
.t-container {
  position: relative;
  height: 400px;
  overflow: hidden;
  text-align: center;
  background: #fafafa;
  border: 1px solid #ebedf0;
  border-radius: 2px;
}
.t-suf-container {
  height: 100%;
  padding: 48px;
}
.t-button {
  margin-left: 20px;
}
</style>
