<template>
  <div>
    <t-cascader
      v-model="value"
      class="t-demo-cascader"
      :keys="{ label: 'name', value: 'code', children: 'items' }"
      :options="options"
      clearable
      placeholder="请选择"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    name: '选项一',
    code: '1',
    children: [
      {
        name: '子选项一',
        code: '1.1',
      },
      {
        name: '子选项二',
        code: '1.2',
      },
      {
        name: '子选项三',
        code: '1.3',
      },
    ],
  },
  {
    name: '选项二',
    code: '2',
    children: [
      {
        name: '子选项一',
        code: '2.1',
      },
      {
        name: '子选项二',
        code: '2.2',
      },
    ],
  },
];

export default defineComponent({
  setup() {
    const value = ref('');
    return {
      options,
      value,
    };
  },
});
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
