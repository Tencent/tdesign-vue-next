<template>
  <div>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" :onRemove="handleBlur" multiple :minCollapsedNum="1" />
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" :onRemove="handleBlur" multiple :minCollapsedNum="2" />
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" multiple clearable :minCollapsedNum="1">
      <template #collapsedItems>
        自定义折叠内容
      </template>
    </t-cascader>
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
          ],
        },
      ],
      value: ['1.1', '1.2', '1.3'],
      open: true
    };
  },
  methods: {
    handleBlur(e) {
      console.log(e)
    }
  }
};
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
