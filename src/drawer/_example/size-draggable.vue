<template>
  <div>
    <!-- @click-cancel 和 :onClickCancel 两种写法都支持； :onClickOverlay 和 @click-overlay 两种写法都支持-->
    <t-drawer
      v-model:visible="visible"
      header="标题名称"
      :on-click-overlay="() => (visible = false)"
      :placement="placement"
      :size-draggable="true"
      @click-cancel="visible = false"
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
</script>
