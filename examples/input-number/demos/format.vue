<template>
  <div>
    <t-input-number v-model="value" :max="15" :min="-2" :format="(value) => `${value}%`" @change="onChange" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(3);

    return {
      value,
      onChange(ev) {
        console.info(ev);
      },
    };
  },
});
</script>
