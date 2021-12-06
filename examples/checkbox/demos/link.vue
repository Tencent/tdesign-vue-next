<template>
  <div>
    <div class="demo-checkbox-row-desc">选中值: {{ checked }}</div>
    <div class="demo-checkbox-row">
      <!-- name 非必需 -->
      <t-checkbox-group v-model="checked" :options="['选项一', '选项二', '选项三']" name="city"></t-checkbox-group>
    </div>
    <div class="demo-checkbox-row">
      <t-button size="small" @click="checked = ['选项二']">重置</t-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checked = ref(['选项二']);
    return {
      checked,
    };
  },
});
</script>

<style scoped>
.demo-checkbox-row + .demo-checkbox-row {
  margin-top: 16px;
}
.demo-checkbox-row-desc {
  margin-bottom: 24px;
}
.t-checkbox + .t-checkbox,
.t-button + .t-button {
  margin-left: 16px;
}
</style>
