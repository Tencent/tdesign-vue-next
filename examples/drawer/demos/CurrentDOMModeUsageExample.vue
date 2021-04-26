<template>
  <div class="t-container">
    <div class="t-suf-container">
      <t-drawer
        v-model:visible="visible"
        :placement="placement"
        :mode="mode"
        header="标题名称"
        showInAttachedElement
      >
        <p>This is a drawer</p>
      </t-drawer>
      <div class="tdesign-radio-button">
        抽屉弹出方向：
        <t-radio-group v-model="placement">
          <t-radio-button value="left">left</t-radio-button>
          <t-radio-button value="right">right</t-radio-button>
          <t-radio-button value="top">top</t-radio-button>
          <t-radio-button value="bottom">bottom</t-radio-button>
        </t-radio-group>
      </div>
      <br>
      <div class="tdesign-radio-button">
        抽屉弹出模式：
        <t-radio-group v-model="mode">
          <t-radio-button value="overlay">overlay</t-radio-button>
          <t-radio-button value="push">push</t-radio-button>
        </t-radio-group>
      </div>
      <br><br>
      <t-button @click="visible = true">Open</t-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      visible: false,
      placement: 'right',
      mode: 'overlay',
    };
  },
});
</script>
<style scoped>
.t-container {
  position: relative;
  height: 400px;
  overflow: hidden;
  background: #fafafa;
  border: 1px solid #ebedf0;
  border-radius: 2px;
}
.t-suf-container {
  height: 100%;
  padding: 48px;
}
</style>
