<template>
  <t-space>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
      filterable
      @blur="handleBlur"
      @focus="handleFocus"
      @enter="handleEnter"
    />
    <t-select
      v-model="value2"
      multiple
      placeholder="-请选择-"
      :options="options"
      :filter="filterMethod"
      style="width: 400px; display: inline-block"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
        { label: 'option4', value: '4' },
        { label: 'OPTION5', value: '5' },
      ],
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
    handleEnter({ value, e, inputValue }) {
      console.log('handleEnter: ', value, e, inputValue);
    },
  },
};
</script>
