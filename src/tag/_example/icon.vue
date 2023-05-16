<template>
  <t-space>
    <t-tag :icon="renderDiscountIcon"> 默认标签 </t-tag>

    <t-tag>
      <template #icon>
        <t-icon name="discount" />
      </template>
      Icon插槽
    </t-tag>
  </t-space>
</template>

<script setup lang="tsx">
const renderDiscountIcon = () => {
  return <t-icon name="discount" />;
};
</script>
