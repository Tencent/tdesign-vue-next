<template>
  <!-- 远程搜索场景会改变 options 数组，导致无法检索历史选项，可通过将 valueType 改为 `object` 以从 value 中读取 `label`，解决无法回显的问题 -->

  <t-space>
    <t-select
      v-model="value"
      value-type="object"
      filterable
      placeholder="请选择"
      :onSearch="remoteMethod"
      :loading="loading"
      :options="options"
      style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
    />
    <t-select
      v-model="value2"
      value-type="object"
      multiple
      filterable
      placeholder="请输入搜索"
      :options="options2"
      @search="remoteMethod2"
      :loading="loading2"
      reserveKeyword
      style="width: 400px; display: inline-block"
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
      ],
      options2: [],
      value: {},
      value2: [],
      loading: false,
      loading2: false,
    };
  },
  methods: {
    remoteMethod(search) {
      console.log('search', search);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.options = [
          {
            value: `${search}1`,
            label: `${search}test1`,
          },
          {
            value: `${search}2`,
            label: `${search}test2`,
          },
          {
            value: `${search}3`,
            label: `${search}test3`,
          },
        ];
      }, 500);
    },
    remoteMethod2(search) {
      console.log('search2', search);
      this.loading2 = true;
      setTimeout(() => {
        this.loading2 = false;
        this.options2 = [
          {
            value: `${search}1`,
            label: `${search}test1`,
          },
          {
            value: `${search}2`,
            label: `${search}test2`,
          },
          {
            value: `${search}3`,
            label: `${search}test3`,
          },
        ];
      }, 500);
    },
  },
};
</script>
