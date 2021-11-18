<template>
  <div class="demo-avatar">
    <div class="demo-avatar-block">
      <t-avatar-group
        size="large"
        :max="2"
      >
        <t-avatar :image="image" />
        <t-avatar>Avatar</t-avatar>
        <t-avatar :image="image" />
      </t-avatar-group>
    </div>
    <div class="demo-avatar-block">
      <t-avatar-group
        size="large"
        :max="2"
        :collapse-avatar="ellipsisIcon"
      >
        <t-avatar :image="image" />
        <t-avatar>Avatar</t-avatar>
        <t-avatar :icon="icon" />
      </t-avatar-group>
    </div>
    <div class="demo-avatar-block">
      <t-avatar-group
        size="large"
        :max="2"
        collapse-avatar="more"
      >
        <t-avatar :image="image" />
        <t-avatar>Avatar</t-avatar>
        <t-avatar :icon="icon" />
      </t-avatar-group>
    </div>
  </div>
</template>
<script lang="jsx">
import { defineComponent, computed } from 'vue';
import UserIcon from '@tencent/tdesign-vue-next/icon/user';
import EllipsisIcon from '@tencent/tdesign-vue-next/icon/ellipsis';

export default defineComponent({
  setup() {
    const icon = computed(() => () => <UserIcon />);
    const ellipsisIcon = computed(() => () => <EllipsisIcon />);
    return {
      icon,
      ellipsisIcon,
      image: 'https://tdesign.gtimg.com/site/avatar.jpg',
    };
  },
});
</script>
<style lang="less" scoped>
  .demo-avatar{
    &-block:not(:last-child){
      margin-bottom: 40px;
    }
  }
</style>
