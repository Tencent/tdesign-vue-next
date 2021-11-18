<template>
  <div class="tdesign-demo-block">
    <t-time-picker
      v-model="value"
      @change="timechange"
      @open="open"
      @close="close"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('12:20:30');
    return {
      value,
      timechange(time) {
        console.log(time);
      },
      open() {
        console.log('open');
      },
      close() {
        console.log('close');
      },
    };
  },
});
</script>
