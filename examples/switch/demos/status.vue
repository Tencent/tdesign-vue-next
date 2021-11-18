<template>
  <div class="switch-demo">
    <div class="tdesign-demo-block">
      <t-switch v-model="checked1" />
      <t-switch
        v-model="checked2"
        loading
      />
      <t-switch disabled />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checked1 = ref(true);
    const checked2 = ref(true);

    return {
      checked1,
      checked2,
    };
  },
});
</script>

<style scoped>
.switch-demo .tdesign-demo-block {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>
