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
  {
    label: '上海(Shanghai)',
    value: 'shanghai',
  },
  {
    label: '北京(Beijing)',
    value: 'beijing',
  },
  {
    label: '深圳(Shenzhen)',
    value: 'shenzhen',
  },
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
