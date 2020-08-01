<template>
  <div>
    <t-switch></t-switch>
    <t-switch v-model="checked" @change="onChange"></t-switch>
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
