<template>
  <div>
    <t-input-number
      v-model="value"
      :max="15"
      :min="-2"
      :disabled="true"
    ></t-input-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3,
    };
  },
  methods: {},
};
</script>
