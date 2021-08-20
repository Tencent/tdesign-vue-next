<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      disabled
      filterable
      style="width: 200px;display: inline-block;margin-right: 20px;"
      :options="options"
    />
    <t-select
      v-model="value2"
      placeholder="-请选择-"
      multiple
      disabled
      style="width: 200px;display: inline-block;"
      :options="options"
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
      value2: ['shanghai', 'beijing'],
      value: '',
    };
  },
};
</script>
