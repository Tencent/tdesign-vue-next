<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      style="width: 200px;display: inline-block;margin: 0 20px 20px 0;"
      filterable
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <t-select
      v-model="value2"
      multiple
      placeholder="-请选择-"
      :options="options"
      :filter="filterMethod"
      style="width: 400px;display: inline-block;"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        label: '上海(Shanghai)',
        value: 'shanghai',
      }, {
        label: '北京(Beijing)',
        value: 'beijing',
      }, {
        label: '深圳(Shenzhen)',
        value: 'shenzhen',
      }],
      value: '',
      value2: [],
    };
  },
  methods: {
    filterMethod(search, option) {
      console.log('search:', search, ', option:', option);
      return option.label.indexOf(search) !== -1;
    },
    handleBlur({ value, e }) {
      console.log('handleBlur: ', value, e);
    },
    handleFocus({ value, e }) {
      console.log('handleFocus: ', value, e);
    },
  },
};
</script>
