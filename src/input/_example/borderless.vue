<template>
  <t-space direction="vertical" style="max-width: 500px">
    <t-input clearable>
      <template #suffixIcon>
        <search-icon />
      </template>
    </t-input>

    <t-input placeholder="borderless Input" borderless clearable>
      <template #suffixIcon>
        <search-icon />
      </template>
    </t-input>
  </t-space>
</template>
<script setup>
import { SearchIcon } from 'tdesign-icons-vue-next';
</script>
