<template>
  <div>
    <t-select
      v-model="value"
      class="demo-select-base"
      filterable
      creatable
      @change="handleChange"
      @visible-change="visibleChange"
      @create="createOptions"
      :filterMethod="filterMethod"
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
      style="width: 350px;"
      filterable
      multiple
      creatable
      @change="handleChange"
      @create="createOptions"
      :filterMethod="filterMethod"
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
    createOptions(value) {
      this.options.push({
        value,
        label: value,
      });
      console.log('create option:', value, this.options);
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
