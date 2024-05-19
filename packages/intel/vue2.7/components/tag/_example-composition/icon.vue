<template>
  <t-space>
    <t-tag :icon="renderDiscountIcon">函数图标</t-tag>

    <t-tag>
      <template #icon>
        <discount-icon />
      </template>
      插槽图标
    </t-tag>
  </t-space>
</template>

<script setup lang="jsx">
import { DiscountIcon } from 'tdesign-icons-vue';

const renderDiscountIcon = () => <DiscountIcon />;
</script>
