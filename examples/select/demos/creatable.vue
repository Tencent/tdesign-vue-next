<template>
  <div>
    <t-select
      v-model="value"
      creatable
      filterable
      placeholder="请选择，支持自定义创建"
      :options="options"
      style="width: 200px;"
      @create="createOptions"
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
      value: '',
      value2: [],
    };
  },
  methods: {
    createOptions(value) {
      this.options.push({
        value,
        label: value,
      });
      console.log('create option:', value);
    },
  },
};
</script>
