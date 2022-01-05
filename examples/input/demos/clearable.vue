<template>
  <div class="tdesign-demo-block-column" style="max-width: 500px">
    <t-input v-model="value" clearable placeholder="请输入" @clear="onClear" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('Hello TDesign');
    const onClear = () => {
      console.log('clear');
    };
    return {
      value,
      onClear,
    };
  },
});
</script>
