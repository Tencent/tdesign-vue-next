<template>
  <t-space>
    <t-filecard
      :item="{
        uid: '1',
        name: 'excel-file.xlsx',
        size: 111111,
      }"
      @remove="handleRemove"
    />
  </t-space>
</template>

<script setup>
const handleRemove = () => {
  console.log('remove');
};
</script>
