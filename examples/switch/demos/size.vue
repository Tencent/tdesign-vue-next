<template>
  <div>
    <t-switch size="large" v-model="checked">
    </t-switch>
    <br />
    <t-switch>
    </t-switch>
    <br />
    <t-switch size="small">
    </t-switch>
  </div>
</template>

<script>

export default {
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
  },
};
</script>
