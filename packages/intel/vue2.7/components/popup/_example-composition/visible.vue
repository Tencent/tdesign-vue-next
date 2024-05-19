<template>
  <div>
    <t-popup :visible="visible">
      <t-button variant="outline" @click="onToggle">点击控制浮层显示</t-button>
      <template #content>
        <div>浮层显示与否可以在外部自由控制</div>
      </template>
    </t-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const onToggle = () => {
  visible.value = !visible.value;
};
</script>
