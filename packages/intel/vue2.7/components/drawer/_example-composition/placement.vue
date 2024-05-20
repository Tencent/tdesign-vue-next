<template>
  <t-space>
    <!-- @click-cancel 和 :onClickCancel 两种写法都支持； :onClickOverlay 和 @click-overlay 两种写法都支持-->
    <t-drawer
      header="抽屉标题"
      :visible="visible"
      @cancel="visible = false"
      :onOverlayClick="() => (visible = false)"
      :onConfirm="() => (visible = false)"
      :placement="placement"
    >
      <p>抽屉的内容</p>
    </t-drawer>
    <t-space direction="vertical">
      <t-radio-group :defaultValue="placement" v-model="placement">
        <t-radio-button value="left">左侧</t-radio-button>
        <t-radio-button value="right">右侧</t-radio-button>
        <t-radio-button value="top">上方</t-radio-button>
        <t-radio-button value="bottom">下方</t-radio-button>
      </t-radio-group>
      <t-button variant="outline" @click="visible = true" class="btn-top-margin">打开抽屉</t-button>
    </t-space>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const placement = ref('right');
</script>
