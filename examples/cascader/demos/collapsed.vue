<template>
  <div>
    <t-cascader
      v-model="value"
      class="t-demo-cascader"
      :options="options"
      :on-remove="handleBlur"
      multiple
      :min-collapsed-num="1"
    />
    <t-cascader
      v-model="value"
      class="t-demo-cascader"
      :options="options"
      :on-remove="handleBlur"
      multiple
      :min-collapsed-num="2"
    />
    <t-cascader v-model="value" class="t-demo-cascader" :options="options" multiple clearable :min-collapsed-num="1">
      <template #collapsedItems> 自定义折叠内容 </template>
    </t-cascader>
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
    const value = ref(['1.1', '1.2', '1.3']);

    const handleBlur = (e) => {
      console.log(e);
    };
    return {
      value,
      options,
      handleBlur,
    };
  },
});
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
