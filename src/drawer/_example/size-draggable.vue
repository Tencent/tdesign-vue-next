<template>
  <div>
    <!-- @cancel 和 :onCancel 两种写法都支持； :onOverlayClick 和 @overlay-click 两种写法都支持--->
    <t-drawer
      v-model:visible="visible"
      header="标题名称"
      :on-overlay-click="() => (visible = false)"
      :placement="placement"
      :size-draggable="true"
      :on-size-drag-end="handleSizeDrag"
      @cancel="visible = false"
    >
      <p>抽屉的内容</p>
    </t-drawer>
    <t-space direction="vertical">
      <t-radio-group v-model="placement" :default-value="placement">
        <t-radio-button value="left">从左侧拖拽抽屉</t-radio-button>
        <t-radio-button value="right">从右侧拖拽抽屉</t-radio-button>
        <t-radio-button value="top">从上方拖拽抽屉</t-radio-button>
        <t-radio-button value="bottom">从下方拖拽抽屉</t-radio-button>
      </t-radio-group>
      <t-button variant="outline" class="btn-top-margin" @click="visible = true">打开抽屉</t-button>
    </t-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const placement = ref('right');

function handleSizeDrag({ size }) {
  console.log('size drag size: ', size);
}
</script>
