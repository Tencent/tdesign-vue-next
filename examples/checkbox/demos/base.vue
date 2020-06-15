<template>
  <div>
    <t-checkbox v-model="checked">Checkbox</t-checkbox>
    <!-- <t-checkbox v-model="checked" :disabled="true" :value="1">Checkbox</t-checkbox> -->
    <!-- <t-checkbox v-model="checked" :defaultChecked="true">Checkbox</t-checkbox> -->
    <!-- <t-checkbox :defaultChecked="checked">Checkbox</t-checkbox> -->
    <t-checkbox-group v-model="city" :options="options"></t-checkbox-group>
    <!-- <t-checkbox-group v-model="city1" name="demo">
      <t-checkbox value="sz1">深圳1</t-checkbox>
      <t-checkbox value="gz1">广州1</t-checkbox>
    </t-checkbox-group> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: undefined,
      city: [],
      city1: [],
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
