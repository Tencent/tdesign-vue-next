<template>
  <div>
    <t-select
      v-model="value"
      style="width: 200px;"
      :options="options"
      clearable
      placeholder="-请选择-"
    >
      <template #prefixIcon>
        <t-icon name="browse"/>
      </template>
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
    };
  },
};
</script>
