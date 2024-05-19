<template>
  <div>
    <t-slider v-model="size"></t-slider>
    <br />
    <t-space :size="size">
      <t-button>Button</t-button>
      <t-button>Button</t-button>
      <t-button>Button</t-button>
      <t-button>Button</t-button>
    </t-space>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 8,
    };
  },
};
</script>
