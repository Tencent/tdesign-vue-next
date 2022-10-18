<template>
  <t-tree :data="[]" /><br />
  <t-tree :data="[]" empty="😊 空数据（string）" /><br />
  <t-tree :data="[]" :empty="empty" /><br />
  <t-tree :data="[]">
    <br />
    <template #empty>
      <div>😊 空数据（slot）</div>
    </template>
  </t-tree>
</template>

<script setup lang="jsx">
const empty = () => {
  return <div>😊 空数据（ empty props ）</div>;
};
</script>
