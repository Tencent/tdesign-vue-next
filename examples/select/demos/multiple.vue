<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :options="options"
      :onChange="handleChange"
      @remove="handleRemove"
    />
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
      console.log('handleChange:', value);
    },
    handleRemove(value) {
      console.log('handleRemove:', value);
    },
  },
};
</script>
