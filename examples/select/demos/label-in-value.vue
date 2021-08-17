<template>
  <div>
    <t-select
      v-model="value"
      valueType="object"
      clearable
      placeholder="-请选择-"
      :options="options"
      style="width: 200px;display: inline-block;margin-right: 20px;"
      @change="handleChange"
    />
    <t-select
      v-model="value2"
      valueType="object"
      clearable
      multiple
      placeholder="-请选择-"
      :options="options"
      style="width: 200px;display: inline-block;"
      @change="handleChange"
    />
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
      value: { value: 'shanghai', label: '上海' },
      value2: [{ value: 'shanghai', label: '上海' }],
    };
  },
  methods: {
    handleChange(value) {
      console.log('handleChange:', value);
    },
  },
};
</script>
