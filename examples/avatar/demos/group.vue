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
      <t-avatar-group size="large">
        <t-avatar :image="image" />
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon" />
      </t-avatar-group>
    </div>
  </div>
</template>
<script setup lang="jsx">
import { UserIcon } from 'tdesign-icons-vue-next';

const icon = () => <UserIcon />;
const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>
<style lang="less" scoped>
.demo-avatar {
  .demo-avatar-block:not(:last-child) {
    margin-bottom: 40px;
  }
  .t-avatar {
    margin-right: 40px;
  }
}
</style>
