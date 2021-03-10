<template>
  <div>
    <t-select
      v-model="value"
      class="demo-select-base"
      filterable
      clearable
      @change="handleChange"
      :onSearch="remoteMethod"
      :loading="loading"
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
      class="demo-select-base"
      multiple
      filterable
      clearable
      size="large"
      @change="handleChange"
      :onSearch="remoteMethod2"
      @search="remoteMethod2"
      :loading="loading2"
    >
      <t-option
        v-for="(item, index) in options2"
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
      }],
      options2: [],
      value: '',
      value2: [],
      loading: false,
      loading2: false,
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    remoteMethod(search) {
      console.log('search', search);
      if (search) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = [{
            value: `${search}_test1`,
            label: `${search}_test1`,
          }, {
            value: `${search}_test2`,
            label: `${search}_test2`,
          }, {
            value: `${search}_test3`,
            label: `${search}_test3`,
          }];
        }, 500);
      }
    },
    remoteMethod2(search) {
      console.log('search2', search);
      if (search) {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
          this.options2 = [{
            value: `${search}_test1`,
            label: `${search}_test1`,
          }, {
            value: `${search}_test2`,
            label: `${search}_test2`,
          }, {
            value: `${search}_test3`,
            label: `${search}_test3`,
          }];
        }, 500);
      }
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
