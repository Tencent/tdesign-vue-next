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

<script setup lang="jsx">
const renderDiscountIcon = () => {
  return <t-icon name="discount" />;
};
</script>
