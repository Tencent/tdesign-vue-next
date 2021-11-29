<template>
  <div class="playground-demo-container">
    <h2 class="title">Button</h2>
    <t-button type="submit" variant="dashed"> button </t-button>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">Divider</h2>
    <span>正直</span>
    <t-divider theme="vertical" dashed />
    <t-divider align="left" dashed> TDesign </t-divider>
  </div>
</template>
<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
