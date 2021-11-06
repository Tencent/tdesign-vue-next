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
      value: ['1.1', '1.2', '1.3'],
      open: true,
    };
  },
  methods: {
    handleBlur(e) {
      console.log(e);
    },
  },
};
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
