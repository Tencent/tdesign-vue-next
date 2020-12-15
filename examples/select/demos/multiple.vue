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
        label: '选项一',
        value: '1',
      }, {
        label: '选项二',
        value: '2',
      }, {
        label: '选项三',
        value: '3',
      }],
      value: ['1', '3'],
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
