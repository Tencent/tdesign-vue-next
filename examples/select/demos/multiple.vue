<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :clearable="true"
      multiple
      class="demo-select-base"
      @change="handleChange"
      @remove="handleRemove"
    >
      <t-option
        v-for="(item, index) in options"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
        :key="index"
      >
        {{ item.label }}
      </t-option>
    </t-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        label: '苹果apple',
        value: 'apple',
        disabled: true,
      }, {
        label: '香蕉banana',
        value: 'banana',
      }, {
        label: '橘子orange',
        value: 'orange',
      }],
      options2: [{
        label: '苹果apple',
        value: 'apple',
      }, {
        label: '香蕉banana',
        value: 'banana',
      }, {
        label: '橘子orange',
        value: 'orange',
      }],
      value: ['apple'],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped>
  .demo-select-base {
    width: 290px;
    display: inline-block;
    margin: 0 20px;
  }
</style>
