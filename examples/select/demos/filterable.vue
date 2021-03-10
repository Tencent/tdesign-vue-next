<template>
  <div>
    <t-select
      v-model="value"
      class="demo-select-base"
      filterable
      clearable
      @change="handleChange"
      @visible-change="visibleChange"
      :filter="filterMethod"
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
      class="demo-select-base"
      multiple
      clearable
      filterable
      @change="handleChange"
      :filter="filterMethod"
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
        label: '上海',
        value: 'shanghai',
      }, {
        label: '北京',
        value: 'beijing',
      }, {
        label: '深圳',
        value: 'shenzhen',
      }],
      value: '',
      value2: [],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    visibleChange(value) {
      console.log('visible', value);
    },
    filterMethod(search) {
      console.log('search', search);
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
