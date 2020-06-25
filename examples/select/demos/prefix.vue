<template>
  <div>
    <t-select
      v-model="value"
      class="demo-select-base"
      prefixIcon="browse"
      @change="handleChange"
      @visible-change="visibleChange"
    >
      <t-option
        v-for="(item, index) in options"
        :value="item.value"
        :label="item.label"
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
        label: '苹果apple~~~~',
        value: 'apple',
      }, {
        label: '香蕉banana~~~',
        value: 'banana',
      }, {
        label: '橘子orange~~~',
        value: 'orange',
      }],
      value: '',
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    visibleChange(val) {
      console.log('visible', val);
    },
  },
};
</script>
<style scoped>
  .demo-select-base {
    width: 200px;
    display: inline-block;
    margin: 0 20px;
  }
</style>
