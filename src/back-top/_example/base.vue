<template>
  <t-space style="transform: translateZ(0)">
    <div ref="container" style="height: 150px; overflow: auto">
      <div>
        <div v-for="item in 40" :key="item">Scroll list</div>
      </div>
    </div>
    <t-back-top :container="getContainer" :visible-height="20" :offset="[600, 0]" @click="handleClick"> </t-back-top>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let container = ref(null);

function getContainer(): HTMLElement {
  return container.value;
}

function handleClick() {
  console.log('Click me back to top');
}
</script>
