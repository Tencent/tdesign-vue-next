<template>
  <t-space direction="vertical">
    <div ref="container" style="height: 150px; overflow: auto">
      <div>
        <div v-for="item in 40" :key="item">Scroll list</div>
      </div>
    </div>
    <t-back-top :target="getTarget" :fixed="false" :visibility-height="20" @to-top="handleToTop"> </t-back-top>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let container = ref(null);

function getTarget(): HTMLElement {
  return container.value;
}

function handleToTop() {
  console.log('Click me back to top');
}
</script>
