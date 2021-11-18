<template>
  <div class="switch-demo">
    <div class="tdesign-demo-block">
      <t-switch
        v-model="checked"
        size="large"
      />
      <t-switch size="medium" />
      <t-switch size="small" />
    </div>
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

<style scoped>
.switch-demo .tdesign-demo-block {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>
