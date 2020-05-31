<template>
  <div>
    <div class="tdesign-demo-block">
      自定义图标标签：
      <t-tag :icon="renderIcon">标签</t-tag>
    </div>
    <div class="tdesign-demo-block">
      图标标签：
      <t-tag icon="search">标签</t-tag>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    renderIcon() {
      return (<span>&times;</span>);
    },
  },
};
</script>
