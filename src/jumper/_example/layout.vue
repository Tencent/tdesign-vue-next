<template>
  <t-jumper layout="vertical" :on-change="handleChange" />
</template>

<script setup>
function handleChange(ctx) {
  console.log('ctx', ctx);
}
</script>
