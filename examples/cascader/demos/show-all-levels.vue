<template>
  <div>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" :show-all-levels="false" placeholder='请选择'></t-cascader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: '上海',
          value: '1',
          children: [
            {
              label: '黄浦区',
              value: '1.1',
            },
            {
              label: '静安区',
              value: '1.2',
            },
            {
              label: '浦东新区',
              value: '1.3',
            },
          ],
        },
        {
          label: '深圳',
          value: '2',
          children: [
            {
              label: '宝安区',
              value: '2.1',
            },
            {
              label: '南山区',
              value: '2.2',
            },
            {
              label: '这里是深圳的一个特别长长长长长长长长的地名',
              value: '2.3',
            },
          ],
        },
      ],
      value: '',
    };
  },
};
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
