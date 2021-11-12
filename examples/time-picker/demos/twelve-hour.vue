<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="value" format="hh:mm:ss a" :hideDisabledTime="false" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref('10:20:30 am');
    return {
      value
    }
  }
});
</script>
