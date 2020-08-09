<template>
  <div>
    <t-select
      v-model="value"
      class="demo-select-base"
      @change="handleChange"
      @visible-change="visibleChange"
    >
      <t-option-group label="水果">
        <t-option
          v-for="(item, index) in options"
          :value="item.value"
          :label="item.label"
          :key="index"
        >
          {{ item.label }}
        </t-option>
      </t-option-group>
      <t-option-group label="蔬菜">
        <t-option
          v-for="(item, index) in options2"
          :value="item.value"
          :label="item.label"
          :key="index"
        >
          {{ item.label }}
        </t-option>
      </t-option-group>
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
      options2: [{
        label: '茄子',
        value: '1',
      }, {
        label: '西红柿',
        value: '2',
      }, {
        label: '白菜',
        value: '3',
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
