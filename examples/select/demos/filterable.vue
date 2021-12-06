<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
      filterable
      @blur="handleBlur"
      @focus="handleFocus"
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
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default defineComponent({
  setup() {
    const value = ref('');
    const value2 = ref([]);

    const filterMethod = (search, option) => {
      console.log('search:', search, ', option:', option);
      return option.label.indexOf(search) !== -1;
    };

    const handleBlur = ({ value, e }) => {
      console.log('handleBlur: ', value, e);
    };

    const handleFocus = ({ value, e }) => {
      console.log('handleFocus: ', value, e);
    };

    return {
      value,
      value2,
      options,
      filterMethod,
      handleBlur,
      handleFocus,
    };
  },
});
</script>
