<template>
  <div class="tdesign-demo-block-row">
    <t-switch />
    <t-switch v-model="checked" @change="onChange" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checked = ref(true);

    return {
      checked,
      onChange(val) {
        console.log(val);
      },
    };
  },
});
</script>
