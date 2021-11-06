<template>
  <div>
    <!-- 非受控用法 -->
    <t-cascader class="t-demo-cascader" :options="options" :defaultValue="value" clearable size="small" placeholder='请选择'></t-cascader>
    <!-- 受控+语法糖用法 -->
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" clearable size="medium" placeholder='请选择'></t-cascader>
    <!-- 受控用法 -->
    <t-cascader class="t-demo-cascader" :options="options" :value="value" @change="handleValueChange" clearable size="large" placeholder='请选择'></t-cascader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: '选项一',
          value: '1',
          children: [
            {
              label: '子选项一',
              value: '1.1',
            },
            {
              label: '子选项二',
              value: '1.2',
            },
            {
              label: '子选项三',
              value: '1.3',
            },
          ],
        },
        {
          label: '选项二',
          value: '2',
          children: [
            {
              label: '子选项一',
              value: '2.1',
            },
            {
              label: '子选项二',
              value: '2.2',
            },
          ],
        },
      ],
      value: '1.1',
    };
  },
  methods: {
    handleValueChange(e) {
      this.value = e;
    },
  },
};
</script>
<style scoped>
.t-demo-cascader-title {
  margin: 10px 0;
}
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
