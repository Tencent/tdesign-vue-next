<template>
  <div>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" clearable placeholder='请选择'></t-cascader>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    label: '当选项一数据展示文本过长时',
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
        label: '当选项数据展示文本过长时',
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
        label: '当选项数据展示文本过长时',
        value: '2.2',
      },
    ],
  },
]

export default defineComponent({
  setup() {
    const value = ref('1.1');
    return {
      options,
      value
    }
  }
});
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
