<template>
  <div>
    <t-select
      v-model="value"
      :popupProps="{
        overlayStyle: {width:'300px'}
      }"
      size="small"
      class="demo-select-base"
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
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :clearable="true"
      class="demo-select-base"
      @change="handleChange"
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
      :clearable="true"
      size="large"
      class="demo-select-base"
      @change="handleChange2"
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
      value2: 'apple',
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleChange2(value) {
      console.log(value);
    },
    visibleChange(val) {
      console.log('visible', val);
    }
  }
};
</script>
<style scoped>
  .demo-select-base {
    width: 200px;
    display: inline-block;
    margin: 0 20px;
  }
</style>
