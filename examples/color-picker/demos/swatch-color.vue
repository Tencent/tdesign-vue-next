<template>
  <div class="tdesign-demo-block-row">
    <div>
      <h6>自定义系统色</h6>
      <t-color-picker-panel v-model="color" :swatch-colors="systemColors" />
    </div>
    <div>
      <h6>完全不显示系统色</h6>
      <t-color-picker-panel v-model="color" :swatch-colors="null" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const color = ref('#0052d9');
    const systemColors = ref(['red', 'green', 'yellow', 'blue', 'purple']);
    return {
      color,
      systemColors,
    };
  },
});
</script>
<style scoped>
.tdesign-demo-block-row {
  align-items: flex-start;
}
h6 {
  margin-bottom: 10px;
}
</style>
