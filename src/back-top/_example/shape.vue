<template>
  <t-space style="transform: translateZ(0)">
    <div ref="container" class="container"></div>
    <t-back-top container=".container" :visible-height="0" :offset="[750, 0]"> </t-back-top>
    <t-back-top shape="circle" :target="getContainer" visible-height="0px" :offset="['700px', '0px']"> </t-back-top>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const container = ref(null);

function getContainer() {
  return container.value;
}
</script>
