<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :clearable="true"
      size="small"
      class="demo-select-base"
      :popup-props="popupProps"
      @change="handleChange"
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
    <t-select
      v-model="value1"
      placeholder="-请选择-"
      :options="options"
      size="medium"
      class="demo-select-base"
    />
    <t-select
      v-model="value2"
      placeholder="-请选择-"
      :options="options"
      size="large"
      class="demo-select-base"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [{
  label: '上海',
  value: 'shanghai',
}, {
  label: '北京',
  value: 'beijing',
  disabled: true,
}, {
  label: '深圳',
  value: 'shenzhen',
}, {
  label: '这是一个名字很长的城市名称',
  value: 'long',
}, {
  label: '这是一个名字很长很长很长的城市名称',
  value: 'longest',
}];

export default defineComponent({
  setup() {
    const value = ref('');
    const value1 = ref('');
    const value2 = ref('');

    const handleChange = (value) => {
      console.log(value);
    };

    const visibleChange = (val) => {
      console.log('visible', val);
    };

    return {
      value,
      value1,
      value2,
      popupProps: {
        overlayStyle: {
          width: '300px',
        },
      },
      options,
      handleChange,
      visibleChange,
    };
  },
});
</script>
<style scoped>
  .demo-select-base {
    width: 200px;
    display: inline-block;
    margin: 0 20px;
  }
</style>
