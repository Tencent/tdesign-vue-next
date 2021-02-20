<template>
  <div>
    <t-input-number
      v-model="value"
      mode="column"
      :max="15"
      :min="-2"
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
};
</script>
