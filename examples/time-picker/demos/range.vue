<template>
  <div class="tdesign-demo-block">
    <t-time-range-picker
      v-model="time"
      class="demos"
      clearable
      format="HH:mm:ss"
      allow-input
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const time = ref(['00:00:00', '23:59:59']);
    return {
      time,
    };
  },
});
</script>
