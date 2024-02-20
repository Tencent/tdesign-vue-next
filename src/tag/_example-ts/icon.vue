<template>
  <t-space>
    <t-tag :icon="renderDiscountIcon">函数图标</t-tag>

    <t-tag>
      <template #icon>
        <t-icon name="discount" />
      </template>
      插槽图标
    </t-tag>
  </t-space>
</template>

<script lang="tsx" setup>
import { TagProps } from 'tdesign-vue-next';
const renderDiscountIcon: TagProps['icon'] = () => {
  return <t-icon name="discount" />;
};
</script>
