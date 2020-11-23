<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :clearable="true"
      multiple
      class="demo-select-base"
      @change="handleChange"
      @remove="handleRemove"
    >
      <t-option
        v-for="(item, index) in options"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
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
      value: [],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleRemove(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped>
  .demo-select-base {
    width: 290px;
    display: inline-block;
    margin: 0 20px;
  }
</style>
