<template>
  <div class="demo-avatar">
    <div class="demo-avatar-block">
      <t-avatar-group>
        <t-avatar :image="image" />
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon" />
      </t-avatar-group>
    </div>

    <div class="demo-avatar-block">
      <t-avatar-group cascading="left-up">
        <t-avatar :image="image" />
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon" />
      </t-avatar-group>
    </div>
  </div>
</template>
<script setup lang="jsx">
import { computed } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';

const icon = computed(() => () => <UserIcon />);
const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>
<style lang="less" scoped>
.demo-avatar {
  .demo-avatar-block:first-child {
    margin-bottom: 40px;
  }
}
</style>
