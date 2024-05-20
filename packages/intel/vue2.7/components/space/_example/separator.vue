<template>
  <t-space align="center" :separator="separator">
    <t-button variant="text">Text</t-button>
    <t-button variant="text">Text</t-button>
    <t-button variant="text">Text</t-button>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      separator: () => <t-divider layout="vertical" />,
    };
  },
};
</script>
