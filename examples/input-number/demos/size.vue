<template>
  <div>
    <t-input-number
      v-model="value1"
      size="small"
      :max="15"
      :min="-2"
    ></t-input-number>

    <t-input-number
      style="margin: 0 50px;"
      v-model="value2"
      :max="15"
      :min="-2"
    ></t-input-number>

    <t-input-number
      v-model="value3"
      size="large"
      :max="15"
      :min="-2"
    ></t-input-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 3,
      value2: 3,
      value3: 3,
    };
  },
  methods: {},
};
</script>
