<template>
  <div>
    <!-- @cancel 和 :onCancel 两种写法都支持； :onOverlayClick 和 @overlay-click 两种写法都支持-->
    <t-drawer
      v-model:visible="visible"
      header="标题名称"
      :on-overlay-click="() => (visible = false)"
      :placement="placement"
      @cancel="visible = false"
    >
      <p>抽屉的内容</p>
    </t-drawer>
    <t-space direction="vertical">
      <t-radio-group v-model="placement" :default-value="placement">
        <t-radio-button value="left">左侧</t-radio-button>
        <t-radio-button value="right">右侧</t-radio-button>
        <t-radio-button value="top">上方</t-radio-button>
        <t-radio-button value="bottom">下方</t-radio-button>
      </t-radio-group>
      <t-button variant="outline" class="btn-top-margin" @click="visible = true">打开抽屉</t-button>
    </t-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RadioGroupProps } from 'tdesign-vue-next';
const visible = ref(false);
const placement = ref<RadioGroupProps['defaultValue']>('right');
</script>
