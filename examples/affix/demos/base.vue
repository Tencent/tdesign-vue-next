<template>
  <div class="affix-base">
    <t-affix
      :offset-top="top"
      :offset-bottom="20"
      ref="affix"
    >
      <t-button
        :style="{height: top + 'px'}"
      >Base</t-button>
    </t-affix>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: 40,
    };
  },
};
</script>
