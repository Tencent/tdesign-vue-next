<template>
  <div class="switch-demo">
    <div class="tdesign-demo-block">
      <t-switch size="large" v-model="checked"></t-switch>
      <t-switch size="medium"></t-switch>
      <t-switch size="small"></t-switch>
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
    }
  }
});
</script>


<style scoped>
.switch-demo .tdesign-demo-block {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>
