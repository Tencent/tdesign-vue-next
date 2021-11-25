<template>
  <div class="tdesign-radio-group">
    <div>
      <t-radio-group v-model="value" name="city" :options="options" @change="onChange" />
    </div>

    <div>
      <t-radio-group default-value="sz" :options="options" @change="onChange" />
    </div>

    <div>
      <t-radio-group disabled default-value="gz" :options="optionsWithDisabled" @change="onChange" />
    </div>

    <div>
      <t-radio-group default-value="gz" @change="onChange">
        <t-radio value="bj"> 北京 </t-radio>
        <t-radio value="sh"> 上海 </t-radio>
        <t-radio value="gz"> 广州 </t-radio>
        <t-radio value="sz" disabled> 深圳 </t-radio>
      </t-radio-group>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    value: 'bj',
    label: '北京',
  },
  {
    value: 'sh',
    label: '上海',
  },
  {
    value: 'gz',
    label: '广州',
  },
  {
    value: 'sz',
    label: () => '深圳',
  },
];

const optionsWithDisabled = [
  {
    value: 'bj',
    label: '北京',
  },
  {
    value: 'sh',
    label: '上海',
  },
  {
    value: 'gz',
    label: '广州',
    disabled: false,
  },
  {
    value: 'sz',
    label: () => '深圳',
    disabled: false,
  },
];

export default defineComponent({
  setup() {
    const value = ref('');
    const onChange = (checkedValues) => {
      console.log('checkedValues:', checkedValues);
      console.log('value:', this.value);
    };

    return {
      value,
      options,
      onChange,
      optionsWithDisabled,
    };
  },
});
</script>

<style scoped>
.t-radio-group {
  margin-bottom: 16px;
}
</style>
