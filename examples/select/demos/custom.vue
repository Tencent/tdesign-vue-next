<template>
  <div>
    <t-select
      v-model="value"
      filterable
      placeholder="-请选择-"
      :onSearch="remoteMethod"
      :loading="loading"
      :options="options"
      style="width: 200px;display: inline-block;margin: 0 20px 20px 0;"
    />
    <t-select
      v-model="value2"
      multiple
      filterable
      placeholder="-请输入搜索-"
      :options="options2"
      @search="remoteMethod2"
      :loading="loading2"
      reserveKeyword
      style="width: 400px;display: inline-block;"
    />
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
