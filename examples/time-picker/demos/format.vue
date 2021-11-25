<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="time" class="demos" format="h:m:s a" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const time = ref('00:00:00 am');

    return {
      time,
    };
  },
});
</script>
