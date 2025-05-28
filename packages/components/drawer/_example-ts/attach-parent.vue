<template>
  <div class="t-container">
    <div class="t-suf-container">
      <t-drawer
        v-model:visible="visible"
        :placement="placement"
        :mode="mode"
        header="抽屉标题"
        show-in-attached-element
      >
        <p>This is a drawer</p>
      </t-drawer>
      <t-space direction="vertical">
        <t-space align="center">
          抽屉弹出方向：
          <t-radio-group v-model="placement">
            <t-radio-button value="left">left</t-radio-button>
            <t-radio-button value="right">right</t-radio-button>
            <t-radio-button value="top">top</t-radio-button>
            <t-radio-button value="bottom">bottom</t-radio-button>
          </t-radio-group>
        </t-space>

        <t-space align="center">
          抽屉弹出模式：
          <t-radio-group v-model="mode">
            <t-radio-button value="overlay">overlay</t-radio-button>
            <t-radio-button value="push">push</t-radio-button>
          </t-radio-group>
        </t-space>

        <t-button variant="outline" @click="visible = true">打开抽屉</t-button>
      </t-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerProps } from 'tdesign-vue-next';
const visible = ref(false);
const placement = ref<DrawerProps['placement']>('right');
const mode = ref<DrawerProps['mode']>('overlay');
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
