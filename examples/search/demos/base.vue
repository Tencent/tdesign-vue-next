<template>
  <div>
    <t-search @focus="handleFocus" @clickIcon="handleClickIcon" @clickText="handleClickText">
      <template #suffix>搜索</template>
    </t-search>
    <br />
    <t-search :show-icon="false">
      <template #suffix>搜索</template>
    </t-search>
    <br />
    <t-search>
      <template #suffix>搜索</template>
    </t-search>
  </div>
</template>

<script lang="ts" setup>
const handleClickIcon = () => {
  console.log('handleClickIcon');
};
const handleClickText = () => {
  console.log('handleClickText');
};
const handleFocus = () => {
  console.log('focus');
};
</script>

<style lang="scss" scoped></style>
