<template>
  <div>
    <t-input-number
      v-model="value"
      :max="15"
      :min="-2"
      :format="value => `${value}%`"
      @change="onChange"
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
  methods: {
    onChange(ev) {
      console.info(ev);
    },
  },
};
</script>
