<template>
  <t-space>
    <t-filecard
      :item="{
        uid: '1',
        name: 'excel-file.xlsx',
        size: 111111,
      }"
      @remove="handelRemove"
    />
  </t-space>
</template>

<script setup>
const handelRemove = () => {
  console.log('remove');
};
</script>
