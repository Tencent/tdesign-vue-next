<template>
  <t-space>
    <t-link theme="default" disabled @click="clickLink"> 跳转链接 </t-link>
    <t-link theme="primary" underline disabled @click="clickLink"> 跳转链接 </t-link>
    <t-link theme="danger" hover="color" disabled @click="clickLink"> 跳转链接 </t-link>
    <t-link theme="warning" hover="underline" disabled :onClick="clickLink"> 跳转链接 </t-link>
    <t-link theme="success" disabled @click="clickLink">
      <jump-icon slot="suffixIcon" />
      跳转链接
    </t-link>
  </t-space>
</template>

<script lang="jsx">
import { JumpIcon } from 'tdesign-icons-vue';

export default {
  components: {
    JumpIcon,
  },
  methods: {
    clickLink() {
      console.log('不触发');
    },
  },
};
</script>
