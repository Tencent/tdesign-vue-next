<template>
  <div>
    <t-select
      v-model="value"
      class="demo-select-base"
      clearable
      placeholder="-请选择-"
      style="width: 200px;"
      @change="handleChange"
      @visible-change="visibleChange"
    >
      <t-option
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
        :label="item.label"
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
      options: [
        {
          label: '已选择的选项',
          value: '1',
        },
        {
          label: '短的选项二',
          value: '2',
        },
        {
          label: '很长很长很长的选项三',
          value: '3',
        },
      ],
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
  display: inline-block;
  margin: 0 20px;
}
</style>
