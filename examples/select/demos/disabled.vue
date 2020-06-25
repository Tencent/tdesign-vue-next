<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      disabled
      class="demo-select-base"
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
    <t-select
      v-model="value2"
      placeholder="-请选择-"
      multiple
      disabled
      class="demo-select-base"
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
      value2: ['apple', 'orange'],
      value: '',
    };
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
