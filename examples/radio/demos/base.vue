<template>
  <div>
    <!-- <t-radio v-model="checked" :value="false">Radio</t-radio> -->
    <!-- <t-radio v-model="checked" :disabled="true" :value="1">Radio</t-radio> -->
    <!-- <t-radio v-model="checked" :defaultChecked="true">Radio</t-radio> -->
    <!-- <t-radio :defaultChecked="checked">Radio</t-radio> -->
    <!-- <t-radio-group v-model="city" :options="options"></t-radio-group> -->
    <t-radio-group v-model="city1" name="demo">
      <t-radio value="sz1">深圳1</t-radio>
      <t-radio value="gz1">广州1</t-radio>
    </t-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: undefined,
      city: '',
      city1: '',
      options: [
        {
          value: 'sz',
          label: '深圳',
        },
        {
          value: 'gz',
          label: '广州',
        },
      ],
    };
  },
  watch: {
    city(nVal) {
      console.log(nVal);
    },
    city1(nVal) {
      console.log('city1', nVal);
    },
  },
};
</script>
