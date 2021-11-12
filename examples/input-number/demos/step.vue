<template>
  <div>
    <t-input-number
      v-model="value"
      :max="15"
      :min="-5"
      :step="1.2"
      :decimal-places="2"
      @change="onChange"
    ></t-input-number>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(3.2);
    return {
      value,
      onChange(ev) {
        console.info(ev);
      },
    }
  },
});
</script>
