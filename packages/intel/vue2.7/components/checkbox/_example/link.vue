<template>
  <t-space direction="vertical" size="24px">
    <div>选中值: {{ checked }}</div>
    <t-space direction="vertical">
      <!-- name 非必需 -->
      <t-checkbox-group v-model="checked" :options="['选项一', '选项二', '选项三']" name="city"></t-checkbox-group>
      <t-button @click="checked = ['选项二']" size="small">重置</t-button>
    </t-space>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      checked: ['选项二'],
    };
  },
};
</script>
