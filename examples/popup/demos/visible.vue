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
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    return {
      visible,
      onToggle() {
        visible.value = !visible.value;
      },
    };
  },
});
</script>
