<template>
  <div>
    <t-slider v-model="size"></t-slider>
    <br />
    <t-space :size="size">
      <t-button>Button</t-button>
      <t-button>Button</t-button>
      <t-button>Button</t-button>
      <t-button>Button</t-button>
    </t-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const size = ref(8);
</script>
