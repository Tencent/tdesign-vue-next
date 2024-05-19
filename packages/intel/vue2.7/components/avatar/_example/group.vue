<template>
  <t-space direction="vertical">
    <t-space break-line>
      <t-avatar-group>
        <t-avatar :image="image"></t-avatar>
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon"></t-avatar>
      </t-avatar-group>
    </t-space>
    <t-space break-line>
      <t-avatar-group size="large">
        <t-avatar :image="image" @error="onError"></t-avatar>
        <t-avatar>W</t-avatar>
        <t-avatar :icon="icon"></t-avatar>
      </t-avatar-group>
    </t-space>
  </t-space>
</template>
<script lang="jsx">
import { UserIcon } from 'tdesign-icons-vue';

export default {
  data() {
    return {
      image: 'https://tdesign.gtimg.com/site/avatar.jpg',
    };
  },
  computed: {
    icon() {
      return () => <UserIcon />;
    },
  },

  methods: {
    onError(params) {
      console.log('image load failed', params);
    },
  },
};
</script>
