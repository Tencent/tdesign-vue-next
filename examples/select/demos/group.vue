<template>
  <div>
    <t-select
      v-model="value"
      class="demo-select-base"
      @change="handleChange"
      @visible-change="visibleChange"
    >
      <t-option-group label="热门城市">
        <t-option
          v-for="(item, index) in options"
          :value="item.value"
          :label="item.label"
          :key="index"
        >
          {{ item.label }}
        </t-option>
      </t-option-group>
      <t-option-group label="广东省">
        <t-option
          v-for="(item, index) in options1"
          :value="item.value"
          :label="item.label"
          :key="index"
        >
          {{ item.label }}
        </t-option>
      </t-option-group>
      <t-option-group label="江苏省">
        <t-option
          v-for="(item, index) in options2"
          :value="item.value"
          :label="item.label"
          :key="index"
        >
          {{ item.label }}
        </t-option>
      </t-option-group>
    </t-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        label: '北京',
        value: 'beijing',
      }, {
        label: '上海',
        value: 'shanghai',
      }],
      options1: [{
        label: '广州',
        value: 'guangzhou',
      }, {
        label: '深圳',
        value: 'shenzhen',
      }, {
        label: '东莞',
        value: 'dongguang',
      }],
      options2: [{
        label: '南京',
        value: 'nanjing',
      }, {
        label: '苏州',
        value: '苏州',
      }, {
        label: '无锡',
        value: 'wuxi',
      }],
      value: '',
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
