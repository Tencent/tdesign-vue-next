<template>
  <div class="tdesign-demo-block-row">
    <t-color-picker-panel v-model="color" disabled />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const color = ref('#0052d9');
    return {
      color,
    };
  },
});
</script>
