<template>
  <div>
    <div class="demo-checkbox-row-desc">
      选中值: {{ checked }}
    </div>
    <div class="demo-checkbox-row">
      <!-- name 非必需 -->
      <t-checkbox-group v-model="checked" :options="['北京', '上海', '深圳']" name='city'></t-checkbox-group>
    </div>
    <div class="demo-checkbox-row">
      <t-button @click="checked = ['上海']" size="small">重置</t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: ['上海'],
    };
  },
};
</script>

<style scoped>
.demo-checkbox-row + .demo-checkbox-row {
  margin-top: 16px;
}
.demo-checkbox-row-desc {
  color:rgba(0, 0, 0, 0.6);
  margin-bottom: 24px;
}
.t-checkbox + .t-checkbox,
.t-button + .t-button {
  margin-left: 16px;
}
</style>
