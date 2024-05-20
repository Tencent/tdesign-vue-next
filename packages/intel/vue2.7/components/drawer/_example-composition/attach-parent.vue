<template>
  <div class="t-container">
    <div class="t-suf-container">
      <t-drawer :visible.sync="visible" :placement="placement" :mode="mode" header="抽屉标题" showInAttachedElement>
        <p>抽屉的内容</p>
      </t-drawer>
      <div class="tdesign-radio-button">
        抽屉弹出方向：
        <t-radio-group v-model="placement">
          <t-radio-button value="left">左侧</t-radio-button>
          <t-radio-button value="right">右侧</t-radio-button>
          <t-radio-button value="top">上方</t-radio-button>
          <t-radio-button value="bottom">下方</t-radio-button>
        </t-radio-group>
      </div>
      <br />
      <div class="tdesign-radio-button">
        抽屉弹出模式：
        <t-radio-group v-model="mode">
          <t-radio-button value="overlay">overlay</t-radio-button>
          <t-radio-button value="push">push</t-radio-button>
        </t-radio-group>
      </div>
      <br /><br />
      <t-button variant="outline" @click="visible = true">打开抽屉</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const placement = ref('right');
const mode = ref('overlay');
</script>
<style scoped>
.t-container {
  position: relative;
  height: 400px;
  overflow: hidden;
  border: 1px solid #ebedf0;
  border-radius: 2px;
}
.t-suf-container {
  height: 100%;
  padding: 48px;
}
</style>
