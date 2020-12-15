<template>
  <div>
    <t-select
      v-model="value"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        label: '已选择的选项',
        value: '1',
      }, {
        label: '短的选项二',
        value: '2',
      }, {
        label: '很长很长很长的选项三',
        value: '3',
      }],
      value: '1',
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    visibleChange(val) {
      console.log('visible', val);
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
