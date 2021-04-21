<template>
  <t-divider>Button</t-divider>
  <t-button theme="primary">111</t-button>
  <t-button theme="danger">111</t-button>
  <t-divider>Divider</t-divider>
  <t-divider align="left">TDesign</t-divider>
  <div>
    <span>正直</span>
    <t-divider theme="vertical" />
    <span>进取</span>
    <t-divider theme="vertical" />
    <span>合作</span>
    <t-divider theme="vertical" />
    <span>创新</span>
  </div>
  <t-divider>CheckBox</t-divider>
  <t-checkbox>默认状态</t-checkbox>
  <t-checkbox :checked="true">选中状态</t-checkbox>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    console.log(1);
  },
});
</script>

<style >
html, body {
  padding: 30px;
}
</style>
