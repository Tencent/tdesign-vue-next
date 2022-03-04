<template>
  <div class="tdesign-demo-block-row">
    <div>
      <h6>预设最近使用色</h6>
      <t-color-picker-panel
        v-model="color"
        :recent-colors="[
          'red',
          'green',
          'yellow',
          'blue',
          'purple',
          'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
          'linear-gradient(45deg, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)',
          'linear-gradient(120deg, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)',
        ]"
      />
    </div>
    <div>
      <h6>完全不显示最近使用色</h6>
      <t-color-picker-panel v-model="color" :recent-colors="null" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const color = ref('#0052d9');
    return {
      color,
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
