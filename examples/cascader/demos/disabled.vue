<template>
  <div>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value1" disabled></t-cascader>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value2" disabled multiple></t-cascader>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
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
];

export default defineComponent({
  setup() {
    const value1 = ref('1.1')
    const value2 = ref(['1.1'])

    return {
      options,
      value1,
      value2
    }
  }
});
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
