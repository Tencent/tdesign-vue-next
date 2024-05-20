<template>
  <div class="affix-base">
    <t-affix :offset-top="top" :offset-bottom="20" ref="affix">
      <t-button>固钉</t-button>
    </t-affix>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: 140,
    };
  },
};
</script>
