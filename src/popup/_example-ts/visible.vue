<template>
  <t-space>
    <t-popup :visible="visible">
      <t-button variant="outline" @click="onToggle">点击控制浮层显示</t-button>
      <template #content>
        <div>浮层显示与否可以在外部自由控制</div>
      </template>
    </t-popup>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ButtonProps } from 'tdesign-vue-next';
const visible = ref(false);
const onToggle: ButtonProps['onClick'] = () => {
  visible.value = !visible.value;
};
</script>
