<template>
  <div>
    <t-input-number v-model="value" theme="normal" :max="15" :min="-2" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(3);
    return {
      value,
    };
  },
});
</script>
