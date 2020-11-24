<template>
  <div class="switch-demo">
    <div class="tdesign-demo-block">
      <t-switch v-model="checked1"></t-switch>
      <t-switch loading v-model="checked2"></t-switch>
      <t-switch disabled></t-switch>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: true
    };
  },
};
</script>

<style scoped>
.switch-demo .tdesign-demo-block {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>

