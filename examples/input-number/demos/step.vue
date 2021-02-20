<template>
  <div>
    <t-input-number
      v-model="value"
      :max="15"
      :min="-5"
      :step="1.2"
      @change="onChange"
    ></t-input-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3.2,
    };
  },
  methods: {
    onChange(ev) {
      console.info(ev);
    },
  },
};
</script>
