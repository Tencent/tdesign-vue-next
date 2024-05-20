<template>
  <t-breadcrumb :options="options"> </t-breadcrumb>
</template>

<script>
export default {
  name: 'options',
  data() {
    return {
      options: [{ content: '页面1' }, { content: '页面2' }, { content: '页面3', href: '//tdesign.tencent.com/' }],
    };
  },
};
</script>
