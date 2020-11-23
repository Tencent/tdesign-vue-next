<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :clearable="true"
      class="demo-select-base"
      :popupProps="popupProps"
      @change="handleChange"
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
    <t-select
      v-model="value2"
      placeholder="-请选择-"
      :clearable="true"
      size="large"
      class="demo-select-base"
      @change="handleChange2"
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
      }],
      value: '',
      value2: 'shanghai',
      popupProps: {
        overlayStyle: {
          width: '230px',
        },
      },
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleChange2(value) {
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
