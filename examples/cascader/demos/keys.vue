<template>
  <div>
    <t-cascader class="t-demo-cascader" :keys="{ label: 'name', value: 'code', children: 'items' }" :options="options" v-model="value" clearable placeholder='请选择'></t-cascader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
    {
      name: '上海',
      code: '1',
      items: [
        {
          name: '黄浦区',
          code: '1.1',
        },
        {
          name: '静安区',
          code: '1.2',
        },
        {
          name: '浦东新区',
          code: '1.3',
        },
      ],
    },
    {
      name: '深圳',
      code: '2',
      items: [
        {
          name: '宝安区',
          code: '2.1',
        },
        {
          name: '南山区',
          code: '2.2',
        },
        {
          name: '福田区',
          code: '2.3',
        },
      ],
    },
  ],
      value: '1.1',
    };
  },
};
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
