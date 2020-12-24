<template>
  <div>
    <div class="demo-checkbox-row">
      <t-checkbox v-model="checked">腾讯云A</t-checkbox>
      <t-checkbox v-model="checked">腾讯云B</t-checkbox>
      <t-checkbox v-model="checked">腾讯云C</t-checkbox>
    </div>

    <div class="demo-checkbox-row">
      <t-button @click="checked = false">删除</t-button>
      <t-button @click="checked = true">开启</t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
};
</script>

<style scoped>
.demo-checkbox-row + .demo-checkbox-row {
  margin-top: 16px;
}
.t-checkbox + .t-checkbox,
.t-button + .t-button {
  margin-left: 16px;
}
</style>
