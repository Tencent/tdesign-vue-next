<template>
  <div class="demo-avatar">
    <t-avatar :image="image" :hide-on-load-failed="false" />
    <t-avatar>W</t-avatar>
    <t-avatar :icon="icon" />
    <t-avatar>
      <template #icon>
        <user-icon />
      </template>
    </t-avatar>
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
  .t-avatar {
    margin-right: 40px;
  }
}
</style>
