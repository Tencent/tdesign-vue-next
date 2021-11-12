<template>
  <div class="tdesign-demo-block">
    <t-time-range-picker class="demos" clearable v-model="time" format="HH:mm:ss" allowInput />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const time = ref(['00:00:00', '23:59:59']);
    return {
      time
    }
  }
});
</script>
